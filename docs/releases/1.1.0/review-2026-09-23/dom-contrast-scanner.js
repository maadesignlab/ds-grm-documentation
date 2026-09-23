() => {
 const parse=s=>{
 const a=s.match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)?.map(Number);if(!a||a.length<3)return null;
 if(s.startsWith('oklab')){const L=a[0],A=a[1],B=a[2],l=(L+.3963377774*A+.2158037573*B)**3,m=(L-.1055613458*A-.0638541728*B)**3,z=(L-.0894841775*A-1.291485548*B)**3;const linear=[4.0767416621*l-3.3077115913*m+.2309699292*z,-1.2684380046*l+2.6097574011*m-.3413193965*z,-.0041960863*l-.7034186147*m+1.707614701*z];return [...linear.map(c=>255*Math.max(0,Math.min(1,c<=.0031308?12.92*c:1.055*Math.max(0,c)**(1/2.4)-.055))),a[3]??1];}
 if(s.startsWith('color(srgb '))return [a[0]*255,a[1]*255,a[2]*255,a[3]??1];
 return s.startsWith('rgb')?[a[0],a[1],a[2],a[3]??1]:null;};
 const over=(a,b)=>a.slice(0,3).map((x,i)=>x*a[3]+b[i]*(1-a[3]));
 const lum=c=>c.reduce((s,x,i)=>s+[.2126,.7152,.0722][i]*(x/255<=.04045?x/255/12.92:((x/255+.055)/1.055)**2.4),0);
 const ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
 const root=document.querySelector('#storybook-root');
 if(!root?.children.length)return {ready:false};
 const rows=[],manual=[],seen=new Set();
 for(const e of document.querySelectorAll('body *')){
  const textNodes=Array.from(e.childNodes).filter(n=>n.nodeType===3);if(!textNodes.length)continue;const t={textContent:textNodes.map(n=>n.textContent).join(' ')};if(!t.textContent.trim()||!e||e.closest('script,style,[hidden],[aria-hidden="true"],[disabled],[aria-disabled="true"]'))continue;
  if(e.closest('#storybook-root')===null&&!e.closest('[role="dialog"],[role="menu"],[role="tooltip"],[data-slot]'))continue;
  const r=e.getBoundingClientRect(),s=getComputedStyle(e);if(!r.width||!r.height||s.visibility==='hidden'||s.display==='none')continue;
  let chain=[],skip=false;for(let n=e;n;n=n.parentElement){const c=getComputedStyle(n);if(c.display==='none'||c.visibility==='hidden'||Number(c.opacity)===0){skip=true;break;}chain.push({bg:c.backgroundColor,image:c.backgroundImage,opacity:Number(c.opacity)});}
  if(skip)continue;
  const text=t.textContent.trim(),key=text+'|'+s.color+'|'+chain.map(c=>c.bg).join(';');if(seen.has(key))continue;seen.add(key);
  const record={text:text.slice(0,120),tag:e.tagName,slot:e.closest('[data-slot]')?.getAttribute('data-slot'),className:e.className,fontSize:s.fontSize,fontWeight:s.fontWeight,color:s.color};
  if(chain.some(c=>c.image!=='none'||c.opacity<1)){manual.push({...record,reason:'gradient/image/opacity',backgrounds:chain});continue;}
  let bg=[255,255,255];for(const c of chain.reverse()){const color=parse(c.bg);if(color)bg=over(color,bg);}
  const fg=parse(s.color);if(!fg)continue;
  const threshold=Number(s.fontSize.replace('px',''))>=24||(Number(s.fontSize.replace('px',''))>=18.6667&&Number(s.fontWeight)>=700)?3:4.5;
  rows.push({...record,background:bg,ratio:ratio(over(fg,bg),bg),threshold});
 }
 return {ready:true,brand:document.documentElement.dataset.theme,rows,manual};
}