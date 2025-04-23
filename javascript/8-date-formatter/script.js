// Get references to the DOM elements where the current date will be displayed
// and where the user selects the desired date format.
const currentDateParagraph = document.getElementById("current-date");
const dateOptionsSelectElement = document.getElementById("date-options");

// Create a new Date object to get the current date and time.
const date = new Date();

// Extract day, month (add 1 since getMonth() returns 0-indexed), year, hours, and minutes.
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();

// Format the date as day-month-year for initial display.
const formattedDate = `${day}-${month}-${year}`;

// Display the formatted date in the paragraph element.
currentDateParagraph.textContent = formattedDate;

// Add an event listener to the select element to handle changes in the selected date format.
dateOptionsSelectElement.addEventListener("change", () => {
  
  // Use a switch statement to update the displayed date based on the selected format.
  switch (dateOptionsSelectElement.value) {
    // Format: year-month-day
    case "yyyy-mm-dd":
      currentDateParagraph.textContent = formattedDate
        .split("-")         // Split the date string into an array.
        .reverse()          // Reverse the array to get [year, month, day].
        .join("-");         // Join it back into a string with hyphens.
      break;

    // Format: month-day-year hours Minutes
    case "mm-dd-yyyy-h-mm":
      currentDateParagraph.textContent = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;
      break;

    // Default format: day-month-year
    default:
      currentDateParagraph.textContent = formattedDate;
  }
});
