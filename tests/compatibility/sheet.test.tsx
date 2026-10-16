import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { beforeEach, afterEach, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { Sheet, SheetTrigger, SheetTitle, SheetDescription } from '../../src/components/ui/sheet'
import { SheetResizableContent } from '../../src/components/ui/sheet-resizable'
let host: HTMLDivElement, root: Root
beforeEach(() => { localStorage.removeItem('grm:sheet:test-resize'); host = document.createElement('div'); document.body.append(host); root = createRoot(host) })
afterEach(() => { flushSync(() => root.unmount()); host.remove(); localStorage.removeItem('grm:sheet:test-resize') })
const panel = (resizable = true) => <Sheet><SheetTrigger>Abrir prueba</SheetTrigger><SheetResizableContent resizable={resizable} defaultWidth={480} resizeKey="test-resize"><SheetTitle>Panel</SheetTitle><SheetDescription>Prueba</SheetDescription><input aria-label="Campo" /></SheetResizableContent></Sheet>

test('initial width, keyboard changes and opt-in persistence survive remount', async () => {
  flushSync(() => root.render(panel()))
  await userEvent.click(page.getByRole('button', {name:'Abrir prueba'}))
  const grip = document.querySelector<HTMLElement>('[data-slot="sheet-resize"]')!
  expect(grip.getAttribute('aria-valuenow')).toBe(String(Math.min(480, window.innerWidth)))
  grip.focus(); await userEvent.keyboard('{End}')
  expect(localStorage.getItem('grm:sheet:test-resize')).toBe(String(Math.min(720, window.innerWidth)))
  flushSync(() => root.render(null)); flushSync(() => root.render(panel()))
  await userEvent.click(page.getByRole('button', {name:'Abrir prueba'}))
  await expect.poll(() => document.querySelector('[data-slot="sheet-resize"]')?.getAttribute('aria-valuenow')).toBe(String(Math.min(720, window.innerWidth)))
})

test('resizable=false omits grip; Radix focus events and Escape remain available', async () => {
  flushSync(() => root.render(<Sheet><SheetTrigger>Abrir foco</SheetTrigger><SheetResizableContent resizable={false} onOpenAutoFocus={e => e.preventDefault()}><SheetTitle>Panel</SheetTitle><SheetDescription>Prueba</SheetDescription></SheetResizableContent></Sheet>))
  await userEvent.click(page.getByRole('button', {name:'Abrir foco'}))
  expect(document.querySelector('[data-slot="sheet-resize"]')).toBeNull()
  expect(document.activeElement?.textContent).toBe('Abrir foco')
  await userEvent.keyboard('{Escape}')
  await expect.poll(() => document.querySelector('[data-slot="sheet-content"]')).toBeNull()
})
