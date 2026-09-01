"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full min-w-0 flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  style,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex" style={{ margin: 0 }}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex w-full min-w-0 flex-1 items-start gap-1.5 rounded-[10px] py-2.5 text-left font-sans text-[14px] font-medium leading-[20px] tracking-normal text-foreground transition-all outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-foreground",
          className
        )}
        style={{
          fontFamily: "var(--brand-font-sans)",
          fontSize: 14,
          fontWeight: "var(--font-weight-medium)",
          lineHeight: "20px",
          letterSpacing: 0,
          ...style,
        }}
        {...props}
      >
        <span
          data-slot="accordion-trigger-text"
          className="min-w-0 flex-1"
          style={{ font: "inherit", letterSpacing: "inherit" }}
        >
          {children}
        </span>
        <ChevronDownIcon data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  style,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden font-sans text-[14px] leading-[20px] tracking-normal text-foreground data-open:animate-accordion-down data-closed:animate-accordion-up"
      style={{
        fontFamily: "var(--brand-font-sans)",
        fontSize: 14,
        fontWeight: 400,
        lineHeight: "20px",
        letterSpacing: 0,
        ...style,
      }}
      {...props}
    >
      <div
        data-slot="accordion-content-inner"
        className={cn(
          "h-(--radix-accordion-content-height) w-full min-w-0 pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
        style={{
          fontFamily: "var(--brand-font-sans)",
          fontSize: 14,
          fontWeight: 400,
          lineHeight: "20px",
          letterSpacing: 0,
        }}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
