import React, { createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { beforeEach, afterEach, expect, test, vi } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { Badge, badgeVariants } from '../../src/components/ui/badge'
import { badgeVariants as publishedStyles } from './fixtures/badge-v120'

let host: HTMLDivElement
let root: Root
beforeEach(() => { host = document.createElement('div'); document.body.append(host); root = createRoot(host) })
afterEach(() => { flushSync(() => root.unmount()); host.remove() })

test('all existing style combinations match the published v1.2.0 helper exactly', () => {
  for (const variant of [undefined, null, 'primary', 'secondary', 'brand-neutral', 'transparent', 'success', 'warning', 'error', 'destructive', 'info'] as const)
    for (const appearance of [undefined, null, 'solid', 'outline'] as const)
      for (const size of [undefined, null, 'xl', 'lg', 'md', 'sm'] as const)
        expect(badgeVariants({variant, appearance, size, className:'consumer'})).toBe(publishedStyles({variant, appearance, size, className:'consumer'}))
})

test('aliases map to existing semantic styles in the component and public helper', () => {
  flushSync(() => root.render(<><Badge variant="default">Predeterminado</Badge><Badge variant="outline">Contorno</Badge></>))
  const badges = host.querySelectorAll<HTMLElement>('[data-slot=badge]')
  expect(badges[0].dataset.variant).toBe('primary')
  expect(badges[0].dataset.appearance).toBe('solid')
  expect(badges[1].dataset.variant).toBe('transparent')
  expect(badges[1].dataset.appearance).toBe('outline')
  expect(badgeVariants({variant:'default'})).toBe(publishedStyles({variant:'primary',appearance:'solid'}))
  expect(badgeVariants({variant:'outline'})).toBe(publishedStyles({variant:'transparent',appearance:'outline'}))
})

test('explicit appearance takes precedence and null behavior remains available', () => {
  expect(badgeVariants({variant:'default',appearance:'outline'})).toBe(publishedStyles({variant:'primary',appearance:'outline'}))
  expect(badgeVariants({variant:'outline',appearance:'solid'})).toBe(publishedStyles({variant:'transparent',appearance:'solid'}))
  expect(badgeVariants({variant:'outline',appearance:null})).toBe(publishedStyles({variant:'transparent',appearance:null}))
})

test('asChild retains the original element, ref and event handler for aliases', async () => {
  const ref = createRef<HTMLButtonElement>(), click = vi.fn()
  flushSync(() => root.render(<Badge variant="outline" asChild><button ref={ref} onClick={click}>Estado</button></Badge>))
  expect(host.querySelectorAll('button')).toHaveLength(1)
  expect(ref.current?.dataset.variant).toBe('transparent')
  await userEvent.click(page.getByRole('button', {name:'Estado'}))
  expect(click).toHaveBeenCalledTimes(1)
})
