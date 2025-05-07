// Calculates the mean (average) of an array of numbers
const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

// Calculates the median (middle value) of a sorted array
const getMedian = (array) => {
  // Creates a sorted copy of the array in ascending order
  const sorted = array.toSorted((a, b) => a - b);

  // If even number of elements, average the two middle values
  // If odd, return the middle value
  const median =
    sorted.length % 2 === 0
      ? getMean([sorted[sorted.length / 2], sorted[sorted.length / 2 - 1]])
      : sorted[Math.floor(sorted.length / 2)];
  return median;
}

// Calculates the mode (most frequent number(s)) of an array
const getMode = (array) => {
  const counts = {};

  // Count the frequency of each number
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  });

  // If all numbers occur the same number of times, return null (no mode)
  if (new Set(Object.values(counts)).size === 1) {
    return null;
  }

  // Find the number(s) with the highest frequency
  const highest = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a]
  )[0];
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  );

  // Return the mode(s) as a comma-separated string
  return mode.join(", ");
}

// Calculates the range (difference between max and min) of the array
const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
}

// Calculates the variance (average of squared differences from the mean)
const getVariance = (array) => {
  const mean = getMean(array);

  // Sum of squared differences from the mean
  const variance = array.reduce((acc, el) => {
    const difference = el - mean;
    const squared = difference ** 2;
    // Add them, then the mean
    return acc + squared;
  }, 0) / array.length;

  return variance;
}

// Calculates the standard deviation (square root of the variance)
const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
}

// Main function to extract numbers from input, calculate stats, and display them
const calculate = () => {
  // Get the input string and split it into an array by commas
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);

  // Convert strings to numbers and filter out non-numeric values
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
  
  // Calculate statistical measures
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);

  // Update the UI with the results
  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
}
