const updateEventButton = document.querySelector(".updateEventbutton");
const updateEventForm = document.getElementById("update-event");
const updateModal = document.getElementById("update-event-modal");
const closeUpdateButton = document.getElementById("close-update");

// Function to open the update event modal
function openUpdateEventModal() {
  updateModal.classList.remove("hidden");
}

// Function to close the update event modal
function closeUpdateEventModal() {
  updateModal.classList.add("hidden");
}

// Event listeners
updateEventButton.addEventListener("click", openUpdateEventModal);
closeUpdateButton.addEventListener("click", closeUpdateEventModal);
