var links = document.querySelectorAll(".gallery-item");

var overlay = document.querySelector(".gallery-overlay");
var image = overlay.querySelector("img");
var caption = overlay.querySelector(".caption");

var onClick = function(e) {
  if (e) e.preventDefault();
  var url = this.href;
  var text = this.getAttribute("title");
  image.src = url;
  image.onload = function() {
    overlay.classList.add("fade-content");
  }
  caption.innerHTML = text;
  overlay.classList.add("show");
  overlay.offsetWidth;
  overlay.classList.add("fade");
}

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", onClick);
}

overlay.addEventListener("click", function() {
  //reset fades
  overlay.className = "gallery-overlay";
});

var buttons = overlay.querySelectorAll("button");

var increment = function(back) {
  //find current
  var src = image.src.split("/").pop();
  var thumb = document.querySelector(`.gallery-item[href*="${src}"]`);
  var go;
  if (back) {
    go = thumb.previousElementSibling;
  } else {
    go = thumb.nextElementSibling;
  }
  if (!go) {
    var items = document.querySelectorAll("a.gallery-item");
    go = back ? items[items.length - 1] : items[0];
  }
  overlay.classList.remove("fade-content");
  // var reflow = overlay.offsetWidth;
  onClick.call(go);
}

var onButton = function(e) {
  e.preventDefault();
  e.stopPropagation();
  increment(this.classList.contains("previous"));
}

for (var i = 0; i < buttons.length; i++) buttons[i].addEventListener("click", onButton);

window.addEventListener("keydown", function(e) {
  if (!overlay.classList.contains("show")) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  switch (e.keyCode) {
    //leave
    case 27: //esc
      overlay.className = "gallery-overlay";
    break;

    case 13: //enter
    case 39: //right
    case 40: //down
    case 32: //space
      increment();
    break;

    case 37: //up
    case 38: //left
      increment(true);
    break;
  }
});