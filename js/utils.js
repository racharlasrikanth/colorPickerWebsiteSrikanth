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
        <div style="color: ${colorObj.colorCode}" class="color-code" title="Click to Copy!">${colorObj.colorCode}</div>
        <div class="color-copied">copied!</div>
    </div>
  `;
  element.insertAdjacentHTML("beforeend", html);
};

export { getElement, copyText, hideText, displayColors };
