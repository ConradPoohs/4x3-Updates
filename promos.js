/* 4×3 promo pool — the ONE place to add/edit ads.
 * index.html renders these (banner = mobile strip, side = desktop sidebar) and
 * dash.html uses id+name for the ad-stats labels, so a new ad here shows up on
 * the dashboard automatically.
 *
 * Fields: id     short slug, [a-z0-9_-], max 16 chars (it's what the stats store)
 *         name   label shown on the dashboard
 *         bc/sc  extra class for the banner / sidebar container ("" = default look)
 *         socal  true = only shown to Southern California visitors
 *         banner/side  the HTML itself
 */
window.X43_ADS=[
  {id:"aha",name:"Ask Hank Anything (Maya)",bc:"promo-banner-maya",sc:"promo-side-maya",
   banner:`<img class="promo-maya" src="maya.png" alt="Maya Higa"> Maya Higa is our most recent guest on <b><a href="https://www.youtube.com/watch?v=39KyWSyGfjY" target="_blank" rel="noopener">Ask Hank Anything!</a></b> We talk quite a lot about fish farts, which are surprisingly complex!`,
   side:`<img class="promo-maya-side" src="maya.png" alt="Maya Higa"><div class="promo-kicker">From Hank</div><p class="promo-body">Maya Higa is our most recent guest on <b><a href="https://www.youtube.com/watch?v=39KyWSyGfjY" target="_blank" rel="noopener">Ask Hank Anything!</a></b> We talk quite a lot about fish farts, which are surprisingly complex!</p>`},
  {id:"ff",name:"Focus Friend",bc:"",sc:"",
   banner:`<img class="promo-bean" src="hankbeantrans.png" alt=""> Need a cozy tool to help you take back control from social media apps? My app <b>Focus Friend</b> is zero cost and ad-free!! <a href="https://apps.apple.com/us/app/focus-friend-by-hank-green/id6742278016" target="_blank" rel="noopener">iPhone</a> · <a href="https://play.google.com/store/apps/details?id=com.underthing.focus.friend" target="_blank" rel="noopener">Android</a>`,
   side:`<img class="promo-img" src="focusfriendtrans.png" alt="Focus Friend"><div class="promo-kicker">From Hank</div><p class="promo-body">Need a cozy tool to help you take back control from social media apps? My app <b>Focus Friend</b> is zero cost and ad-free!!</p><div class="promo-apps"><a href="https://apps.apple.com/us/app/focus-friend-by-hank-green/id6742278016" target="_blank" rel="noopener">iPhone</a><a href="https://play.google.com/store/apps/details?id=com.underthing.focus.friend" target="_blank" rel="noopener">Android</a></div>`},
  {id:"drawfee",name:"Drawfee (alien animals)",bc:"promo-banner-plain",sc:"",
   banner:`I was on <b><a href="https://www.youtube.com/watch?v=MXTa8JoSmHs" target="_blank" rel="noopener">Drawfee</a></b>, one of the most delightful YouTube shows of all time! I described animals from other planets&hellip; and they drew them!!`,
   side:`<div class="promo-kicker">From Hank</div><p class="promo-body">I was on <b><a href="https://www.youtube.com/watch?v=MXTa8JoSmHs" target="_blank" rel="noopener">Drawfee</a></b>, one of the most delightful YouTube shows of all time! I described animals from other planets&hellip; and they drew them!!</p>`},
  {id:"humans",name:"Humans with Hank",bc:"promo-banner-plain",sc:"",
   banner:`I got a text from a friend this week calling the episode of “Humans” with Helen Hunt “Truly some of your best work” so… maybe you want to <a href="https://www.humanswithhank.com/" target="_blank" rel="noopener">check that out</a>.`,
   side:`<div class="promo-kicker">From Hank</div><p class="promo-body">I got a text from a friend this week calling the episode of “Humans” with Helen Hunt “Truly some of your best work” so… maybe you want to <a href="https://www.humanswithhank.com/" target="_blank" rel="noopener">check that out</a>.</p>`},
  {id:"swk",name:"Something Worth Knowing",bc:"promo-banner-swk",sc:"promo-side-swk",socal:true,
   banner:`<img class="promo-poster" src="SWK2.png" alt="Something Worth Knowing"> It seems that you are in SoCal. FYI, Complexly is putting on a weird and special event featuring me, <b>Simone Giertz</b>, <b>Mark Rober</b>, and more! September 16 - <a href="https://complexly.org/somethingworthknowing/" target="_blank" rel="noopener">Something Worth Knowing</a>.`,
   side:`<img class="promo-swk-side" src="SWK2.png" alt="Something Worth Knowing"><div class="promo-kicker">Southern California</div><p class="promo-body">It seems that you are in SoCal. FYI, Complexly is putting on a weird and special event featuring me, <b>Simone Giertz</b>, <b>Mark Rober</b>, and more! September 16 - <a href="https://complexly.org/somethingworthknowing/" target="_blank" rel="noopener">Something Worth Knowing</a>.</p>`}
];
