const programsEventsLink = document.getElementById("programsEvents");
const programsEventsDropdown = document.getElementById(
  "programsEventsDropdown"
);

programsEventsLink.addEventListener("click", () => {
  programsEventsDropdown.classList.toggle("hidden");
});

// Close the dropdown when clicking outside of it
document.addEventListener("click", (e) => {
  if (!programsEventsLink.contains(e.target)) {
    programsEventsDropdown.classList.add("hidden");
  }
});

