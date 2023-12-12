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
  card.setAttribute("data-category", event.category);

  const aspectWrapper = document.createElement("div");
  aspectWrapper.className = "aspect-w-4 aspect-h-3";
  card.appendChild(aspectWrapper);

  const img = document.createElement("img");
  img.className = "object-cover";
  img.src =
    event?.image?.url ||
    "../images/audience-seminar-applauding-young-black-woman-lectern_625516-3573.avif";
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
  buttonContainer.className = "flex justify-between px-2 py-2";
  card.appendChild(buttonContainer);

  const viewDetailsBtn = document.createElement("a");
  viewDetailsBtn.href = "/details";
  viewDetailsBtn.className =
    "bg-secondary-100 text-secondary-200 rounded-lg py-2 px-4 hover:text-hover";
  viewDetailsBtn.textContent = "View Details";
  buttonContainer.appendChild(viewDetailsBtn);

  const rsvpBtn = document.createElement("a");
  rsvpBtn.href = "/rsvp";
  rsvpBtn.className =
    "bg-secondary-100 text-secondary-200 rounded-lg py-2 px-4 hover:text-hover";
  rsvpBtn.textContent = "RSVP";
  buttonContainer.appendChild(rsvpBtn);

  return card;
}

function searchEvents() {
  const selectedCategory = document.getElementById("categorySelect").value;
  const eventCards = document.querySelectorAll(".card");

  eventCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");
    if (selectedCategory === "all" || cardCategory === selectedCategory) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

export { renderAllEvents, searchEvents };
