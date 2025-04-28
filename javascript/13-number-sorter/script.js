// Get reference to the sort button in the DOM
const sortButton = document.getElementById("sort");

// Function triggered on button click to sort values from dropdowns
const sortInputArray = (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Extract numerical values from dropdown inputs, gets into an array
  const inputValues = [
    ...document.getElementsByClassName("values-dropdown")
  ].map((dropdown) => Number(dropdown.value));

  // Sort values in ascending order using built-in sort
  const sortedValues = inputValues.sort((a, b) => {
    return a - b; // If a < b, it stays before b; if a > b, it swaps
  });

  // Update the UI with the sorted values
  updateUI(sortedValues);
}

// Update displayed values in the UI with sorted array
const updateUI = (array = []) => {
  // Num is the actual number in the sorted array, i gets the index of each number from the array
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  });
}

// BUBBLE SORT: Repeatedly steps through the array, compares adjacent elements,
// and swaps them if they are in the wrong order.
const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      // Swap if current item is greater than the next one
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array; // Return sorted array
}

// SELECTION SORT: Repeatedly finds the minimum element from the unsorted part
// and puts it at the beginning.
const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;

    // Find the smallest value in the remaining unsorted part
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the found minimum element with the first unsorted element
    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }

  return array; // Return sorted array
}

// INSERTION SORT: Builds the sorted array one item at a time by
// comparing each new element to the already-sorted ones and inserting it at the correct position.
const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i];
    let j = i - 1;

    // Shift elements of the sorted part that are greater than currValue to the right
    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j];
      j--;
    }

    // Place current value at its correct position
    array[j + 1] = currValue;
  }
  return array; // Return sorted array
}

// Attach event listener to the button to trigger sorting
sortButton.addEventListener("click", sortInputArray);
