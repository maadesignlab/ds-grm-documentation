import { chromium } from '/Users/miguelarias/DEV/REINA MADRE/ds-grm-documentation/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const out='/Users/miguelarias/Documents/ChatGPT/Reina Madre DS/artifacts/release-1.1/browser';
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:800,height:400}});
const results=[];
try {
 for(const brand of ['grm-global','reina-madre','maria-linda','piel-sana']){
  await page.goto(`http://localhost:6006/iframe.html?id=components-button--texto&viewMode=story&args=variant:brand-gradient;contentPlacement:none&globals=brandTheme:${brand}`);
  const button=page.locator('[data-slot="button"]').first();await button.waitFor();await page.evaluate(()=>document.fonts.ready);
  const inspect=()=>button.evaluate(el=>{const s=getComputedStyle(el),p=getComputedStyle(el,'::before');return{brand:document.documentElement.dataset.theme,height:el.getBoundingClientRect().height,radius:s.borderRadius,color:s.color,gradient:s.backgroundImage,overlay:p.opacity,overlayColor:p.backgroundColor}});
  const normal=await inspect();if(normal.brand!==brand||normal.height!==32||normal.radius!=='6px'||normal.color!=='rgb(255, 255, 255)'||!normal.gradient.includes('linear-gradient'))throw new Error(JSON.stringify(normal));
  await button.screenshot({path:`${out}/button-gradient-${brand}.png`,scale:'css'});
  await button.hover();await page.waitForTimeout(200);const hover=await inspect();
  await page.mouse.down();await page.waitForTimeout(200);const active=await inspect();await page.mouse.up();
  if(Math.abs(Number(hover.overlay)-.08)>.001||Math.abs(Number(active.overlay)-.16)>.001)throw new Error('Overlay mismatch '+JSON.stringify({hover,active}));
  results.push({brand,normal,hover,active});await page.mouse.move(799,399);
 }
 await fs.writeFile(`${out}/button-results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results));
}finally{await browser.close()}
