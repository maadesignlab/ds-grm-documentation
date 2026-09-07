"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable"

export type ResizableExampleProps = {
  orientation?: "horizontal" | "vertical"
  distribution?: "25/75" | "50/50" | "75/25"
  withHandle?: boolean
  layout?: "two-panels" | "nested"
}

export const resizablePlaygroundArgs = {
  orientation: "horizontal",
  distribution: "50/50",
  withHandle: false,
  layout: "two-panels",
} as const satisfies ResizableExampleProps

export const resizableExamplePresets = {
  playground: resizablePlaygroundArgs,
  horizontal: { ...resizablePlaygroundArgs },
  vertical: { ...resizablePlaygroundArgs, orientation: "vertical" },
  quarter: { ...resizablePlaygroundArgs, distribution: "25/75" },
  half: { ...resizablePlaygroundArgs },
  threeQuarter: { ...resizablePlaygroundArgs, distribution: "75/25" },
  handle: { ...resizablePlaygroundArgs, withHandle: true },
  nested: { ...resizablePlaygroundArgs, layout: "nested", withHandle: true },
} as const satisfies Record<string, ResizableExampleProps>

const sizes = {
  "25/75": ["25%", "75%"],
  "50/50": ["50%", "50%"],
  "75/25": ["75%", "25%"],
} as const

function PanelContent({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full items-center justify-center bg-background text-sm font-medium text-foreground">{children}</div>
}

export function ResizableExample({ orientation = "horizontal", distribution = "50/50", withHandle = false, layout = "two-panels" }: ResizableExampleProps) {
  const [first, second] = sizes[distribution]
  const key = `${orientation}-${distribution}-${withHandle}-${layout}`

  if (layout === "nested") {
    return (
      <div className="h-[200px] w-full max-w-[450px] overflow-hidden rounded-lg border border-border">
        <ResizablePanelGroup key={key} orientation="horizontal">
          <ResizablePanel defaultSize="25%"><PanelContent>One</PanelContent></ResizablePanel>
          <ResizableHandle withHandle={withHandle} />
          <ResizablePanel defaultSize="75%">
            <ResizablePanelGroup orientation="vertical">
              <ResizablePanel defaultSize="50%"><PanelContent>Two</PanelContent></ResizablePanel>
              <ResizableHandle withHandle={withHandle} />
              <ResizablePanel defaultSize="50%"><PanelContent>Three</PanelContent></ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    )
  }

  return (
    <div className="h-[200px] w-full max-w-[450px] overflow-hidden rounded-lg border border-border">
      <ResizablePanelGroup key={key} orientation={orientation}>
        <ResizablePanel defaultSize={first}><PanelContent>One</PanelContent></ResizablePanel>
        <ResizableHandle withHandle={withHandle} />
        <ResizablePanel defaultSize={second}><PanelContent>Two</PanelContent></ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
