const openEditForm = document.getElementsByClassName("open-admin-edit-form");
const editModal = document.getElementsByClassName("admin-edit-modal");

// Function to open the member modal
function openeditModal(id) {
  Array.from(editModal).forEach((modal) => {
    const modalId = modal.getAttribute("id");
    if (id == modalId) {
      modal.classList.remove("hidden");
      const closeEditForm = modal.getElementsByClassName("close-edit-form")[0];
      closeEditForm.addEventListener("click", () => {
        closeeditModal(id);
      });
    }
  });
}

// Function to close the member modal
function closeeditModal(id) {
  Array.from(editModal).forEach((modal) => {
    const modalId = modal.getAttribute("id");
    if (id == modalId) {
      modal.classList.add("hidden");
    }
  });
}

const editForm = document.getElementById("member-form");
editForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

Array.from(openEditForm).forEach((admineditform) => {
  console.log(admineditform);
  admineditform.addEventListener("click", (event) => {
    console.log(event);
    const id = event.target.id;
    openeditModal(id);
  });
});
