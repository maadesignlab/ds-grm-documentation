import type { ReactNode } from 'react';

type DocumentationHeaderProps = {
  title: string;
  children: ReactNode;
};

export function DocumentationHeader({ title, children }: DocumentationHeaderProps) {
  return (
    <header className="sb-unstyled not-prose grid gap-2 border-b border-border pb-6">
      <h1 className="m-0 text-3xl leading-9 font-semibold tracking-tight text-foreground">{title}</h1>
      <p className="m-0 max-w-3xl text-sm leading-6 text-muted-foreground">{children}</p>
    </header>
  );
}
