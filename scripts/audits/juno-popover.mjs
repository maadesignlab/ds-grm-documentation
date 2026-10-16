import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
const current = process.argv.includes('--current');

// Synthetic consumer cases derived from DEV's report, not Juno source code.
const root = process.cwd();
const config = ts.readConfigFile('tsconfig.json', ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const options = { ...parsed.options, incremental: false, noEmit: true };
const cases = [
  { id: 'missing-anchor', expected: 'PopoverAnchor', source: 'import { PopoverAnchor } from "@/components/ui/popover"; export const View = () => <PopoverAnchor />;' },
  { id: 'legacy-as-child', expected: 'asChild', source: 'import { PopoverTrigger } from "@/components/ui/popover"; export const View = () => <PopoverTrigger asChild><button>Abrir</button></PopoverTrigger>;' },
  { id: 'legacy-open-focus', expected: 'onOpenAutoFocus', source: 'import { PopoverContent } from "@/components/ui/popover"; export const View = () => <PopoverContent onOpenAutoFocus={(event: Event) => event.preventDefault()} />;' },
  { id: 'positioner-anchor-not-exposed', expected: 'anchor', source: 'import { PopoverContent } from "@/components/ui/popover"; export const View = () => <PopoverContent anchor={null} />;' },
  { id: 'current-api', expected: null, source: 'import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"; export const View = () => <Popover><PopoverTrigger render={<button>Abrir</button>} /><PopoverContent initialFocus={false} finalFocus={true} container={null}>Contenido</PopoverContent></Popover>;' },
];
const results = cases.map(test => {
  const filename = path.join(root, '__juno_consumer_audit__.tsx');
  const host = ts.createCompilerHost(options);
  const original = host.getSourceFile.bind(host);
  const baseline = current ? null : execFileSync('git', ['show', 'v1.2.0:src/components/ui/popover.tsx'], { encoding: 'utf8' });
  host.getSourceFile = (name, languageVersion, onError, shouldCreateNewSourceFile) => name === filename ? ts.createSourceFile(name, test.source, languageVersion, true, ts.ScriptKind.TSX) : baseline && name === path.join(root, 'src/components/ui/popover.tsx') ? ts.createSourceFile(name, baseline, languageVersion, true, ts.ScriptKind.TSX) : original(name, languageVersion, onError, shouldCreateNewSourceFile);
  const program = ts.createProgram([filename], options, host);
  const diagnostics = ts.getPreEmitDiagnostics(program).map(d => ({ code: d.code, file: d.file ? path.relative(root, d.file.fileName) : null, message: ts.flattenDiagnosticMessageText(d.messageText, '\n') }));
  assert(!diagnostics.some(d => d.file !== '__juno_consumer_audit__.tsx'), `Unexpected dependency errors: ${JSON.stringify(diagnostics)}`);
  if (test.expected && !current) assert(diagnostics.some(d => d.message.includes(test.expected)), `Expected incompatibility not reproduced: ${test.id}`);
  else assert.equal(diagnostics.length, 0, 'Current supported API must compile');
  return { ...test, reproduced: true, diagnostics };
});
const report = { baseline: current ? 'Local compatibility candidate' : 'DS 1.2.0', scope: 'Synthetic TypeScript consumer; not Juno runtime or its 309 reported errors', results };
fs.writeFileSync(`docs/compatibility/juno/popover-${current ? 'candidate' : 'baseline'}.json`, JSON.stringify(report, null, 2) + '\n');
console.log(current ? 'All five consumer cases compile with the compatibility candidate.' : 'Baseline v1.2.0: four incompatibilities reproduced; modern API compiles.');
