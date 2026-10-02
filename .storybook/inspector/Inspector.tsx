import { createRoot, type Root } from 'react-dom/client'
import { indexRules, inspectElement } from './model'
import './inspector.css'

type Snapshot = ReturnType<typeof inspectElement>
function Panel({ snapshot, frozen, point }: { snapshot: Snapshot; frozen: boolean; point: { x: number; y: number } }) {
  const placeCard = (node: HTMLElement | null) => {
    if (!node) return
    const { width, height } = node.getBoundingClientRect()
    const x = point.x + 16 + width <= window.innerWidth ? point.x + 16 : point.x - width - 16
    const y = point.y + 16 + height <= window.innerHeight ? point.y + 16 : point.y - height - 16
    node.style.left = `${Math.max(8, Math.min(x, window.innerWidth - width - 8))}px`
    node.style.top = `${Math.max(8, Math.min(y, window.innerHeight - height - 8))}px`
  }
  return <><div className="grm-inspector-outline" style={{ left: snapshot.rect.x, top: snapshot.rect.y, width: snapshot.rect.width, height: snapshot.rect.height }} />
    <aside ref={placeCard} className="grm-inspector-panel" data-frozen={frozen} aria-label="Inspector del Design System">
      <header><strong>{snapshot.name}</strong><span>{snapshot.brand} · {Math.round(snapshot.rect.width)} × {Math.round(snapshot.rect.height)} px</span></header>
      <p>Alt + I: {frozen ? 'reanudar' : 'fijar'} · Esc: limpiar</p>
      <p>{snapshot.ancestors.join(' › ') || 'Elemento HTML'}{snapshot.states.length ? ` · ${snapshot.states.join(' · ')}` : ''}</p>
      <details open><summary>Valores actuales</summary><dl>{snapshot.computed.map(row => <div key={row.property}><dt>{row.property}</dt><dd>{row.value || '—'}</dd></div>)}</dl></details>
      <details open><summary>Tokens referenciados ({snapshot.tokens.length})</summary>{snapshot.tokens.length ? <dl>{snapshot.tokens.map(token => <div key={token.name}><dt>{token.name}</dt><dd>{token.value}</dd></div>)}</dl> : <p>No se detectaron referencias accesibles a variables CSS.</p>}</details>
      <details><summary>Reglas coincidentes ({snapshot.references.length})</summary><p>Incluye reglas heredadas o sobrescritas; no constituye la cadena ganadora completa de la cascada.</p><dl>{snapshot.references.map((ref, i) => <div key={i}><dt>{ref.property}{ref.inherited ? ' · heredada' : ''}</dt><dd>{ref.expression}<small>{ref.selector}</small></dd></div>)}</dl></details>
      <details open><summary>Componentes anidados ({snapshot.children.length})</summary><p>{snapshot.children.join(' · ') || 'Sin componentes con data-slot dentro de este elemento.'}</p></details>
      <p>Jerarquía basada en data-slot del DOM; no en el árbol privado de React.{snapshot.unreadable ? ` ${snapshot.unreadable} hojas CSS no accesibles.` : ''}</p>
    </aside></>
}

// A single listener/overlay shared by all Docs examples and Canvas decorators.
const owners = new Set<symbol>()
let dispose: (() => void) | undefined
export function startInspector() {
  const owner = Symbol()
  owners.add(owner)
  if (!dispose) dispose = mountInspector()
  return () => { owners.delete(owner); if (!owners.size) { dispose?.(); dispose = undefined } }
}
function mountInspector() {
  const host = document.createElement('div')
  host.dataset.grmInspector = 'true'
  host.setAttribute('popover', 'manual')
  document.body.append(host)
  try { host.showPopover() } catch { /* Older browsers retain a fixed overlay. */ }
  const root: Root = createRoot(host)
  let rules = indexRules(document)
  let selected: Element | null = null
  let frozen = false
  let cursor = { x: 0, y: 0 }
  let frame = 0
  const render = () => {
    frame = 0
    if (selected?.isConnected) root.render(<Panel snapshot={inspectElement(selected, rules)} frozen={frozen} point={cursor} />)
    else root.render(null)
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(render) }
  const point = (event: PointerEvent) => {
    if (host.contains(event.target as Node) || frozen) return
    const target = event.target instanceof Element ? event.target : null
    if (!target || (!target.closest('[data-slot]') && !target.closest('.sb-story, #storybook-root'))) { selected = null; schedule(); return }
    selected = target.closest('[data-slot]') ?? target
    cursor = { x: event.clientX, y: event.clientY }
    schedule()
  }
  const leave = (event: PointerEvent) => {
    if (!event.relatedTarget && !frozen) { selected = null; schedule() }
  }
  const key = (event: KeyboardEvent) => {
    if (event.altKey && event.code === 'KeyI') { event.preventDefault(); frozen = !frozen; schedule() }
    if (event.key === 'Escape') { selected = null; frozen = false; schedule() }
  }
  const invalidate = () => { rules = indexRules(document); schedule() }
  const observer = new MutationObserver(invalidate)
  observer.observe(document.head, { childList: true, subtree: true, characterData: true })
  const brandObserver = new MutationObserver(schedule)
  brandObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  document.addEventListener('pointermove', point, true)
  document.addEventListener('pointerout', leave, true)
  document.addEventListener('keydown', key, true)
  document.addEventListener('scroll', schedule, true)
  window.addEventListener('resize', schedule)
  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect(); brandObserver.disconnect()
    document.removeEventListener('pointermove', point, true)
    document.removeEventListener('pointerout', leave, true)
    document.removeEventListener('keydown', key, true)
    document.removeEventListener('scroll', schedule, true)
    window.removeEventListener('resize', schedule)
    // Avoid unmounting a second React root during the parent root's commit.
    queueMicrotask(() => { root.unmount(); host.remove() })
  }
}
