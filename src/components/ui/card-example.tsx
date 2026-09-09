import { MoreHorizontal } from "lucide-react"

import { Button } from "./button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"

export type CardExampleProps = {
  size?: "default" | "sm"
  variant?: "body" | "image"
  spacing?: 12 | 16 | 20 | 24 | 32
  footer?: "column" | "row" | "wrap"
  showAction?: boolean
  title?: string
  description?: string
}

export function CardExample({ size = "default", variant = "body", spacing = 16, footer = "column", showAction = true, title = "Login to your account", description = "Enter your email below to login to your account" }: CardExampleProps) {
  return (
    <Card size={size} variant={variant} spacing={spacing} className="h-[361px]">
      {variant === "image" && <div className="min-h-0 w-full flex-1 bg-muted" aria-label="Área de imagen" />}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {showAction && <CardAction><Button variant="ghost" size="icon"><MoreHorizontal aria-hidden /></Button></CardAction>}
      </CardHeader>
      {variant === "body" && <CardContent className="flex flex-1 items-center text-muted-foreground">Contenido flexible de la tarjeta</CardContent>}
      <CardFooter layout={footer}><Button variant="outline">Cancelar</Button><Button>Continuar</Button></CardFooter>
    </Card>
  )
}
