// Get all delete event links
const deleteEventLinks = document.querySelectorAll(".delete-event-form");

// Get the delete event modal
const deleteEventModal = document.querySelector(".delete-event-modal");

// Get the close button for the delete event modal
const closeModalButton = deleteEventModal.querySelector(".close-delete");

// Function to open the delete event modal
function openDeleteModal() {
  deleteEventModal.classList.remove("hidden");
}

// Function to close the delete event modal
function closeDeleteModal() {
  deleteEventModal.classList.add("hidden");
}

// Add click event listeners to all delete event links
deleteEventLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Prevent the default action
    event.preventDefault();

    // Open the delete event modal
    openDeleteModal();
  });
});

// Add click event listener to the close modal button
closeModalButton.addEventListener("click", closeDeleteModal);
