import React from 'react'
import { addons, types, useGlobals, useStorybookState } from 'storybook/manager-api'
import { IconButton } from 'storybook/internal/components'
import type { InspectorMode } from './inspector/model'

function ComponentInspectorTool() {
  const [globals, updateGlobals] = useGlobals()
  const { storyId } = useStorybookState()
  const key = storyId?.split('--')[0]
  const overrides = (globals.dsInspectorOverrides ?? {}) as Record<string, InspectorMode>
  const mode = key ? overrides[key] ?? 'inherit' : 'inherit'
  const labels = { inherit: 'Heredar', on: 'Activo', off: 'Inactivo' }
  return <IconButton disabled={!key} active={mode === 'on'} title="Inspector de este componente: clic para alternar Heredar → Activo → Inactivo" onClick={() => {
    if (!key) return
    const next = mode === 'inherit' ? 'on' : mode === 'on' ? 'off' : 'inherit'
    updateGlobals({ dsInspectorOverrides: { ...overrides, [key]: next } })
  }}>Componente: {labels[mode]}</IconButton>
}
addons.register('grm/inspector', () => {
  addons.add('grm/inspector/component', { type: types.TOOL, title: 'Inspector del componente', match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs', render: () => <ComponentInspectorTool /> })
})
