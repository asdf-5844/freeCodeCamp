// Grabbing references to all the necessary DOM elements
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// Load saved tasks from localStorage or start with an empty array
const taskData = JSON.parse(localStorage.getItem("data")) || [];

// Keeps track of the task being edited
let currentTask = {};

// Utility function: Removes special characters from strings
const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s]/g, '');
}

// Handles both adding a new task and updating an existing one
const addOrUpdateTask = () => {
  // Validation: Ensure title is not empty
  if (!titleInput.value.trim()) {
    alert("Please provide a title");
    return;
  }

  // Find index of current task in array, if editing
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

  // Create the task object
  const taskObj = {
    id: `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`, // unique ID
    title: removeSpecialChars(titleInput.value),
    date: dateInput.value,
    description: removeSpecialChars(descriptionInput.value),
  };

  // Decide if we're adding or updating
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj); // add new task to the beginning
  } else {
    taskData[dataArrIndex] = taskObj; // update existing task
  }

  // Save updated tasks to localStorage
  localStorage.setItem("data", JSON.stringify(taskData));

  // Refresh task list and reset form
  updateTaskContainer();
  reset();
};

// Builds the task UI list from taskData array
const updateTaskContainer = () => {
  tasksContainer.innerHTML = ""; // Clear current list

  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
      <div class="task" id="${id}">
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button onclick="editTask(this)" type="button" class="btn">Edit</button>
        <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
      </div>
    `;
  });
};

// Deletes a task
const deleteTask = (buttonEl) => {
  // Find task to delete
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  // Remove task from UI
  buttonEl.parentElement.remove();

  // Remove task from array
  taskData.splice(dataArrIndex, 1);

  // Save updated data
  localStorage.setItem("data", JSON.stringify(taskData));
};

// Load a task into the form for editing
const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex]; // store reference to current task

  // Populate form with existing values
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  // Change button text to indicate we're updating
  addOrUpdateTaskBtn.innerText = "Update Task";

  // Show the form
  taskForm.classList.toggle("hidden");
};

// Reset the form to default state
const reset = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden"); // hide form
  currentTask = {}; // clear the reference to any edited task
};

// If there's data saved, load it on page load
if (taskData.length) {
  updateTaskContainer();
}

// Show the form when Add Task button is clicked
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

// Try to close form, but ask user to confirm if they made changes
closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;

  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal(); // open modal
  } else {
    reset(); // just close
  }
});

// Cancel close dialog
cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

// Discard changes and reset form
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});

// Submit form (add/update task)
taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload
  addOrUpdateTask();
});
