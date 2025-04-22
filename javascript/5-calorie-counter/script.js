// Get DOM elements
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

// Removes +, -, and spaces from input strings
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

// Detects scientific notation (e.g., 1e6) which is considered invalid
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

// Adds a new entry field (name and calorie input) to the selected category
function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

  const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input
      type="number"
      min="0"
      id="${entryDropdown.value}-${entryNumber}-calories"
      placeholder="Calories"
    />`;

  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

// Handles form submission, calculates calories and displays result
function calculateCalories(e) {
  e.preventDefault(); // Prevents form from reloading the page
  isError = false;

  // Get all number inputs from each section
  const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']");
  const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']");
  const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']");
  const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']");
  const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);

  // Stop calculation if any invalid input was found
  if (isError) {
    return;
  }

  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';

  // Show results in the output section
  output.innerHTML = `
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove('hide');
}

// Parses calories from input elements, validates input
function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }

    calories += Number(currVal);
  }

  return calories;
}

// Clears all inputs and hides the output
function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  for (const container of inputContainers) {
    container.innerHTML = ''; // Remove all dynamically added inputs
  }

  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
}

// Attach event listeners
addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);
