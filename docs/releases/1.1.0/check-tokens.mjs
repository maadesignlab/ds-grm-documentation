import {chromium} from '/Users/miguelarias/DEV/REINA MADRE/ds-grm-documentation/node_modules/playwright/index.mjs';
import {semanticBrandTokenValues} from '/Users/miguelarias/DEV/REINA MADRE/ds-grm-documentation/src/foundations/semantic-brand-token-values.ts';
import fs from 'node:fs/promises';
const b=await chromium.launch();const p=await b.newPage();const results=[];
try{for(const [brand,tokens]of Object.entries(semanticBrandTokenValues)){
await p.goto(`http://localhost:6006/iframe.html?id=components-input--playground&viewMode=story&globals=brandTheme:${brand}`);await p.locator('input[data-slot=input]').waitFor();
const diff=await p.evaluate(({tokens})=>{const s=getComputedStyle(document.documentElement);return Object.entries(tokens).filter(([k,v])=>s.getPropertyValue(k).trim()!==v).map(([k,v])=>({key:k,expected:v,actual:s.getPropertyValue(k).trim()}));},{brand,tokens});if(diff.length)throw Error(JSON.stringify({brand,diff}));results.push({brand,count:Object.keys(tokens).length,differences:0});}
await fs.writeFile('/Users/miguelarias/Documents/ChatGPT/Reina Madre DS/artifacts/release-1.1/browser/tokens-624.json',JSON.stringify(results,null,2));console.log(results);
}finally{await b.close()}
