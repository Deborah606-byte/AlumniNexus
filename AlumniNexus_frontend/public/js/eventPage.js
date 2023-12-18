async function getAllEvents() {
  try {
    const response = await fetch(
      "https://alumni-nexus-api.vercel.app/api/events/all"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const events = data.events || [];
    return events;
  } catch (error) {
    console.error("Error fetching events:", error.message);
    throw error;
  }
}

function renderAllEvents(events, containerId) {
  const allEventsContainer = document.getElementById(containerId);

  if (!allEventsContainer) {
    console.error(`Container with ID ${containerId} not found.`);
    return;
  }

  allEventsContainer.innerHTML = "";

  // Check if events is an array
  if (!Array.isArray(events)) {
    console.error("Events is not an array:", events);
    return;
  }

  events.forEach((event) => {
    const eventCard = createEventCard(event);
    allEventsContainer.appendChild(eventCard);
  });
}

function createEventCard(event) {
  const card = document.createElement("div");
  card.id = event._id;
  card.className = "card shadow-sm relative bg-secondary-300 w-80";
  card.setAttribute("data-category", event.eventCategory);

  const aspectWrapper = document.createElement("div");
  aspectWrapper.className = "aspect-w-4 aspect-h-3";
  card.appendChild(aspectWrapper);

  const img = document.createElement("img");
  img.className = "object-cover w-full h-[200px]";
  img.src =
    event?.image?.url ||
    "../images/audience-seminar-applauding-young-black-woman-lectern_625516-3573.jpg";
  img.alt = event.eventName;
  aspectWrapper.appendChild(img);

  const absoluteDiv = document.createElement("div");
  absoluteDiv.className = "absolute top-[39%] bg-black/50 w-full text-center";
  aspectWrapper.appendChild(absoluteDiv);

  const title = document.createElement("h4");
  title.className = "text-secondary-100 font-medium text-xl mb-2";
  title.textContent = event.eventName;
  absoluteDiv.appendChild(title);

  const flexContainer = document.createElement("div");
  flexContainer.className = "flex justify-start space-x-8 mb-4";

  const dateContainer = document.createElement("div");
  dateContainer.className = "bg-primary py-16 px-4";
  flexContainer.appendChild(dateContainer);

  if (event.eventDate) {
    const eventDate = new Date(event.eventDate);

    const formattedDate = eventDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });

    const date = document.createElement("p");
    date.className = "text-secondary-200 font-medium";
    date.textContent = formattedDate;

    dateContainer.appendChild(date);
  }

  card.appendChild(flexContainer);

  const detailsContainer = document.createElement("div");
  detailsContainer.className = "p-2";

  const LocationContainer = document.createElement("div");
  LocationContainer.className = "relative";

  const clockIcon = document.createElement("span");
  clockIcon.className = "absolute";
  clockIcon.innerHTML = '<i class="fa-solid fa-location-dot text-primary"></i>';

  const eventLocation = document.createElement("p");
  eventLocation.className = "pl-6 text-secondary-200 font-semibold text-";
  eventLocation.textContent = event.eventLocation || "Location not specified";

  LocationContainer.appendChild(clockIcon);
  LocationContainer.appendChild(eventLocation);

  const description = document.createElement("p");
  description.className =
    "text-secondary-200 text-sm font-light leading-relaxed";
  description.textContent = event.eventDescription || "No Description";

  detailsContainer.appendChild(description);
  detailsContainer.appendChild(LocationContainer);

  flexContainer.appendChild(detailsContainer);

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "flex justify-between items-center px-2 py-2";

  const viewDetailsBtn = document.createElement("a");
  // viewDetailsBtn.href = `/details?eventId=${event._id}`;
  viewDetailsBtn.innerHTML = `<button id=${event._id} class="view-event-details bg-secondary-100 text-secondary-200 rounded-lg py-2 px-4 hover:text-hover">View Details</button>`;
  viewDetailsBtn.setAttribute("data-event-id", event._id);
  viewDetailsBtn.setAttribute("href", `/details?eventId=${event._id}`);
  buttonContainer.appendChild(viewDetailsBtn);

  // Add an event listener to handle the click event
  // viewDetailsBtn.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   console.log(event.target.id);
  // });

  const rsvpBtn = document.createElement("a");
  rsvpBtn.innerHTML = `<button id=${event._id} class="rsvp-events bg-secondary-100 text-secondary-200 rounded-lg py-2 px-4 hover:text-hover">RSVP</button>`;
  rsvpBtn.setAttribute("data-event-id", event._id);
  rsvpBtn.setAttribute("href", `/rsvp?eventId=${event._id}`);
  buttonContainer.appendChild(rsvpBtn);

  card.appendChild(buttonContainer);

  return card;
}

function searchEvents() {
  console.log("Search button clicked");
  const selectedCategory = document.getElementById("categorySelect").value;
  const eventCards = document.querySelectorAll(".card");
  let foundEvents = false;

  // Show loader during search
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.classList.remove("hidden");
  }

  eventCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");
    if (selectedCategory === "all" || cardCategory === selectedCategory) {
      card.style.display = "block";
      foundEvents = true;
    } else {
      card.style.display = "none";
    }
  });

  // Hide loader after search is completed
  if (loader) {
    loader.classList.add("hidden");
  }

  // Display a message if no events are found
  const messageContainer = document.getElementById("no-events-message");
  if (messageContainer) {
    if (!foundEvents) {
      messageContainer.textContent = `No events found for the category: ${selectedCategory}`;
    } else {
      messageContainer.textContent = ""; // Clear the message if events are found
    }
  }
}

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
