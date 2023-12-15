let currentEvent = 1; // Initial event

function showEvent(eventNumber) {
  // Hide all events
  const eventContainers = document.querySelectorAll(".event-container");
  eventContainers.forEach((container) => {
    container.classList.add("hidden");
  });

  // Show the selected event
  document.getElementById("event" + eventNumber).classList.remove("hidden");
}

function prevEvent() {
  currentEvent = Math.max(1, currentEvent - 1);
  showEvent(currentEvent);
}

function nextEvent() {
  const totalEvents = document.querySelectorAll(".event-container").length;
  currentEvent = Math.min(totalEvents, currentEvent + 1);
  showEvent(currentEvent);
}

// Show the initial event on page load
showEvent(currentEvent);
