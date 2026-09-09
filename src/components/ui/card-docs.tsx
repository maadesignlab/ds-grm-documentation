import { CardExample } from "./card-example"

function Code({ children }: { children: string }) { return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground text-(length:--docs-code-font-size) leading-none">{children}</code> }
function Tile({ title, value, children }: { title: string; value: string; children: React.ReactNode }) { return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="sb-unstyled flex min-h-[425px] items-center justify-center overflow-auto bg-background p-5">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground text-sm leading-5">{title}</strong><Code>{value}</Code></div></article> }

export function CardScaleOverview() { return <div className="not-prose grid gap-3 lg:grid-cols-2"><Tile title="Default" value='size="default"'><CardExample /></Tile><Tile title="Small" value='size="sm"'><CardExample size="sm" spacing={12} /></Tile></div> }
export function CardStyleOverview() { return <div className="not-prose grid gap-3 lg:grid-cols-2"><Tile title="Body" value='variant="body"'><CardExample /></Tile><Tile title="Image" value='variant="image"'><CardExample variant="image" spacing={20} /></Tile></div> }
export function CardFooterOverview() { return <div className="not-prose grid gap-3 lg:grid-cols-3"><Tile title="Column" value='layout="column"'><CardExample footer="column" /></Tile><Tile title="Row" value='layout="row"'><CardExample footer="row" /></Tile><Tile title="Wrap" value='layout="wrap"'><CardExample footer="wrap" /></Tile></div> }

const rows = [
  ["Card default", "384px", "361px", "14px", "16 / 20 / 24 / 32px", "--card / --border"],
  ["Card small", "320px", "361px", "14px", "12px", "--card / --border"],
  ["Header", "Flexible", "68px", "—", "4px", "--foreground / --muted-foreground"],
  ["Image", "100%", "154 / 138 / 122 / 90px", "14px superior", "Según Card", "Contenido"],
  ["Footer row", "100%", "65 / 73 / 81 / 97px", "14px inferior", "10px", "--muted / 50% / --border"],
  ["Footer column", "100%", "107 / 115 / 123 / 139px", "14px inferior", "10px", "--muted / 50% / --border"],
] as const

export function CardSpecifications() { return <section className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table className="docs-spec-table min-w-[760px]"><thead><tr>{["Parte", "Ancho", "Alto", "Radio", "Espaciado", "Tokens"].map(column=><th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row)=><tr key={row[0]}>{row.map((value,columnIndex)=><td key={`${row[0]}-${columnIndex}`}>{columnIndex===0?<Code>{value}</Code>:value.startsWith("--")||value.includes(" / --")?<Code>{value}</Code>:value}</td>)}</tr>)}</tbody></table></section> }
