"use client"

import { useId, useState } from "react"
import { icons } from "lucide-react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

const catalog = Object.entries(icons).sort(([a], [b]) => a.localeCompare(b))
const pageSize = 60

export function IconGallery() {
  const id = useId()
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(0)
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "")
  const matches = catalog.filter(([name]) => normalize(name).includes(normalize(query)))
  const pages = Math.max(1, Math.ceil(matches.length / pageSize))
  const visible = matches.slice(page * pageSize, (page + 1) * pageSize)

  return <section className="sb-unstyled flex flex-col gap-4 text-sm leading-5 text-foreground" aria-label="Catálogo de iconos">
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">Buscar iconos</label>
      <Input id={id} type="search" value={query} placeholder="Buscar por nombre: calendar, user, arrow…" onChange={event => { setQuery(event.target.value); setPage(0) }} />
      <p className="text-sm" role="status">{matches.length} de {catalog.length} iconos · nombres de importación de lucide-react</p>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {visible.map(([name, Icon]) => <figure key={name} className="m-0 flex min-w-0 flex-col items-center gap-4 rounded-lg border border-border bg-card p-4 text-card-foreground">
        <Icon className="size-6 shrink-0" aria-hidden="true" />
        <figcaption className="w-full break-words text-center font-mono text-xs leading-4">{name}</figcaption>
      </figure>)}
    </div>
    {matches.length === 0 && <p className="rounded-lg border border-border p-6">No hay iconos con ese nombre. Prueba con un término en inglés.</p>}
    <nav aria-label="Páginas de iconos" className="flex flex-wrap items-center justify-between gap-3">
      <Button disabled={page === 0} onClick={() => setPage(value => value - 1)}>Anterior</Button>
      <span className="text-sm">Página {page + 1} de {pages}</span>
      <Button disabled={page + 1 >= pages} onClick={() => setPage(value => value + 1)}>Siguiente</Button>
    </nav>
  </section>
}
