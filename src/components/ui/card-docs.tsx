import { MoreHorizontal } from "lucide-react"
import { Button } from "./button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"

type SampleProps = { size?: "default" | "sm"; variant?: "body" | "image"; spacing?: 12 | 16 | 20 | 24 | 32; footer?: "column" | "row" | "wrap" }

function Sample({ size = "default", variant = "body", spacing = 16, footer = "column" }: SampleProps) {
  return <Card size={size} variant={variant} spacing={spacing} className="h-[361px]">
    {variant === "image" && <div className="min-h-0 w-full flex-1 bg-muted" />}
    <CardHeader><CardTitle>Login to your account</CardTitle><CardDescription>Enter your email below to login to your account</CardDescription><CardAction><Button variant="ghost" size="icon"><MoreHorizontal /></Button></CardAction></CardHeader>
    {variant === "body" && <CardContent className="flex flex-1 items-center text-muted-foreground">Card Body</CardContent>}
    <CardFooter layout={footer}><Button variant="outline">Cancelar</Button><Button>Continuar</Button></CardFooter>
  </Card>
}

function Code({ children }: { children: string }) { return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code> }
function Tile({ title, value, children }: { title: string; value: string; children: React.ReactNode }) { return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="flex min-h-[425px] items-center justify-center overflow-auto bg-background p-5">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article> }

export function CardScaleOverview() { return <div className="not-prose grid gap-3 lg:grid-cols-2"><Tile title="Default" value='size="default"'><Sample /></Tile><Tile title="Small" value='size="sm"'><Sample size="sm" spacing={12} /></Tile></div> }
export function CardStyleOverview() { return <div className="not-prose grid gap-3 lg:grid-cols-2"><Tile title="Body" value='variant="body"'><Sample /></Tile><Tile title="Image" value='variant="image"'><Sample variant="image" spacing={20} /></Tile></div> }
export function CardFooterOverview() { return <div className="not-prose grid gap-3 lg:grid-cols-3"><Tile title="Column" value='layout="column"'><Sample footer="column" /></Tile><Tile title="Row" value='layout="row"'><Sample footer="row" /></Tile><Tile title="Wrap" value='layout="wrap"'><Sample footer="wrap" /></Tile></div> }

const rows = [
  ["Card default", "384px", "361px", "14px", "16 / 20 / 24 / 32px", "--card / --border"],
  ["Card small", "320px", "361px", "14px", "12px", "--card / --border"],
  ["Header", "Flexible", "68px", "—", "4px", "--foreground / --muted-foreground"],
  ["Image", "100%", "154 / 138 / 122 / 90px", "14px superior", "Según Card", "Contenido"],
  ["Footer row", "100%", "65 / 73 / 81 / 97px", "14px inferior", "10px", "--muted / 50% / --border"],
  ["Footer column", "100%", "107 / 115 / 123 / 139px", "14px inferior", "10px", "--muted / 50% / --border"],
] as const

export function CardSpecifications() { return <section className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 760, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{["Parte", "Ancho", "Alto", "Radio", "Espaciado", "Tokens"].map(column=><th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row,rowIndex)=><tr key={row[0]} style={{ background: rowIndex % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value,columnIndex)=><td key={`${row[0]}-${columnIndex}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: rowIndex === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, textAlign: "left", verticalAlign: "middle" }}>{columnIndex===0?<Code>{value}</Code>:value.startsWith("--")||value.includes(" / --")?<Code>{value}</Code>:value}</td>)}</tr>)}</tbody></table></section> }
