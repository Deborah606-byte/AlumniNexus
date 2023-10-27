function showSection(sectionId) {
  console.log(`Showing section: ${sectionId}`);
  // Hide all sections
  const sections = document.querySelectorAll(".admin-popup");
  sections.forEach((section) => {
    section.classList.add("hidden");
  });

  // Show the selected section
  const selectedSection = document.getElementById(sectionId);
  selectedSection.classList.remove("hidden");
}
