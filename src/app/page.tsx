import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-10 px-6 py-16">
      <div className="flex flex-wrap gap-2">
        <Badge size="xl">Design System</Badge>
        <Badge size="xl" variant="secondary">GRM v1.0.0</Badge>
      </div>
      <div className="max-w-3xl space-y-4">
        <h1 className="text-5xl font-medium tracking-tight">Grupo Reina Madre</h1>
        <p className="text-lg leading-8 text-foreground/70">
          Componentes React basados en shadcn/ui, adaptados a los tokens y a la organización definida en Figma.
        </p>
      </div>
      <div className="flex items-center gap-4 rounded-xl border bg-white p-6">
        <Spinner size={24} className="text-primary" />
        <span>La documentación de componentes vive en Storybook.</span>
      </div>
    </main>
  );
}
