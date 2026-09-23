import { chromium } from '/Users/miguelarias/DEV/REINA MADRE/ds-grm-documentation/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const repo='/Users/miguelarias/DEV/REINA MADRE/ds-grm-documentation';
const out='/Users/miguelarias/Documents/ChatGPT/Reina Madre DS/artifacts/release-1.1/browser';
const index=await (await fetch('http://localhost:6006/index.json')).json();
const stories=Object.values(index.entries).filter(e=>e.type==='story'&&e.title.startsWith('Components/')&&(!process.argv[2]||e.id.includes(process.argv[2])));
const browser=await chromium.launch({headless:true});const results=[];
try{
 for(const brand of ['grm-global','reina-madre','maria-linda','piel-sana']){
  const p=await browser.newPage({viewport:{width:1200,height:900}});p.setDefaultTimeout(10000);
  for(const story of stories){
   try{
    await p.goto(`http://localhost:6006/iframe.html?id=${story.id}&viewMode=story&globals=brandTheme:${brand}`);
    await p.locator('#storybook-root > *').first().waitFor({state:'attached'});
    await p.waitForFunction(()=>window.__STORYBOOK_PREVIEW__?.storyRenders?.some(r=>r.phase === "finished"));
    await p.evaluate(()=>document.fonts.ready);
    // Allow story interactions and entrance transitions to reach the final visible state.
    await p.waitForTimeout(600);
    await p.evaluate(async()=>{ await Promise.allSettled(document.getAnimations().filter(a=>Number.isFinite(a.effect?.getComputedTiming().endTime)).map(a=>a.finished)); });
    await p.addScriptTag({path:`${repo}/node_modules/axe-core/axe.min.js`});
    const audit=await p.evaluate(async()=>{
      const a=await window.axe.run(document.body,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});
      return {brand:document.documentElement.dataset.theme,violations:a.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({html:n.html,target:n.target,summary:n.failureSummary}))})),incomplete:a.incomplete.map(v=>({id:v.id,count:v.nodes.length})),font:getComputedStyle(document.querySelector('#storybook-root')).fontFamily};
    });
    await p.screenshot({path:`${out}/${brand}-${story.id}.png`});
    results.push({id:story.id,...audit});
    console.log(brand,story.id,audit.violations.length?'FAIL '+audit.violations.map(x=>x.id).join(','):'PASS');
   }catch(e){results.push({id:story.id,brand,error:String(e)});console.log('ERROR',brand,story.id,String(e));}
   await fs.writeFile(`${out}/${process.argv[2] || "all-brands"}-a11y.json`,JSON.stringify(results,null,2));
  }
  await p.close();
 }
}finally{await browser.close()}
