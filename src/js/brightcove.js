var callbacks = [];
var player;

var src="//cdn.jwplayer.com/players/${id}-mRGp7S2O.js";
var script = document.createElement("script");
script.src = src;
script.onload = function() {
  player = videojs("player");
  player.ready(function() {
    callbacks.forEach(fn => fn(player));
  });
};
document.head.appendChild(script);

module.exports = function(fn) {
  if (player) {
    return fn(player);
  }
  callbacks.push(fn);
};