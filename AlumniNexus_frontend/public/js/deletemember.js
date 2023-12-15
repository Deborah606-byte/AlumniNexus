const openDeleteForm = document.getElementsByClassName(
  "open-admin-delete-form"
);
const deleteModal = document.getElementsByClassName("admin-delete-modal");

// Function to open the delete member modal
function openDeleteModal(id) {
  Array.from(deleteModal).forEach((modal) => {
    const modalId = modal.getAttribute("id");
    if (id == modalId) {
      modal.classList.remove("hidden");
      const closeDeleteForm =
        modal.getElementsByClassName("close-delete-form")[0];
      closeDeleteForm.addEventListener("click", () => {
        closeDeleteModal(id);
      });
    }
  });
}

// Function to close the delete member modal
function closeDeleteModal(id) {
  Array.from(deleteModal).forEach((modal) => {
    const modalId = modal.getAttribute("id");
    if (id == modalId) {
      modal.classList.add("hidden");
    }
  });
}

Array.from(openDeleteForm).forEach((adminDeleteForm) => {
  adminDeleteForm.addEventListener("click", (event) => {
    const id = event.target.id;
    openDeleteModal(id);
  });
});
