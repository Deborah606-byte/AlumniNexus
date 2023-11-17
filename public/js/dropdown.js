const dropdownTrigger = document.getElementById("dropdown-trigger");
const dropdownMenu = document.getElementById("dropdown-menu");

// Toggle the dropdown menu when the trigger is clicked
dropdownTrigger.addEventListener("click", function () {
  dropdownMenu.classList.toggle("hidden");
});

// Close the dropdown when clicking outside of it
document.addEventListener("click", (e) => {
  if (!dropdownTrigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.add("hidden");
  }
});
