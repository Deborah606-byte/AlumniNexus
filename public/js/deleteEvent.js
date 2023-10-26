const deleteEventButton = document.querySelectorAll(".deleteEventbutton");
const deleteEventModal = document.getElementById("delete-event-modal");
const closeDeleteEventButton = document.getElementById("close-delete");

// Function to open the delete event modal
function openDeleteEventModal(event) {
  event.preventDefault(); // Prevent the default link behavior
  deleteEventModal.classList.remove("hidden");
}

// Function to close the delete event modal
function closeDeleteEventModal() {
  deleteEventModal.classList.add("hidden");
}

// Add click event listeners for all delete event buttons
deleteEventButton.forEach((button) => {
  button.addEventListener("click", openDeleteEventModal);
});

// Add click event listener for the close button
closeDeleteEventButton.addEventListener("click", closeDeleteEventModal);
