const profileDropdown = document.querySelector(".profile-dropdown");
const profileImage = document.querySelector(".group");

profileImage.addEventListener("mouseenter", () => {
  profileDropdown.classList.remove("hidden");
});

profileImage.addEventListener("mouseleave", () => {
  profileDropdown.classList.add("hidden");
});

const dropdownToggle = document.getElementById("dropdown-toggle");
const dropdownMenu = document.getElementById("dropdown-menu");

dropdownToggle.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
});
