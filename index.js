const stripeContainer = document.getElementById("color-stripe-container");
const hexValueContainer = document.getElementById("hex-value-container");
const colorPicker = document.getElementById("color-picker");
let hexValue = colorPicker.value.slice(1);
const colorSchemeSelection = document.getElementById("color-scheme-selection");
const snackbar = document.getElementById("snackbar");
const generateColorSchemeBtn = document
  .getElementById("generate-color-scheme-btn")
  .addEventListener("click", fetchData);

let value = "";

function fetchData() {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${colorSchemeSelection.value}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      generateStripesAndHexValues(data.colors);
      value = data.colors;
    });
}

function generateStripesAndHexValues(colors) {
  stripeContainer.innerHTML = "";
  hexValueContainer.innerHTML = "";

  if (colors) stripeContainer.classList.remove("empty-color-stripe-container");

  for (let i = 0; i < 5; i++) {
    colors
      ? (stripeContainer.innerHTML += `
    <div class="color-stripe" style="background-color:${colors[i].hex.value}"></div> 
  `)
      : "";

    hexValueContainer.innerHTML += colors
      ? `
      <button onclick="copyHexValue(${i})" class="hex-value">${colors[
          i
        ].hex.clean.slice(0, 3)}<br class="hex-break"/>${colors[
          i
        ].hex.clean.slice(3)}</button>
    `
      : `<button class="hex-value"></button>`;
  }
}

function copyHexValue(num) {
  if (value) {
    const hexValues = value[num].hex.value;
    navigator.clipboard.writeText(hexValues);
    if (!snackbar.classList.contains("show")) {
      showSnackbar();
    }
  }
}

colorPicker.addEventListener("input", function (event) {
  hexValue = event.target.value.slice(1);
});

function showSnackbar() {
  snackbar.className = "show";
  setTimeout(() => (snackbar.className = ""), 2900);
}

generateStripesAndHexValues();
