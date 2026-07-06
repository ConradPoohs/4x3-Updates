/* 4×3 stats beacon — anonymous, fire-and-forget telemetry to the CF Worker.
 * No PII: a random per-browser id, the puzzle date, and the result numbers.
 * Set EP to your deployed Worker URL. Failures are swallowed so the game never
 * depends on it. */
(function () {
  "use strict";
  var EP = "https://fourbythree-stats.hankmt.workers.dev";

  function anon() {
    try {
      var k = localStorage.getItem("x43_anon");
      if (!k) {
        k = (window.crypto && crypto.randomUUID)
          ? crypto.randomUUID()
          : (Date.now().toString(36) + Math.random().toString(36).slice(2));
        localStorage.setItem("x43_anon", k);
      }
      return k;
    } catch (e) { return ""; }
  }
  function dev() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? "mobile" : "desktop";
  }
  function src() {
    try {
      var r = document.referrer || "";
      if (/t\.co|twitter\.com|x\.com/i.test(r)) return "twitter";
      if (/youtube\.com|youtu\.be/i.test(r)) return "youtube";
      if (!r) return "direct";
      return "other";
    } catch (e) { return "other"; }
  }
  function send(path, body) {
    try {
      var s = JSON.stringify(body);
      if (navigator.sendBeacon) { navigator.sendBeacon(EP + path, s); return; }
      fetch(EP + path, { method: "POST", body: s, keepalive: true, mode: "no-cors" });
    } catch (e) {}
  }

  /* Call once when a puzzle is finished.
   * ev = {p, rel, w, m, s, ms, st, ad, c, so}
   *   c  = [m0,m1,m2,m3] mistakes attributed per color (blue,green,yellow,purple)
   *   so = solve order as a digit string of color indices, e.g. "3102"        */
  window.x43beacon = function (ev) {
    var id = anon(); if (!id || !ev || !ev.p) return;
    var c = Array.isArray(ev.c) ? ev.c.slice(0, 4).map(function (n) { return n | 0; }) : [0, 0, 0, 0];
    send("/e", {
      v: 2, id: id, p: ev.p,
      rel: ev.rel ? 1 : 0, w: ev.w ? 1 : 0,
      m: ev.m | 0, s: ev.s | 0, ms: ev.ms | 0, st: ev.st | 0,
      ad: ev.ad ? 1 : 0,
      adid: String(ev.adid || "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 16),
      c: c, so: String(ev.so || "").replace(/[^0-3]/g, "").slice(0, 4),
      src: src(), dev: dev()
    });
  };

  /* Call when the player taps share for a given puzzle date. */
  window.x43share = function (p) {
    var id = anon(); if (!id || !p) return;
    send("/s", { id: id, p: p });
  };

  /* Public per-puzzle community stats (aggregate only; server caches ~5 min).
   * Resolves to the parsed JSON, or rejects — caller decides how to fail soft. */
  window.x43stats = function (p) {
    return fetch(EP + "/p?p=" + encodeURIComponent(p)).then(function (r) { return r.json(); });
  };

  /* Beta-puzzle result / feedback. Fired automatically on finish (fb:0, solve
   * fields only) and again when the tester taps "Send feedback" (fb:1, adds
   * stars / spotted-hub / notes / name). ev = {bp, hub, name, w, m, ms, so,
   * diff, fun, sp, notes, fb} — bp is the short hash of the #b= payload. */
  window.x43beta = function (ev) {
    var id = anon(); if (!id || !ev || !ev.bp) return;
    send("/fb", {
      v: 1, id: id, bp: String(ev.bp),
      hub: String(ev.hub || "").slice(0, 24),
      name: String(ev.name || "").slice(0, 40),
      w: ev.w ? 1 : 0, m: ev.m | 0, ms: ev.ms | 0,
      so: String(ev.so || "").replace(/[^0-3]/g, "").slice(0, 4),
      diff: ev.diff | 0, fun: ev.fun | 0,
      sp: String(ev.sp || "").toLowerCase(),
      notes: String(ev.notes || "").slice(0, 2000),
      fb: ev.fb ? 1 : 0,
      dev: dev()
    });
  };
})();
