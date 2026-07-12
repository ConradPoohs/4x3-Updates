"use strict";
/* Shared by index.html (the game) and the scoring / archive / build pages.
   One source of truth for the puzzle encoding, palette, dates, and point values. */

/* ---------- accessibility settings (shared across all pages) ---------- */
let A11Y={}; try{ A11Y=JSON.parse(localStorage.getItem("x43_a11y"))||{}; }catch(e){}
function reduceMotion(){ return !!A11Y.rm; }   /* checked at animation time in index.html */

/* ---------- dark mode ----------
   A11Y.dk: 1 = force dark, 0 = force light, undefined = follow the OS.
   We express the user's choice with html classes "dark"/"light" (which drive
   the :root var override in shared.css) and ALSO resolve the *effective* theme
   into a single "thm-dark" class so component rules need only one selector. */
function darkMQ(){ return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)"); }
function effectiveDark(){
  if(A11Y.dk!==undefined) return !!A11Y.dk;         /* explicit choice wins */
  const mq=darkMQ(); return !!(mq&&mq.matches);      /* else follow the system */
}
/* keep the <meta name="theme-color"> (index only) in step with the theme */
function applyThemeColor(){
  const m=document.querySelector('meta[name="theme-color"]'); if(!m) return;
  m.setAttribute("content", effectiveDark()?"#121212":"#faf7f1");
}
/* set html classes for the current A11Y.dk value + the resolved thm-dark flag */
function applyTheme(){
  const c=document.documentElement.classList;
  c.toggle("dark",  A11Y.dk===1);
  c.toggle("light", A11Y.dk===0);
  c.toggle("thm-dark", effectiveDark());
  applyThemeColor();
}

/* apply the html classes as early as possible (documentElement exists in <head>) */
(function(){ const c=document.documentElement.classList;
  c.toggle("a11y-rm",!!A11Y.rm); c.toggle("a11y-hc",!!A11Y.hc); c.toggle("a11y-bt",!!A11Y.bt);
  c.toggle("a11y-lc",!!A11Y.lc); c.toggle("a11y-oc",!!A11Y.oc); c.toggle("a11y-st",!!A11Y.st);
  applyTheme();
  /* when following the system, re-resolve if the OS theme flips mid-session */
  const mq=darkMQ();
  if(mq){ const onCh=()=>{ if(A11Y.dk===undefined) applyTheme(); };
    if(mq.addEventListener) mq.addEventListener("change",onCh); else if(mq.addListener) mq.addListener(onCh); }
})();

/* category palette: 0 blue, 1 green, 2 yellow, 3 purple. "Labeled colors" mode keeps
   these and just adds the colour's name to each solved tile (no recolouring). */
const COLORS=["#5b8def","#56b870","#e7b416","#a06ee1"];
const TINTS=["#e8effc","#e6f4ea","#fcf3d7","#f1e8fa"];
const MIDC=["#b1c9f7","#b3dcc0","#f3da8e","#d2b9f0"];
const COLOR_NAMES=["blue","green","yellow","purple"];

/* scoring point values — change them here and every page follows */
const MISS=15, MISS_LATE=30;
const HUB_BONUS=20, HUB_MID_BONUS=20;
const PURPLE_BONUS=15, RAINBOW_BONUS=30, SPEED_BONUS=30, BLUE_BONUS=5;
const CLICK_BONUS=5;                  /* solved at the theoretical minimum number of clicks */
const MIN_CLICKS=12;                  /* 4 guesses × 3 tile taps, zero wasted motion */
const MEGA_CLICKS=50;                 /* ...and the opposite (no points, just concern) */
const RULE_BREAKER_SCORE=-100;
const STREAK_MILESTONES=[5,10,25,50,100];  /* streak days that earn a special card */
/* solve-order achievements (category indices: 0 blue, 1 green, 2 yellow, 3 purple) */
const REV_RAINBOW=[3,0,1,2];          /* purple → blue → green → yellow (+30) */
const RAINBOW=[2,1,0,3];              /* yellow → green → blue → purple (the forward rainbow card) */
const GRELLOW=[3,0,2,1];              /* purple → blue → yellow → green (no points, just bragging) */
const GRUE=[3,1,0,2];                 /* purple → green → blue → yellow (no points, just bragging) */

