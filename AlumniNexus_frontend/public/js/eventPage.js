import { getAllEvents } from "../services/eventService.js";
import { renderAllEvents, searchEvents } from "../services/renderEvents.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const loader = document.querySelector(".loader");
    const eventsContainer = document.getElementById("all-events-container");
    const loadMoreContainer = document.getElementById("load-more-container");

    // Show loader while events are being fetched
    if (loader) {
      loader.classList.remove("hidden");
    }

    const events = await getAllEvents();

    // Render the first 3 events
    renderAllEvents(events.slice(0, 3), "all-events-container");

    // Hide loader after events have been loaded and rendered
    if (loader) {
      loader.classList.add("hidden");
    }

    // Handle "Load more" button
    const loadMoreLink = loadMoreContainer.querySelector(".load-more-link");
    let loadMoreVisible = true;

    loadMoreLink.addEventListener("click", function () {
      loadMoreVisible = !loadMoreVisible;

      if (loadMoreVisible) {
        renderAllEvents(events.slice(0, 3), "all-events-container");
        loadMoreLink.textContent = "Load more";
      } else {
        renderAllEvents(events, "all-events-container");
        loadMoreLink.textContent = "Load less";
      }
    });

    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
      searchButton.addEventListener("click", searchEvents);
    }

    console.log(events);
  } catch (error) {
    console.error("Failed to fetch and render events:", error.message);
    // Handle the error, e.g., show an error message to the user
  } finally {
    // Hide loader in case of an error
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.classList.add("hidden");
    }
  }
});
