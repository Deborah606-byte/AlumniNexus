const openDeleteEventButtons = document.querySelectorAll(".delete-event-form");
const deleteModals = document.querySelectorAll(".delete-event-modal");

// Function to open the delete event modal
function openDeleteEventModal(id) {
  deleteModals.forEach((alumni) => {
    if (alumni.getAttribute("id") === id) {
      alumni.classList.remove("hidden");

      const closeDeleteForm = alumni.querySelector(".close-delete");
      closeDeleteForm.addEventListener("click", () => {
        closeDeleteEventModal(id);
      });
    }
  });
}

// Function to close the delete event modal
function closeDeleteEventModal(id) {
  deleteModals.forEach((alumni) => {
    if (alumni.getAttribute("id") === id) {
      alumni.classList.add("hidden");
    }
  });
}

openDeleteEventButtons.forEach((deleteForm) => {
  deleteForm.addEventListener("click", (event) => {
    const id = event.target.getAttribute("id");
    openDeleteEventModal(id);
  });
});
