import { getElement } from "./utils.js";

const comingColor = getElement(".inputcolor");
const button = getElement(".btnSub");

let color;
let red;
let green;
let blue;

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function generate() {
  var r = red;
  var g = green;
  var b = blue;
  var str = "";
  let count = 0;
  for (var i = 23; i >= 0; i -= 1) {
    r = ((i + 0.5) * red) / 24;
    g = ((i + 0.5) * green) / 24;
    b = ((i + 0.5) * blue) / 24;
    count++;
    // str += "rgb(" + r + "," + g + "," + b + ")";
    str +=
      "<div class='swatch' style='background-color:rgb(" +
      r +
      "," +
      g +
      "," +
      b +
      ")'>" +
      count +
      "</div>";
  }
  document.querySelector("#op").innerHTML = str;
  console.log(str);
}

button.addEventListener("click", function () {
  color = comingColor.value;
  console.log(color);

  red = hexToRgb(color).r;
  green = hexToRgb(color).g;
  blue = hexToRgb(color).b;
  generate();
});
