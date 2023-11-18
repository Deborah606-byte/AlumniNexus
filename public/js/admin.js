// JavaScript functions to handle section visibility
function toggleSection(section) {
  const sectionElement = document.getElementById(section);

  // Toggle the visibility of the selected section
  sectionElement.classList.toggle("hidden");

  // Hide all other sections
  hideOtherSections(sectionElement);
}

function hideOtherSections(excludeSection) {
  // Hide all sections except the one to exclude
  const sections = document.querySelectorAll(".dashboard-section");
  sections.forEach((section) => {
    const sectionId = section.id;
    if (sectionId !== excludeSection.id) {
      section.classList.add("hidden");
    }
  });
}

// Add event listeners for each menu item
document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".dashboard-menu-item");

  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      const sectionToShow = this.getAttribute("data-section");

      // Toggle the visibility of the selected section
      toggleSection(sectionToShow);
    });
  });
});
