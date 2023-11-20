const openMemberButton = document.getElementById("open-admin-member-form");
const memberModal = document.getElementById("admin-member-modal");
const closeMemberButton = document.getElementById("close-admin-form");
console.log(openMemberButton);
console.log(memberModal);
// Function to open the member modal
function openMemberModal() {
  console.log(memberModal);
  memberModal.classList.remove("hidden");
}

// Function to close the member modal
function closeMemberModal() {
  console.log(memberModal);
  memberModal.classList.add("hidden");
}

openMemberButton.addEventListener("click", openMemberModal);
closeMemberButton.addEventListener("click", closeMemberModal);

const adminform = document.getElementById("member-form");
// adminform.addEventListener("submit", function (event) {
//   // event.preventDefault();
// });
