var links = document.querySelectorAll(".gallery-item");

var overlay = document.querySelector(".gallery-overlay");
var image = overlay.querySelector("img");
var caption = overlay.querySelector(".caption");

var onClick = function(e) {
  e.preventDefault();
  var url = this.href;
  var text = this.getAttribute("title");
  image.src = url;
  caption.innerHTML = text;
  overlay.classList.add("show");
  overlay.offsetWidth;
  overlay.classList.add("fade");
}

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", onClick);
}

overlay.addEventListener("click", function() {
  overlay.classList.remove("show");
  overlay.classList.remove("fade");
});