import { getAllEvents } from "../services/eventService.js";
import { renderAllEvents, searchEvents } from "../services/renderEvents.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const events = await getAllEvents();
    const eventsContainer = document.getElementById("all-events-container");
    const loadMoreContainer = document.getElementById("load-more-container");
    const searchButton = document.getElementById("searchButton");

    // Log the fetched events to inspect their structure
    console.log("Fetched events:", events);

    // Render the first 3 events
    renderAllEvents(events.slice(0, 3), "all-events-container");

    // Handle "Load more" button click
    const loadMoreLink = loadMoreContainer.querySelector(".load-more-link");
    let loadMoreVisible = true;

    loadMoreLink.addEventListener("click", function () {
      // Toggle visibility of the remaining events
      loadMoreVisible = !loadMoreVisible;

      if (loadMoreVisible) {
        renderAllEvents(events.slice(0, 3), "all-events-container");
        loadMoreLink.textContent = "Load more";
      } else {
        renderAllEvents(events, "all-events-container");
        loadMoreLink.textContent = "Load less";
      }
    });

    if (searchButton) {
      searchButton.addEventListener("click", searchEvents);
    }

    console.log(events);
  } catch (error) {
    // Handle the error, e.g., show an error message to the user
    console.error("Failed to fetch and render events:", error.message);
  }
});
