const openEventButton = document.getElementById("open-event-form");
const eventModal = document.getElementById("event-modal");
const closeEventButton = document.getElementById("close-form");

// Function to open the event modal
function openEventModal(event) {
  event.preventDefault();
  eventModal.classList.remove("hidden");
}

// Function to close the event modal
function closeEventModal() {
  eventModal.classList.add("hidden");
}

// Function to cancel the profile update
function cancelEvent() {
  closeEventModal();
}

openEventButton.addEventListener("click", openEventModal);
closeEventButton.addEventListener("click", closeEventModal);

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  console.log("Button clicked");
});
