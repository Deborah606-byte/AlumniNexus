const openUpdateEventButtons = document.querySelectorAll(".edit-event-form");
const updateModal = document.querySelectorAll(".update-event-modal");

// Function to open the member modal
function openUpdateModal(id) {
  updateModal.forEach((update) => {
    if (update.getAttribute("id") === id) {
      update.classList.remove("hidden");

      const closeUpdateForm = update.querySelector(".close-update");
      closeUpdateForm.addEventListener("click", () => {
        closeUpdateModal(id);
      });
    }
  });
}

// Function to close the member modal
function closeUpdateModal(id) {
  updateModal.forEach((update) => {
    if (update.getAttribute("id") === id) {
      update.classList.add("hidden");
    }
  });
}

openUpdateEventButtons.forEach((updateForm) => {
  updateForm.addEventListener("click", (event) => {
    const id = event.target.getAttribute("id");
    openUpdateModal(id);
  });
});
