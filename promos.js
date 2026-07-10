/* 4×3 promo pool — the ONE place to add/edit ads.
 * index.html renders these (banner = mobile strip, side = desktop sidebar) and
 * dash.html uses id+name for the ad-stats labels, so a new ad here shows up on
 * the dashboard automatically.
 *
 * Fields: id     short slug, [a-z0-9_-], max 16 chars (it's what the stats store)
 *         name   label shown on the dashboard
 *         bc/sc  extra class for the banner / sidebar container ("" = default look)
 *         socal  true = only shown to Southern California visitors
 *         minPlays  only shown to players with MORE than this many finished games
 *         banner/side  the HTML itself
 */
window.X43_ADS=[
  /* not a rotating banner: the post-game slide-in card above the community
     stats (index.html renders it itself). Listed here so the ads dashboard
     knows its name; noRotate keeps it out of the banner pool. */
  {id:"humanspod",name:"Humans (post-game card)",noRotate:true,banner:"",side:""},
  {id:"ff",name:"Focus Friend",bc:"",sc:"",
   banner:`<img class="promo-bean" src="hankbeantrans.png" alt=""> Need a cozy tool to help you take back control from social media apps? My app <b>Focus Friend</b> is zero cost and ad-free!! <a href="https://apps.apple.com/us/app/focus-friend-by-hank-green/id6742278016" target="_blank" rel="noopener">iPhone</a> · <a href="https://play.google.com/store/apps/details?id=com.underthing.focus.friend" target="_blank" rel="noopener">Android</a>`,
   side:`<img class="promo-img" src="focusfriendtrans.png" alt="Focus Friend"><div class="promo-kicker">From Hank</div><p class="promo-body">Need a cozy tool to help you take back control from social media apps? My app <b>Focus Friend</b> is zero cost and ad-free!!</p><div class="promo-apps"><a href="https://apps.apple.com/us/app/focus-friend-by-hank-green/id6742278016" target="_blank" rel="noopener">iPhone</a><a href="https://play.google.com/store/apps/details?id=com.underthing.focus.friend" target="_blank" rel="noopener">Android</a></div>`},
  {id:"smush",name:"SMUSH",bc:"promo-banner-smush",sc:"",
   banner:`<img class="promo-smush" src="https://www.hankgreen.com/smush/smushlogotrans.png" alt="SMUSH"> From John, we have a new word game! Nine letters, make words, get points. It's very simple (until it's not&hellip;) It's called <b><a href="https://hankgreen.com/smush" target="_blank" rel="noopener">SMUSH</a></b>!`,
   side:`<img class="promo-img" src="https://www.hankgreen.com/smush/smushlogotrans.png" alt="SMUSH"><div class="promo-kicker">From John</div><p class="promo-body">We have a new word game! Nine letters, make words, get points. It's very simple (until it's not&hellip;) It's called <b><a href="https://hankgreen.com/smush" target="_blank" rel="noopener">SMUSH</a></b>!</p>`},
  {id:"humans",name:"Humans with Hank",bc:"promo-banner-plain",sc:"",
   banner:`I got a text from a friend this week calling the episode of “Humans” with Helen Hunt “Truly some of your best work” so… maybe you want to <a href="https://www.humanswithhank.com/" target="_blank" rel="noopener">check that out</a>.`,
   side:`<div class="promo-kicker">From Hank</div><p class="promo-body">I got a text from a friend this week calling the episode of “Humans” with Helen Hunt “Truly some of your best work” so… maybe you want to <a href="https://www.humanswithhank.com/" target="_blank" rel="noopener">check that out</a>.</p>`},
  {id:"swk",name:"Something Worth Knowing",bc:"promo-banner-swk",sc:"promo-side-swk",socal:true,
   banner:`<img class="promo-poster" src="SWK2.png" alt="Something Worth Knowing"> It seems that you are in SoCal. FYI, Complexly is putting on a weird and special event featuring me, <b>Simone Giertz</b>, <b>Mark Rober</b>, and more! September 16 - <a href="https://complexly.org/somethingworthknowing/" target="_blank" rel="noopener">Something Worth Knowing</a>.`,
   side:`<img class="promo-swk-side" src="SWK2.png" alt="Something Worth Knowing"><div class="promo-kicker">Southern California</div><p class="promo-body">It seems that you are in SoCal. FYI, Complexly is putting on a weird and special event featuring me, <b>Simone Giertz</b>, <b>Mark Rober</b>, and more! September 16 - <a href="https://complexly.org/somethingworthknowing/" target="_blank" rel="noopener">Something Worth Knowing</a>.</p>`}
];
