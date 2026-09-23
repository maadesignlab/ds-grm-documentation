import {chromium} from '/Users/miguelarias/DEV/REINA MADRE/ds-grm-documentation/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const out='/Users/miguelarias/Documents/ChatGPT/Reina Madre DS/artifacts/release-1.1/browser';
const index=await(await fetch('http://localhost:6006/index.json')).json();
const docs=Object.values(index.entries).filter(x=>x.type==='docs');console.log(docs.map(x=>({id:x.id,title:x.title})));
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1400,height:1000}});p.setDefaultTimeout(20000);const result=[];
try{for(const brand of ['grm-global','reina-madre','maria-linda','piel-sana']){
 for(const slug of ['input','table','select','native-select','button','tabs']){
  const doc=docs.find(x=>x.id===`components-${slug}--docs`);if(!doc)throw Error('Missing docs '+slug);
  await p.goto(`http://localhost:6006/iframe.html?id=${doc.id}&viewMode=docs&globals=brandTheme:${brand}`);
  const selector=slug==='input'?'input':slug==='table'?'[data-slot=table-header]':slug==='select'?'[data-slot=select-trigger]':slug==='native-select'?'[data-slot=native-select]':slug==='button'?'[data-slot=button]':'[data-slot=tabs-trigger]';
  await p.locator(selector).first().waitFor();await p.evaluate(()=>document.fonts.ready);
  const values=await p.locator(selector).evaluateAll(ns=>ns.slice(0,20).map(n=>{const s=getComputedStyle(n);return{text:n.textContent,height:n.getBoundingClientRect().height,radius:s.borderRadius,color:s.color,background:s.backgroundColor,font:s.fontFamily,fontSize:s.fontSize,lineHeight:s.lineHeight,gradient:s.backgroundImage}}));
  result.push({brand,slug,values});
  if(brand==='grm-global')await p.screenshot({path:`${out}/docs-${slug}.png`});
  console.log('Docs',brand,slug,values.length);
 }
}
await fs.writeFile(`${out}/docs-parity.json`,JSON.stringify(result,null,2));
}finally{await b.close()}
