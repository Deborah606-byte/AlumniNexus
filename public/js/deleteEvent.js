const deleteButtons = document.querySelectorAll(".delete-event-form");
const deleteModals = document.querySelectorAll(".delete-event-modal");

// Function to open the delete event modal
function openDeleteModal(id) {
  deleteModals.forEach((modal) => {
    if (modal.getAttribute("id") === id) {
      modal.classList.remove("hidden");

      const closeDeleteForm = modal.querySelector(".close-delete");
      closeDeleteForm.addEventListener("click", () => {
        closeDeleteModal(id);
      });
    }
  });
}

// Function to close the delete event modal
function closeDeleteModal(id) {
  deleteModals.forEach((modal) => {
    if (modal.getAttribute("id") === id) {
      modal.classList.add("hidden");
    }
  });
}

// Add a click event listener to each delete button
deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", (event) => {
    const id = event.target.getAttribute("id");
    openDeleteModal(id);
  });
});
