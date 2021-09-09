// Imports
import {
  redColorShades,
  blueColorShades,
  greenColorShades,
} from "./colorsData.js";

// Elements
const redContainer = document.querySelector(".red-container");
const blueContainer = document.querySelector(".blue-container");
const greenContainer = document.querySelector(".green-container");
const allColorsContainer = document.querySelectorAll(".main-color-center");

// Functions
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

const displayRedColors = function () {
  redColorShades.forEach((eachColor) => {
    let html = `
            <div style="background-color: ${eachColor.colorCode}" class="color-container">
                <div class="color-code" title="Click to Copy!">${eachColor.colorCode}</div>
                <div class="color-copied">copied!</div>
            </div>
        `;

    redContainer.insertAdjacentHTML("beforeend", html);
  });
};

const displayBlueColors = function () {
  blueColorShades.forEach((eachColor) => {
    let html = `
        <div style="background-color: ${eachColor.colorCode}" class="color-container">
            <div class="color-code" title="Click to Copy!">${eachColor.colorCode}</div>
            <div class="color-copied">copied!</div>
        </div>
    `;
    blueContainer.insertAdjacentHTML("beforeend", html);
  });
};

const displayGreenColors = function () {
  greenColorShades.forEach((eachColor) => {
    let html = `
        <div style="background-color: ${eachColor.colorCode};" class="color-container">
            <div class="color-code" title="Click to Copy!">${eachColor.colorCode}</div>
            <div class="color-copied">copied!</div>
        </div>
    `;
    greenContainer.insertAdjacentHTML("beforeend", html);
  });
};

const init = function () {
  displayRedColors();
  displayBlueColors();
  displayGreenColors();
};
init();

// Event Listners
allColorsContainer.forEach((eachColorContainer) => {
  eachColorContainer.addEventListener("mousedown", function (event) {
    let comingClass = event.target.classList.value;
    let newText;
    let comingTarget = event.target;

    // conditions
    if (comingClass === "color-container") {
      comingTarget.children[1].classList.add("color-copied-show");
      newText = comingTarget.children[0].textContent;
      hideText(comingTarget.children[1]);

      //   hide the copied text on screen
    } else if (comingClass === "color-code") {
      comingTarget.parentElement.children[1].classList.add("color-copied-show");
      newText = comingTarget.textContent;

      //   hide the copied text on screen
      hideText(comingTarget.parentElement.children[1]);
    } else if (comingClass === "color-copied") {
      newText = comingTarget.parentElement.children[0].textContent;
    }

    // copying color code to clipboard
    copyText(newText);
  });
});
