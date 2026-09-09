"use client"

import { ContextMenuExample } from "./context-menu-example"
import { DocsCard, DocsSection, DocsTable } from "./selectable-docs-shared"

function Card({title,value,children,tall=false}:{title:string;value:string;children:React.ReactNode;tall?:boolean}){return <DocsCard title={title} value={value} className="overflow-visible" previewClassName={`${tall?"min-h-72":"min-h-36"} overflow-visible rounded-t-lg p-8`}>{children}</DocsCard>}

export function ContextMenuStates(){return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="Trigger" value="right click" tall><ContextMenuExample /></Card><Card title="Open" value="opened" tall><ContextMenuExample opened /></Card></div>}

const geometry=[["Trigger","100% / 512px máx.","192px","24px","8px","14px"],["Content","176px mín.","Contenido","4px","10px","—"],["Label","168px","24px","6px · 4px","—","12px / 16px"],["Item","168px","28px","6px · 4px","8px","14px / 20px"],["Icono","16px","16px","—","—","—"],["Separador","176px","1px","—","—","—"]] as const
const states=[["Default","--popover","--foreground","—"],["Hover / active","--accent","--accent-foreground","focus / data-open"],["Destructive","--popover","--destructive","variant=destructive"],["Destructive hover","--destructive / 10%","--destructive","focus"],["Disabled","—","--foreground","opacity-50"]] as const
export function ContextMenuSpecifications(){return <div className="not-prose grid gap-6"><DocsSection title="Geometría y tipografía"><DocsTable columns={["Parte","Ancho","Alto","Padding","Radio","Texto"]} rows={geometry} minWidthClassName="min-w-[680px]" /></DocsSection><DocsSection title="Estados y tokens"><DocsTable columns={["Estado","Fondo","Texto","Implementación"]} rows={states} minWidthClassName="min-w-[680px]" /></DocsSection></div>}
