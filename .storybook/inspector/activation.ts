import { inspectorEnabled } from './model'
import { startInspector } from './Inspector'

type Channel = { on: (name: string, listener: (...args: never[]) => void) => unknown; off: (name: string, listener: (...args: never[]) => void) => unknown }
/** Uses Storybook's own globals lifecycle, including MDX Docs without a Canvas. */
export function bindInspector(channel: Channel) {
  let globals: Record<string, unknown> = {}
  let id = new URLSearchParams(window.location.search).get('id') ?? ''
  let stop: (() => void) | undefined
  const sync = () => {
    const enabled = inspectorEnabled(globals.dsInspector, globals.dsInspectorOverrides, id)
    if (enabled && !stop) stop = startInspector()
    if (!enabled && stop) { stop(); stop = undefined }
  }
  const updateGlobals = (payload: { globals?: Record<string, unknown> }) => { globals = { ...globals, ...payload.globals }; sync() }
  const updateStory = (storyId: string) => { id = storyId; sync() }
  channel.on('globalsUpdated', updateGlobals)
  channel.on('setGlobals', updateGlobals)
  channel.on('storyRendered', updateStory)
  channel.on('docsRendered', updateStory)
  return () => {
    stop?.()
    channel.off('globalsUpdated', updateGlobals)
    channel.off('setGlobals', updateGlobals)
    channel.off('storyRendered', updateStory)
    channel.off('docsRendered', updateStory)
  }
}
