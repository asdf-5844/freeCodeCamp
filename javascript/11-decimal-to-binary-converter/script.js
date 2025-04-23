// Grab DOM elements for input, button, result display, and animation
const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

// Data to simulate recursive stack steps visually for input 5
const animationData = [
  {
    inputVal: 5,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    addElDelay: 2000,
    msg: "decimalToBinary(1) returns '1' (base case) and gives that value to the stack below. Then it pops off the stack.",
    showMsgDelay: 5000,
    removeElDelay: 10000,
  }
];

// Recursive function to convert decimal to binary
const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input); // Base case
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2); // Recursive case
  }
};

// Show step-by-step call stack animation for input 5
const showAnimation = () => {
  result.innerText = "Call Stack Animation";

  animationData.forEach((obj) => {
    // Add function call step
    setTimeout(() => {
      animationContainer.innerHTML += `
        <p id="${obj.inputVal}" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);

    // Replace with explanation
    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    // Remove the element from stack
    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });

  // Final result display after animation
  setTimeout(() => {
    result.textContent = decimalToBinary(5);
  }, 20000);
};

// Handle input validation and logic branching
const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  // Validate input
  if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
    alert("Please provide a decimal number greater than or equal to 0");
    return;
  }

  // If input is 5, show animation
  if (inputInt === 5) {
    showAnimation();
    return;
  }

  // Otherwise, just show result
  result.textContent = decimalToBinary(inputInt);
  numberInput.value = "";
};

// Convert on button click
convertBtn.addEventListener("click", checkUserInput);

// Also convert on Enter key press
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
