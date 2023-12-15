const openEditFormButtons = document.querySelectorAll(".open-admin-edit-form");
const editModals = document.querySelectorAll(".admin-edit-modal");

// Function to open the member modal
function openEditModal(id) {
  editModals.forEach((modal) => {
    if (modal.getAttribute("id") === id) {
      modal.classList.remove("hidden");

      const closeEditForm = modal.querySelector(".close-edit-form");
      closeEditForm.addEventListener("click", () => {
        closeEditModal(id);
      });
    }
  });
}

// Function to close the member modal
function closeEditModal(id) {
  editModals.forEach((modal) => {
    if (modal.getAttribute("id") === id) {
      modal.classList.add("hidden");
    }
  });
}

openEditFormButtons.forEach((adminEditForm) => {
  adminEditForm.addEventListener("click", (event) => {
    const id = event.target.getAttribute("id");
    openEditModal(id);
  });
});
