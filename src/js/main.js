require("./lib/social");
require("./lib/ads");
var track = require("./lib/tracking");

require("./gallery");
var ready = require("./brightcove");
var dot = require("./lib/dot");
var playlistTemplate = dot.compile(require("./_playlist.html"));
var videoContainer = document.querySelector(".video-container");
var playlistContainer = document.querySelector(".playlist-container");

var ids = {
  4594952965001: "Foraging with <b>Jeremy Faber</b>",
  4558264932001: "<b>Rachel Yang’s</b> non-fusion fusion",
  4567072591001: "<b>Blaine Wetzel’s</b> island pantry",
  4556052811001: "<b>Maria Hines</b> mills grain",
  4537656765001: "On the farm with <b>Tom Douglas</b>",
  4518683229001: "<b>Renee Erickson</b> goes crabbing",
  4605380252001: "<b>Matt Dillon</b> pigs out"
};

var playlistID = 4539370305001;

var log = console.log.bind(console);

var closest = function(element, className) {
  while (element && !element.classList.contains(className)) element = element.parentElement;
  return element;
};

ready(function(player) {
  window.player = player;

  player.catalog.getPlaylist(playlistID, function(err, playlist) {
    playlist.forEach(p => p.caption = ids[p.id]);
    playlistContainer.innerHTML = playlistTemplate(playlist);
    player.catalog.load(playlist);

    var lookup = {};
    playlist.forEach((v, i) => lookup[v.id] = v);

    playlistContainer.addEventListener("click", function(e) {
      if (playlistContainer.getAttribute("data-enabled") == "false") return;
      var li = closest(e.target, "playlist-item");
      var id = li.getAttribute("data-id");
      var index = player.playlist.indexOf(lookup[id]);
      window.location = "#player";
      player.playlist.currentItem(index);
      player.play();
    });

    var update = function(e) {
      if (e.type == "play") videoContainer.classList.remove("pending");
      var active = document.querySelector("li.playlist-item.active");
      if (active) active.classList.remove("active");
      var playingAd = player.ads.state == "ad-playback";
      playlistContainer.setAttribute("data-enabled", !playingAd);
      if (playingAd) return;
      playlistContainer.classList.add("enabled");
      if (player.paused()) return;
      var id = player.mediainfo.id;
      var li = document.querySelector(`li[data-id="${id}"]`);
      if (li) {
        li.classList.add("active");
      }
    };

    "play playing blocked adstart adend loadstart loadedmetadata loadeddata".split(" ").forEach(e => player.on(e, update));

  });
});
