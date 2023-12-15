import { getAllEvents } from "./eventService.js";

document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("eventId");
  console.log("Event ID from URL:", eventId);

  try {
    const allEvents = await getAllEvents();

    const eventDetails = allEvents.find((event) => event._id === eventId);

    if (!eventDetails) {
      console.error(`Event with ID ${eventId} not found.`);
      return;
    }

    // Render event details on the page
    renderEventDetails(eventDetails);
  } catch (error) {
    console.error("Error fetching event details:", error.message);
  }
});

function renderEventDetails(eventDetails) {
  const allEventsDetailsContainer =
    document.getElementById("all-events-details");

  // Create a new container for the event details
  const eventDetailsContainer = document.createElement("div");
  eventDetailsContainer.className = "p-2";

  // Create and set the content for each element based on eventDetails
  const eventNameElement = document.createElement("h3");
  eventNameElement.className = "text-secondary-100 text-2xl font-medium mb-4";
  eventNameElement.textContent = `Event Name: ${eventDetails.eventName}`;
  eventDetailsContainer.appendChild(eventNameElement);

  // Date
  const dateElement = document.createElement("p");
  dateElement.className = "text-secondary-200 mb-4";
  const eventDate = new Date(eventDetails.eventDate);
  const formattedDate = eventDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  dateElement.textContent = `Date: ${formattedDate}`;
  eventDetailsContainer.appendChild(dateElement);

  // Location
  const locationElement = document.createElement("p");
  locationElement.className = "text-secondary-200 mb-4";
  locationElement.textContent = `Location: ${eventDetails.eventLocation}`;
  eventDetailsContainer.appendChild(locationElement);

  // Event Banner Image
  const eventBannerImg = document.createElement("img");
  eventBannerImg.src = eventDetails?.image?.url || "../images/homecoming.jpg";
  eventBannerImg.alt = "Event Banner";
  eventBannerImg.className = "mb-4 w-full h-auto rounded-lg";
  eventDetailsContainer.appendChild(eventBannerImg);

  // Event Details Section
  const eventDetailsSection = document.createElement("div");
  eventDetailsSection.className =
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

  // Event Details
  const detailsContainer = document.createElement("div");
  detailsContainer.className = "space-y-4";
  detailsContainer.innerHTML = `
  <h2 class="text-secondary-100 text-xl font-medium">Event Details</h2>
  <p class="text-secondary-200 text-sm">Date: ${formattedDate}</p>
  <p class="text-secondary-200 text-sm">Time: ${eventDetails.eventTime}</p>
  <p class="text-secondary-200 text-sm">Location: ${eventDetails.eventLocation}</p>
`;

  // Event Agenda Section
  const agendaSection = document.createElement("div");
  agendaSection.className = "space-y-4";
  agendaSection.innerHTML = `
    <h2 class="text-secondary-100 text-xl font-medium">Agenda</h2>
  `;
  const pAgenda = document.createElement("p");
  pAgenda.className =
    "text-secondary-200 text-base font-light leading-relaxed mb-4";
  pAgenda.textContent = eventDetails.eventAgenda || "No agenda available.";

  agendaSection.appendChild(pAgenda);

  /// Event Speakers Section
  const speakersSection = document.createElement("div");
  speakersSection.innerHTML = `
  <h2 class="text-secondary-100 text-xl font-medium">Speakers</h2>
`;

  // Check if eventSpeaker is present and is an array
  if (eventDetails.eventSpeaker && Array.isArray(eventDetails.eventSpeaker)) {
    const speakersList = document.createElement("ul");

    // Iterate through each speaker in the array
    eventDetails.eventSpeaker.forEach((speaker) => {
      const speakerElement = document.createElement("li");
      speakerElement.className =
        "text-secondary-200 text-base font-light leading-relaxed mb-4";

      // Check if the speaker is defined and not null
      if (speaker !== null && speaker !== undefined) {
        speakerElement.textContent = speaker;
      } else {
        speakerElement.textContent = "Speaker not specified";
      }

      speakersList.appendChild(speakerElement);
    });

    speakersSection.appendChild(speakersList);
  } else {
    console.log("No speakers or not an array:", eventDetails.eventSpeaker);
  }

  // Append sections to the main section
  eventDetailsSection.appendChild(detailsContainer);
  eventDetailsSection.appendChild(agendaSection);
  eventDetailsSection.appendChild(speakersSection);

  // Append the section to the main container
  eventDetailsContainer.appendChild(eventDetailsSection);

  // Event Description Section
  const descriptionSection = document.createElement("div");
  descriptionSection.className = "mt-8";

  const h2DescriptionTitle = document.createElement("h2");
  h2DescriptionTitle.className = "text-secondary-100 text-xl font-medium";
  h2DescriptionTitle.textContent = "Event Description";

  descriptionSection.appendChild(h2DescriptionTitle);

  const pDescription = document.createElement("p");
  pDescription.className =
    "text-secondary-200 text-base font-light leading-relaxed mb-4";
  pDescription.textContent =
    eventDetails.eventDescription || "No description available.";

  descriptionSection.appendChild(pDescription);

  // Append the event description section to the main container
  eventDetailsContainer.appendChild(descriptionSection);

  // Append the event details container to the main container
  allEventsDetailsContainer.appendChild(eventDetailsContainer);
}
