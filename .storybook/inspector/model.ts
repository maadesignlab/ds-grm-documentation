export type InspectorMode = 'inherit' | 'on' | 'off'
export function inspectorEnabled(global: unknown, overrides: unknown, id: string): boolean {
  const key = id.split('--')[0]
  const local = overrides && typeof overrides === 'object' ? (overrides as Record<string, InspectorMode>)[key] : undefined
  return local === 'on' || (local !== 'off' && global === 'on')
}

const properties = ['color', 'background-color', 'background-image', 'border-color', 'padding', 'margin', 'gap', 'width', 'height', 'border-radius', 'box-shadow', 'font-family', 'font-size', 'font-weight', 'line-height']
type Rule = { selector: string; style: CSSStyleDeclaration; conditions: (() => boolean)[] }
export function indexRules(document: Document) {
  const rules: Rule[] = []
  let unreadable = 0
  const visit = (list: CSSRuleList, conditions: (() => boolean)[] = [], parent = '') => {
    for (const rule of Array.from(list)) {
      if (rule instanceof CSSMediaRule) visit(rule.cssRules, [...conditions, () => matchMedia(rule.conditionText).matches], parent)
      else if (rule instanceof CSSSupportsRule) visit(rule.cssRules, [...conditions, () => CSS.supports(rule.conditionText)], parent)
      else if (rule instanceof CSSStyleRule) {
        const selector = parent ? (rule.selectorText.includes('&') ? rule.selectorText.replaceAll('&', `:is(${parent})`) : `:is(${parent}) ${rule.selectorText}`) : rule.selectorText
        rules.push({ selector, style: rule.style, conditions })
        if ('cssRules' in rule) visit(rule.cssRules, conditions, selector)
      } else if ('cssRules' in rule) visit((rule as CSSGroupingRule).cssRules, conditions, parent)
      else if (parent && 'style' in rule) rules.push({ selector: parent, style: (rule as CSSRule & { style: CSSStyleDeclaration }).style, conditions })
    }
  }
  for (const sheet of [...Array.from(document.styleSheets), ...document.adoptedStyleSheets]) {
    try { visit(sheet.cssRules) } catch { unreadable++ }
  }
  return { rules, unreadable }
}
export type RuleIndex = ReturnType<typeof indexRules>
export function inspectElement(element: Element, index: RuleIndex) {
  const computed = getComputedStyle(element)
  const rect = element.getBoundingClientRect()
  const references: { property: string; expression: string; tokens: string[]; selector: string; inherited: boolean }[] = []
  for (let node: Element | null = element; node && references.length < 60; node = node.parentElement) {
    const inherited = node !== element
    for (const rule of index.rules) {
      if (!rule.conditions.every(test => test())) continue
      let matches = false
      try { matches = node.matches(rule.selector) } catch { continue }
      if (!matches) continue
      for (const property of Array.from(rule.style)) {
        if (inherited && !['color', 'font', 'font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing'].includes(property)) continue
        if (property.startsWith('--')) continue
        const expression = rule.style.getPropertyValue(property)
        const tokens = [...new Set(expression.match(/--[\w-]+/g) ?? [])]
        if (tokens.length) references.push({ property, expression, tokens, selector: rule.selector, inherited })
      }
    }
  }
  for (const property of Array.from((element as HTMLElement).style ?? [])) {
    const expression = (element as HTMLElement).style.getPropertyValue(property)
    const tokens = [...new Set(expression.match(/--[\w-]+/g) ?? [])]
    if (tokens.length) references.unshift({ property, expression, tokens, selector: 'style inline', inherited: false })
  }
  const tokens = [...new Set(references.flatMap(ref => ref.tokens))].map(name => ({ name, value: computed.getPropertyValue(name).trim() || 'No resuelto en este elemento' }))
  const ancestors: string[] = []
  for (let node: Element | null = element; node; node = node.parentElement) {
    const slot = node.getAttribute('data-slot')
    if (slot) ancestors.unshift(slot)
  }
  return {
    name: element.getAttribute('data-slot') ?? element.tagName.toLowerCase(),
    brand: element.closest('[data-theme]')?.getAttribute('data-theme') ?? document.documentElement.getAttribute('data-theme'),
    rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
    computed: properties.map(property => ({ property, value: computed.getPropertyValue(property) })),
    references, tokens, ancestors,
    children: [...new Set(Array.from(element.querySelectorAll('[data-slot]')).map(child => child.getAttribute('data-slot')!))],
    states: ['data-state', 'data-variant', 'data-size', 'aria-disabled', 'disabled'].filter(name => element.hasAttribute(name)).map(name => `${name}=${element.getAttribute(name) || 'true'}`),
    unreadable: index.unreadable,
  }
}
