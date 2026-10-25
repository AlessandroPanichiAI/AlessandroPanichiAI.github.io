/* Picks the entrance video that matches the screen. The ring of the play is 112 px (168 px on a computer) and each video is recorded at exactly the number of
   device pixels it will be shown at, so the browser never has to shrink it (shrinking a 3x video made the thin circle jagged on ordinary screens).
   R = the ring in device pixels; the files are named after it.
   Format: where the browser can play VP9 with full colour detail (Chrome, Edge, Firefox, Android) the WebM is used: the thin gold line keeps its colour.
   iPhones, iPads and Safari use the MP4 (their colour detail is halved, as in any H.264 video). */
(function(){
  var v = document.getElementById("plVid"); if(!v) return;
  var desk = !!(window.matchMedia && matchMedia("(min-width:821px) and (pointer:fine)").matches);
  var R = 112*(desk ? 1.5 : 1)*(window.devicePixelRatio || 1);
  var T = [168, 210, 224, 252, 336], best = T[0], bd = 1e9;
  for(var i = 0; i < T.length; i++){ var d = Math.abs(Math.log(T[i]/R)); if(d < bd - 1e-9 || (Math.abs(d - bd) < 1e-9 && T[i] > best)){ bd = d; best = T[i]; } }
  var ua = navigator.userAgent || "", ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  var cp = v.canPlayType ? function(t){ return v.canPlayType(t); } : function(){ return ""; };
  var full = !ios && /Chrome|Chromium|Edg\/|Firefox|OPR\/|SamsungBrowser/.test(ua) && cp('video/webm; codecs="vp09.01.10.08"');
  var mp4 = cp('video/mp4; codecs="avc1.640029"');
  /* the biggest size has two versions: the ring is a hair larger inside its border on a computer, so a computer at 2x has its own file ("d") */
  v.src = "media/play_intro_" + best + ((desk && best === 336) ? "d" : "") + ((full || !mp4) ? ".webm" : ".mp4");
})();
