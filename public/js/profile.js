const profileDropdown = document.querySelector(".profile-dropdown");
const profileImage = document.querySelector(".group");

profileImage.addEventListener("mouseenter", () => {
  profileDropdown.classList.remove("hidden");
});

profileImage.addEventListener("mouseleave", () => {
  profileDropdown.classList.add("hidden");
});

const dropdownToggle = document.getElementsByClassName("dropdown-toggle");

Array.from(dropdownToggle).forEach((dropdown) => {
  dropdown.addEventListener("click", () => {
    const dropdownMenu = dropdown.nextElementSibling;
    dropdownMenu.classList.toggle("hidden");
  });
});

console.log("button clicked");

const openProfileButton = document.getElementById("update-profile-form");
const profileModal = document.getElementById("profile-modal");
const closeProfileButton = document.getElementById("close-profile-form");

// Function to open the profile modal
function openProfileModal(profile) {
  profile.preventDefault();
  profileModal.classList.remove("hidden");
}

// Function to close the event modal
function closeProfileModal() {
  profileModal.classList.add("hidden");
}

// Function to cancel the profile update
function cancelUpdateProfile() {
  closeProfileModal();
}

openProfileButton.addEventListener("click", openProfileModal);
closeProfileButton.addEventListener("click", closeProfileModal);

const updateProfileForm = document.querySelector("form");
updateProfileForm.addEventListener("submit", function (profile) {
  console.log("Button clicked");
});
