// Add JavaScript to handle dropdown toggle
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const dropdownMenu = document.getElementById("programsEventsDropdown");

    menuButton.addEventListener("click", function () {
      dropdownMenu.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside of it
    document.addEventListener("click", function (event) {
      if (
        !menuButton.contains(event.target) &&
        !dropdownMenu.contains(event.target)
      ) {
        dropdownMenu.classList.add("hidden");
      }
    });
  });