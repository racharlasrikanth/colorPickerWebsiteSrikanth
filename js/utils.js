import {
  hexToRGBconverter,
  rgbToHslConverter,
  hslToHexConverter,
} from "./colorConverter.js";

// element selection
const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

// copy data function
const copyText = function (text) {
  let element = document.createElement("input");
  element.value = text;
  element.select();
  navigator.clipboard.writeText(element.value);
};

// hide text after 1second
const hideText = function (element) {
  setTimeout(() => {
    element.classList.remove("color-copied-show");
  }, 1000);
};

// display colors on the screen
const displayColors = function (colorObj, element) {
  let html = `
    <div style="background-color: ${colorObj.colorCode}" class="color-container">
        <div class="color-code" title="Click to Convert Color Code!">${colorObj.colorCode}</div>
        <div class="color-copied">copied!</div>
    </div>
  `;
  element.insertAdjacentHTML("beforeend", html);
};

// display rgb values/ hex values based on color
const displayOtherColorCode = function (colorCode, comingTarget) {
  if (colorCode.replace("#", "").length === 6) {
    // converting hex to rgb

    let rgbValue = hexToRGBconverter(colorCode);
    comingTarget.textContent = rgbValue;
    comingTarget.parentElement.style.backgroundColor = rgbValue;
    comingTarget.style.textTransform = "lowercase";
    //
  } else if (colorCode.includes("rgb")) {
    // converting rgb to hsl

    let hslValue = rgbToHslConverter(
      ...colorCode.replace("rgb(", "").replace(")", "").split(",")
    );
    comingTarget.textContent = hslValue;
    comingTarget.parentElement.style.backgroundColor = hslValue;
    comingTarget.style.textTransform = "lowercase";

    //
  } else if (colorCode.includes("hsl")) {
    // converting hsl to hex

    let hexValue = hslToHexConverter(
      ...colorCode
        .replaceAll("%", "")
        .replace("hsl(", "")
        .replace(")", "")
        .replaceAll(", ", ",")
        .split(",")
    );
    comingTarget.textContent = hexValue;
    comingTarget.parentElement.style.backgroundColor = hexValue;
    comingTarget.style.textTransform = "uppercase";
  }
};

export { getElement, copyText, hideText, displayColors, displayOtherColorCode };
