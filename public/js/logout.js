const openLogoutButton = document.getElementById("logout-form");
const logoutModal = document.getElementById("logout-modal");
const closeLogoutButton = document.getElementById("close-logout-form");

// Function to open the logout modal
function openLogoutModal(logout) {
  logout.preventDefault();
  logoutModal.classList.remove("hidden");
}

// Function to close the logout modal
function closeLogoutModal() {
  logoutModal.classList.add("hidden");
}

// Function to cancel the logout form
function cancelLogout() {
  closeLogoutModal();
}

openLogoutButton.addEventListener("click", openLogoutModal);
closeLogoutButton.addEventListener("click", closeLogoutModal);

const logoutForm = document.querySelector("form");
logoutForm.addEventListener("submit", function (logout) {
  console.log("Button clicked");
});