/* ---------- scoring explainer ----------
   One source of truth for "how the points work": the in-game ? popover uses it
   without the bragging section; scoring.html (legacy deep links) shows it all. */
function scoringHTML(brag){
  const row=(l,v,cls)=>"<div class='srow'><span>"+l+"</span><span class='v "+(cls||"")+"'>"+v+"</span></div>";
  const note=(l,d)=>"<div class='srow'><span>"+l+"</span><span class='sd'>"+d+"</span></div>";
  return "<div class='hint'>Every win starts at 100 points. Lose points for mistakes, gain them for flair, then add your streak. A flawless run tops out at a clean 200 (plus your streak).</div>"+
    "<div class='scoresec'><b>Mistakes</b>"+
      row("Each mistake","−"+MISS,"bad")+
      row("A slip with only two groups left","−"+MISS_LATE,"bad")+
    "</div>"+
    "<div class='scoresec'><b>Bonuses</b>"+
      row("Hub First — lead every guess with the shared word","+"+HUB_BONUS,"good")+
      row("Hub Middle — place the shared word second every guess","+"+HUB_MID_BONUS,"good")+
      row("Blue First — solve the blue group first","+"+BLUE_BONUS,"good")+
      row("Purple First — solve the purple group first","+"+PURPLE_BONUS,"good")+
      row("Reverse Rainbow — purple → blue → green → yellow","+"+RAINBOW_BONUS,"good")+
      row("Sub-90s — finish in under 90 seconds","+"+SPEED_BONUS,"good")+
      row("Efficient — solve in the "+MIN_CLICKS+"-click minimum (no wasted taps)","+"+CLICK_BONUS,"good")+
      row("Daily streak — for each day of your current streak","+1 / day","good")+
    "</div>"+
    (brag?("<div class='scoresec'><b>Just for bragging (no points)</b>"+
      note("🌈 Rainbow","Solve yellow → green → blue → purple")+
      note("🎾 Grellow","Solve purple → blue → yellow → green")+
      note("🦚 Grue","Solve purple → green → blue → yellow")+
      note("😤 God Damnit!","A perfect run (no mistakes + Hub First) ruined only by a green↔yellow or green↔blue swap")+
      note("🌙 The Day Before","Play the day's puzzle between midnight and 1 am")+
      note("🖲️ Click Happy","Win after "+MEGA_CLICKS+"+ clicks. Why?")+
      note("✦ Streak milestones","A special banner — here and on your share card — the day your streak hits "+STREAK_MILESTONES.join(", ")+": silver at 5 and 10, gold from 25 up")+
      note("🥞 Smusher","Try SMUSH (our other word game), then finish a 4×3")+
      note("🎙️ Human","Check out the Humans podcast, then finish a 4×3")+
      note("🔨 Button Smasher","When the game's over, the hub can take 20 more hits. See what happens")+
    "</div>"):"")+
    "<div class='scoresec'><b>Top honors</b>"+
      note("Perfect Game","0 mistakes + Hub First + Reverse Rainbow → a clean 200 (before your streak)")+
      note("🥇 Gold plaque","A perfect game in under 90 seconds")+
      note("🥈 Silver plaque","A perfect game in under 120 seconds")+
    "</div>"+
    "<div class='scoresec'><b>Rule breaker</b>"+
      row("RULE BREAKER — put the shared word LAST in every guess",RULE_BREAKER_SCORE,"bad")+
      note("","Wipes every point you earned — score and streak bonus included — and leaves you at "+RULE_BREAKER_SCORE+". The shared word is meant to lead, not trail.")+
    "</div>";
}

