import { useState } from 'react';
import { Button } from '../components/ui/button';

export function CssExport({ css, filename, description }: { css: string; filename: string; description: string }) {
  const [message, setMessage] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(css);
      setMessage('CSS copiado al portapapeles.');
    } catch {
      setMessage('No se pudo acceder al portapapeles. Puedes descargar el archivo o seleccionar el CSS de la vista previa.');
    }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([css], { type: 'text/css;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage('Archivo CSS generado.');
  }
  return <section aria-label={`Exportar CSS: ${filename}`} className="grid gap-3 rounded-lg border border-border bg-card p-4 text-foreground">
    <p className="m-0 text-sm">{description}</p>
    <div className="flex flex-wrap gap-3">
      <Button className="border border-border bg-muted text-foreground hover:bg-background-hover active:bg-background-active" onClick={copy}>Copiar CSS</Button>
      <Button className="border border-border bg-muted text-foreground hover:bg-background-hover active:bg-background-active" onClick={download}>Descargar .css</Button>
    </div>
    <p role="status" className="m-0 text-sm">{message}</p>
    <details><summary className="cursor-pointer text-sm underline underline-offset-4">Ver CSS</summary>
      <pre tabIndex={0} aria-label="Código CSS para exportar" className="mt-3 max-h-80 overflow-auto rounded-md border border-border bg-muted p-4 text-xs text-foreground"><code>{css}</code></pre>
    </details>
  </section>;
}

export function cssBlock(selector: string, entries: readonly (readonly [string, string])[]): string {
  return `${selector} {\n${entries.map(([name, value]) => `  ${name}: ${value};`).join('\n')}\n}\n`;
}
