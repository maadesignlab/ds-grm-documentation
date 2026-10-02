import { afterEach, beforeEach, expect, test } from 'vitest'
import { inspectElement, indexRules, inspectorEnabled } from './model'
import { startInspector } from './Inspector'

let fixture: HTMLDivElement
let stylesheet: HTMLStyleElement
let stop: (() => void) | undefined
beforeEach(() => {
  stylesheet = document.createElement('style')
  stylesheet.textContent = ':root { --inspector-test-primary: rgb(0, 100, 80); --inspector-test-gap: 8px } .inspector-test { color: var(--inspector-test-primary); padding: var(--inspector-test-gap); } .inspector-other { color: var(--wrong-token) }'
  document.head.append(stylesheet)
  fixture = document.createElement('div')
  fixture.innerHTML = '<section data-slot="card"><button data-slot="button" class="inspector-test"><span data-slot="icon">+</span> Acción</button></section>'
  document.body.append(fixture)
})
afterEach(async () => { stop?.(); stop = undefined; await new Promise(resolve => setTimeout(resolve, 0)); fixture.remove(); stylesheet.remove() })

test('per-component preference takes precedence and applies across stories', () => {
  expect(inspectorEnabled('on', { 'components-button': 'off' }, 'components-button--playground')).toBe(false)
  expect(inspectorEnabled('off', { 'components-button': 'on' }, 'components-button--docs')).toBe(true)
  expect(inspectorEnabled('on', {}, 'components-tabs--docs')).toBe(true)
  expect(inspectorEnabled('off', {}, 'components-tabs--docs')).toBe(false)
})
test('reports CSS references rather than guessing tokens from equal colors', () => {
  const snapshot = inspectElement(fixture.querySelector('button')!, indexRules(document))
  expect(snapshot.tokens).toContainEqual({ name: '--inspector-test-primary', value: 'rgb(0, 100, 80)' })
  expect(snapshot.tokens.some(token => token.name === '--wrong-token')).toBe(false)
  expect(snapshot.computed).toContainEqual({ property: 'padding', value: '8px' })
  expect(snapshot.ancestors).toEqual(['card', 'button'])
  expect(snapshot.children).toEqual(['icon'])
})
test('reads inline values and follows changes to token values', () => {
  const button = fixture.querySelector('button')!
  button.style.backgroundColor = 'var(--inspector-test-primary)'
  button.style.setProperty('--inspector-test-primary', 'rgb(10, 20, 30)')
  const snapshot = inspectElement(button, indexRules(document))
  expect(snapshot.computed).toContainEqual({ property: 'background-color', value: 'rgb(10, 20, 30)' })
  expect(snapshot.references.some(ref => ref.selector === 'style inline' && ref.property === 'background-color')).toBe(true)
})
test('hover inspects portal elements, does not block clicks, and cleans up when disabled', async () => {
  stop = startInspector()
  const button = fixture.querySelector('button')!
  let clicked = false
  button.onclick = () => { clicked = true }
  button.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }))
  await expect.poll(() => document.querySelector('[data-grm-inspector]')?.textContent).toContain('button')
  button.click()
  expect(clicked).toBe(true)
  document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyI', altKey: true }))
  fixture.querySelector('span')!.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }))
  await expect.poll(() => document.querySelector('.grm-inspector-panel header strong')?.textContent).toBe('button')
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
  await expect.poll(() => document.querySelector('.grm-inspector-panel')).toBeNull()
  stop(); stop = undefined
  await expect.poll(() => document.querySelector('[data-grm-inspector]')).toBeNull()
})

test('reads nested Tailwind-like selectors and excludes inactive media rules', () => {
  stylesheet.textContent += '.inspector-test { &[data-state="active"] { background-color: var(--inspector-test-primary); } } @media (min-width: 99999px) { .inspector-test { color: var(--inactive-media-token) } }'
  const button = fixture.querySelector('button')!
  button.dataset.state = 'active'
  const snapshot = inspectElement(button, indexRules(document))
  expect(snapshot.references.some(ref => ref.property === 'background-color' && ref.tokens.includes('--inspector-test-primary'))).toBe(true)
  expect(snapshot.tokens.some(token => token.name === '--inactive-media-token')).toBe(false)
})

test('Storybook globals activate hover in Docs and local overrides disable it', async () => {
  const { bindInspector } = await import('./activation')
  const listeners = new Map<string, (...args: never[]) => void>()
  const channel = { on: (name: string, listener: (...args: never[]) => void) => listeners.set(name, listener), off: (name: string) => listeners.delete(name) }
  const emit = (name: string, payload: unknown) => (listeners.get(name) as (payload: unknown) => void)?.(payload)
  stop = bindInspector(channel)
  emit('docsRendered', 'components-button--docs')
  emit('globalsUpdated', { globals: { dsInspector: 'on' } })
  const button = fixture.querySelector('button')!
  button.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 40, clientY: 50 }))
  await expect.poll(() => document.querySelector('.grm-inspector-panel')).not.toBeNull()
  const card = document.querySelector<HTMLElement>('.grm-inspector-panel')!
  expect(card.getBoundingClientRect().left).toBeGreaterThanOrEqual(8)
  expect(card.getBoundingClientRect().right).toBeLessThanOrEqual(window.innerWidth - 8)
  expect(card.getBoundingClientRect().top).toBe(66)
  expect(getComputedStyle(card).pointerEvents).toBe('none')
  button.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: window.innerWidth - 4, clientY: window.innerHeight - 4 }))
  await expect.poll(() => card.getBoundingClientRect().right).toBeLessThanOrEqual(window.innerWidth - 8)
  expect(card.getBoundingClientRect().bottom).toBeLessThanOrEqual(window.innerHeight - 8)
  emit('globalsUpdated', { globals: { dsInspectorOverrides: { 'components-button': 'off' } } })
  await expect.poll(() => document.querySelector('[data-grm-inspector]')).toBeNull()
  emit('storyRendered', 'components-sheet--playground')
  button.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 80, clientY: 90 }))
  await expect.poll(() => document.querySelector('.grm-inspector-panel')).not.toBeNull()
  emit('globalsUpdated', { globals: { dsInspector: 'off' } })
  await expect.poll(() => document.querySelector('[data-grm-inspector]')).toBeNull()
})