/* ---------- puzzle encoding ---------- */
function b64e(s){return btoa(unescape(encodeURIComponent(s))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");}
function b64d(s){s=s.replace(/-/g,"+").replace(/_/g,"/");while(s.length%4)s+="=";return decodeURIComponent(escape(atob(s)));}
function encPuzzle(p){return b64e(JSON.stringify(p));}
/* full structural validation — used for every decoded payload (shared links,
   scheduled puzzles, builder previews) so a malformed link can never crash the
   game mid-init. Requires 4 proper category tuples and 9 unique words. */
function validPuzzle(p){
  if(!p||typeof p!=="object") return false;
  if(typeof p.s!=="string"||!norm(p.s)||p.s.length>40) return false;
  if(!Array.isArray(p.c)||p.c.length!==4) return false;
  const words=[norm(p.s)];
  for(const c of p.c){
    if(!Array.isArray(c)||c.length<3) return false;
    if(typeof c[0]!=="string"||!c[0].trim()||c[0].length>60) return false;
    for(const w of [c[1],c[2]]){
      if(typeof w!=="string"||!norm(w)||w.length>40) return false;
      words.push(norm(w));
    }
  }
  if(new Set(words).size!==9) return false;
  for(const k of ["a","e","x"]) if(p[k]!==undefined&&(typeof p[k]!=="string"||p[k].length>200)) return false;
  return true;
}
function decPuzzle(str){
  const p=JSON.parse(b64d(str));
  if(!validPuzzle(p)) throw new Error("bad");
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

/* ---------- accessibility menu (top-right ♿, on every page) ---------- */
function buildA11yMenu(){
  if(document.getElementById("a11yBtn")) return;
  const btn=document.createElement("button");
  btn.id="a11yBtn"; btn.type="button"; btn.textContent="Settings";
  /* accessible name = visible "Settings" (so voice control matches); described as a popup */
  btn.setAttribute("aria-haspopup","true"); btn.setAttribute("aria-expanded","false");
  const menu=document.createElement("div");
  menu.id="a11yMenu"; menu.hidden=true; menu.setAttribute("role","group"); menu.setAttribute("aria-label","Accessibility options");
  const opt=(k,label)=>"<label class='a11y-opt'><input type='checkbox' data-k='"+k+"'"+(A11Y[k]?" checked":"")+"><span>"+label+"</span></label>";
  /* Dark mode is special: its initial state follows the OS when unset, so it
     can't use opt()'s "A11Y[k] is truthy" rule. Build it explicitly, first. */
  const dkChecked=(A11Y.dk!==undefined)?!!A11Y.dk:!!(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);
  const dkOpt="<label class='a11y-opt'><input type='checkbox' data-k='dk'"+(dkChecked?" checked":"")+"><span>Dark mode</span></label>";
  menu.innerHTML=dkOpt+opt("rm","Reduced motion")+opt("hc","High contrast")+opt("lc","Labeled colors")+opt("oc","One card color")+opt("bt","Bigger text")+opt("st","Show timer");
  const host=document.querySelector(".wrap")||document.body;   /* inside the column so it mirrors the streak */
  host.appendChild(btn); host.appendChild(menu);
  function setOpen(o){
    menu.hidden=!o; btn.setAttribute("aria-expanded",String(o));
    if(o){ const first=menu.querySelector("input"); if(first) first.focus(); }   /* move focus into the menu */
    else if(menu.contains(document.activeElement)) btn.focus();                  /* and back to the button on close */
  }
  btn.addEventListener("click",e=>{ e.stopPropagation(); setOpen(menu.hidden); });
  menu.addEventListener("click",e=>e.stopPropagation());
  /* checkboxes natively toggle on Space; make Enter work too */
  menu.addEventListener("keydown",e=>{
    if(e.key!=="Enter") return;
    const i=e.target; if(i&&i.type==="checkbox"){ e.preventDefault(); i.checked=!i.checked; i.dispatchEvent(new Event("change",{bubbles:true})); }
  });
  menu.addEventListener("change",e=>{
    const k=e.target.dataset&&e.target.dataset.k; if(!k) return;
    A11Y[k]=e.target.checked?1:0;
    try{ localStorage.setItem("x43_a11y",JSON.stringify(A11Y)); }catch(_){}
    if(k==="dk"){ applyTheme(); return; }            /* dark mode drives its own html classes */
    document.documentElement.classList.toggle("a11y-"+k,!!A11Y[k]);   /* all modes apply live via the class */
  });
  document.addEventListener("click",()=>setOpen(false));
  document.addEventListener("keydown",e=>{ if(e.key==="Escape") setOpen(false); });
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",buildA11yMenu); else buildA11yMenu();
