// Imports
import {
  redColorShades,
  blueColorShades,
  greenColorShades,
  yellowColorShades,
  orangeColorShades,
  blackColorShades,
  purpleColorShades,
} from "./colorsData.js";
import {
  getElement,
  copyText,
  hideText,
  displayColors,
  displayOtherColorCode,
} from "./utils.js";

// Elements
let scrollHeight = 0;
let firstTimeDownArrow = true;
const redContainer = getElement(".red-container");
const blueContainer = getElement(".blue-container");
const greenContainer = getElement(".green-container");
const yellowContainer = getElement(".yellow-container");
const orangeContainer = getElement(".orange-container");
const blackContainer = getElement(".black-container");
const purpleContainer = getElement(".purple-container");
const allColorsContainer = document.querySelectorAll(".main-color-center");
const arrowContainer = getElement(".arrow-container");
const navContainer = getElement(".nav-container");
const navBarBars = getElement(".nav-bars-icon");
const navLinks = getElement(".nav-links");
const colorContainerTarget = document.querySelectorAll(".color-container");

// Functions
const displayRedColors = function () {
  redColorShades.forEach((eachColor) => {
    displayColors(eachColor, redContainer);
  });
};

const displayBlueColors = function () {
  blueColorShades.forEach((eachColor) => {
    displayColors(eachColor, blueContainer);
  });
};

const displayGreenColors = function () {
  greenColorShades.forEach((eachColor) => {
    displayColors(eachColor, greenContainer);
  });
};

const displayYellowColors = function () {
  yellowColorShades.forEach((eachColor) => {
    displayColors(eachColor, yellowContainer);
  });
};

const displayOrangeColors = function () {
  orangeColorShades.forEach((eachColor) => {
    displayColors(eachColor, orangeContainer);
  });
};

const displayBlackColors = function () {
  blackColorShades.forEach((eachColor) => {
    displayColors(eachColor, blackContainer);
  });
};

const displayPurpleColors = function () {
  purpleColorShades.forEach((eachColor) => {
    displayColors(eachColor, purpleContainer);
  });
};

const init = function () {
  displayRedColors();
  displayBlueColors();
  displayGreenColors();
  displayYellowColors();
  displayOrangeColors();
  displayBlackColors();
  displayPurpleColors();
};
init();

const handleIntersectionMethod = function (entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("color-container-animation-show");
      observer.unobserve(entry.target);
    } else {
      entry.target.classList.remove("color-container-animation-show");
    }
  });
};

//
// Observer
//
const observer = new IntersectionObserver(handleIntersectionMethod);
document.querySelectorAll(".color-container").forEach((eachTarget) => {
  observer.observe(eachTarget);
});

// Event Listners
allColorsContainer.forEach((eachColorContainer) => {
  eachColorContainer.addEventListener("mousedown", function (event) {
    let comingClass = event.target.classList.value;
    let newText;
    let comingTarget = event.target;

    // conditions
    if (comingClass.includes("color-container")) {
      comingTarget.children[1].classList.add("color-copied-show");
      newText = comingTarget.children[0].textContent;
      hideText(comingTarget.children[1]);

      //   hide the copied text on screen
    } else if (comingClass.includes("color-code")) {
      comingTarget.parentElement.children[1].classList.add("color-copied-show");
      newText = comingTarget.textContent;

      //   hide the copied text on screen
      hideText(comingTarget.parentElement.children[1]);
    } else if (comingClass.includes("color-copied")) {
      newText = comingTarget.parentElement.children[0].textContent;
    }

    // copying color code to clipboard
    copyText(newText);

    // displaying other codes
    if (comingClass.includes("color-code"))
      displayOtherColorCode(comingTarget.textContent, comingTarget);
  });
});

// While scrolling navbar color changing
window.addEventListener("scroll", function (e) {
  scrollHeight = window.scrollY;
  arrowContainer.style.opacity = scrollHeight > 1000 ? 1 : 0;
  if (scrollHeight >= 200) {
    navContainer.classList.add("nav-container-change");
    getElement(".nav-logo").style.color = "black";
  } else {
    navContainer.classList.remove("nav-container-change");
    getElement(".nav-logo").style.color = "white";
  }
  scrollHeight <= 350 && firstTimeDownArrow
    ? (getElement(".bottom-arrow-container").style.display = "block")
    : (getElement(".bottom-arrow-container").style.display = "none");
});

// down arrow disappear once we click on it. again it will come once we reload
getElement(".bottom-arrow-container").addEventListener("click", function () {
  firstTimeDownArrow = false;
});

// on click bars icon nav links showing
navBarBars.addEventListener("click", function () {
  navLinks.classList.toggle("nav-links-show");
  navLinks.style.backgroundColor = "white";
  if (navLinks.classList.contains("nav-links-show")) {
    navBarBars.children[0].src = "./icons/cross.svg";
    navLinks.style.height =
      document.querySelectorAll(".link").length *
        document.querySelector(".link").getBoundingClientRect().height +
      "px";
  } else {
    navLinks.style.height = 0;
    navBarBars.children[0].src = "./icons/bars.svg";
  }

  // when navbar is transparent & if we click on show links, navbar color will change
  if (
    scrollHeight < 200 &&
    !navContainer.classList.contains("nav-container-change")
  ) {
    navContainer.classList.add("nav-container-change");
    document.querySelector(".nav-logo").style.color = "black";
  }
});

// on click nav link, nav links will close
navLinks.addEventListener("click", function (e) {
  if (e.target.classList.contains("link")) {
    navLinks.style.height = 0;
    navLinks.classList.remove("nav-links-show");
    navBarBars.children[0].src = "./icons/bars.svg";
  }
});
