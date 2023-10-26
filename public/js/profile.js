const profileDropdown = document.querySelector(".profile-dropdown");
const profileImage = document.querySelector(".group");

profileImage.addEventListener("mouseenter", () => {
  profileDropdown.classList.remove("hidden");
});

profileImage.addEventListener("mouseleave", () => {
  profileDropdown.classList.add("hidden");
});

const dropdownToggle = document.getElementsByClassName("dropdown-toggle");

// dropdownToggle.addEventListener("click", () => {
//
// });
Array.from(dropdownToggle).forEach((dropdown) => {
  dropdown.addEventListener("click", () => {
    const dropdownMenu = dropdown.nextElementSibling;
    dropdownMenu.classList.toggle("hidden");
  });
});

// console.log(dropdownToggle);
