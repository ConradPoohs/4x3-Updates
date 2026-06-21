"use strict";
/* Shared by index.html (the game) and the scoring / archive / build pages.
   One source of truth for the puzzle encoding, palette, dates, and point values. */

/* category palette: 0 blue, 1 green, 2 yellow, 3 purple */
const COLORS=["#5b8def","#56b870","#e7b416","#a06ee1"];
const TINTS=["#e8effc","#e6f4ea","#fcf3d7","#f1e8fa"];

/* scoring point values — change them here and every page follows */
const MISS=15, MISS_LATE=30;
const HUB_BONUS=20, HUB_MID_BONUS=20;
const PURPLE_BONUS=15, RAINBOW_BONUS=30, SPEED_BONUS=30;
const RULE_BREAKER_SCORE=-100;
const REV_RAINBOW=[3,0,1,2];

/* ---------- puzzle encoding ---------- */
function b64e(s){return btoa(unescape(encodeURIComponent(s))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");}
function b64d(s){s=s.replace(/-/g,"+").replace(/_/g,"/");while(s.length%4)s+="=";return decodeURIComponent(escape(atob(s)));}
function encPuzzle(p){return b64e(JSON.stringify(p));}
function decPuzzle(str){
  const p=JSON.parse(b64d(str));
  if(!p||!p.s||!Array.isArray(p.c)||p.c.length!==4) throw new Error("bad");
  return p;
}

/* ---------- dates ---------- */
function todayStr(){
  const d=new Date();
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function fmtDate(k){
  return new Date(k+"T12:00:00").toLocaleDateString(undefined,{month:"long",day:"numeric",year:"numeric"});
}

/* ---------- small helpers ---------- */
function norm(w){return String(w).trim().toUpperCase();}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));}

/* puzzles.json lives next to these pages — resolve it against the page's own
   folder so it loads whether the URL is /fourbythree, /fourbythree/, or
   /fourbythree/index.html (a bare "puzzles.json" would otherwise hit the root) */
function pjURL(file){
  let dir=location.pathname;
  if(!/\/$/.test(dir)){
    if(/\.[^/]+$/.test(dir)) dir=dir.replace(/[^/]*$/,""); /* strip a filename like index.html */
    else dir+="/";                                          /* extensionless path = the directory */
  }
  return dir+(file||"puzzles.json")+"?ts="+Date.now();
}

/* ---------- clipboard ---------- */
function copyText(text,btn){
  const done=()=>{ if(btn){const o=btn.textContent; btn.textContent="Copied!"; setTimeout(()=>btn.textContent=o,1400);} };
  if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(text).then(done).catch(()=>fallbackCopy(text,done)); }
  else fallbackCopy(text,done);
}
function fallbackCopy(text,done){
  const ta=document.createElement("textarea"); ta.value=text; document.body.appendChild(ta);
  ta.select(); try{document.execCommand("copy");}catch(e){} document.body.removeChild(ta); done();
}
