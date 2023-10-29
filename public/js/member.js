const openMemberButton = document.getElementById("open-member-form");
const memberModal = document.getElementById("member-modal");
const closeMemberButton = document.getElementById("close-form");

// Function to open the member modal
function openMemberModal(event) {
  event.preventDefault(); // Prevent the default link behavior
  memberModal.classList.remove("hidden");
}

// Function to close the member modal
function closeMemberModal() {
  memberModal.classList.add("hidden");
}

openMemberButton.addEventListener("click", openMemberModal);
closeMemberButton.addEventListener("click", closeMemberModal);

const form = document.getElementById("member-form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  // Perform form submission or validation here
  console.log("Button clicked");
});
