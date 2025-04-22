// Array holding the colors
const darkColorsArr = [
  "#2C3E50",
  "#34495E",
  "#2C2C2C",
  "#616A6B",
  "#4A235A",
  "#2F4F4F",
  "#0E4B5A",
  "#36454F",
  "#2C3E50",
  "#800020",
];

// Gets a random index for the array
function getRandomIndex() {
  const randomIndex = Math.floor(darkColorsArr.length * Math.random());
  return randomIndex;
}

// Getting elements from DOM
const body = document.querySelector("body");
const bgHexCodeSpanElement = document.querySelector("#bg-hex-code");


function changeBackgroundColor() {
  // Gets random color from array
  const color = darkColorsArr[getRandomIndex()];
  // Changes the text to the name of the color
  bgHexCodeSpanElement.innerText = color;
  // Changes the background color
  body.style.backgroundColor = color;
}

const btn = document.querySelector("#btn");
// Adds this functionality to the button
btn.onclick = changeBackgroundColor;
