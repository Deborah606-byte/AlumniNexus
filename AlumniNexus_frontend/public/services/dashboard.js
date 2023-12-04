window.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("alumni")) || null;
  const eventContainer = document.getElementById("event-container");

  function getCurrentUserId() {
    return currentUser.user?._id || null;
  }

  function renderEvents(events) {
    // Clear existing content in the event container
    eventContainer.innerHTML = "";

    // Loop through the events and create a card for each
    events.forEach((event) => {
      const eventCard = createEventCard(event);
      eventContainer.appendChild(eventCard);
    });
  }

  function createEventCard(event) {
    // Create HTML elements for the event card
    const card = document.createElement("div");
    card.className = "card shadow-sm relative bg-secondary-300";

    // Create image element
    const img = document.createElement("img");
    img.className = "w-full";
    img.src =
      "../images/audience-seminar-applauding-young-black-woman-lectern_625516-3573.avif";
    img.alt = "seminar";

    // Append image and title to the card
    card.appendChild(img);

    // Create speakersContainer element
    const speakersContainer = document.createElement("div");
    speakersContainer.className =
      "absolute top-[49%] left-0 bg-black/50 w-full";

    // Check if event has speakers property and it is an array
    if (event.eventSpeaker && Array.isArray(event.eventSpeaker)) {
      const speakersList = document.createElement("ul");
      speakersList.className = "list-disc px-6 py-2";

      // Add "Speakers" title
      const speakersTitle = document.createElement("p");
      speakersTitle.className = "text-secondary-200 font-xl";
      speakersTitle.textContent = "Speakers";
      speakersList.appendChild(speakersTitle);

      // Add speakers to the list
      event.eventSpeaker.forEach((speaker) => {
        const speakerElement = document.createElement("li");
        speakerElement.className = "text-secondary-200 font-medium";
        speakerElement.textContent = speaker;

        speakersList.appendChild(speakerElement);
      });

      // Append the list to speakersContainer
      speakersContainer.appendChild(speakersList);
    }

    // Append speakersContainer to the card
    card.appendChild(speakersContainer);

    // Create dateContainer element
    const eventFooter = document.createElement("div");
    eventFooter.className = "flex justify-start space-x-8 mb-4";
    const dateContainer = document.createElement("div");
    dateContainer.className = "bg-primary px-4 py-2";

    eventFooter.appendChild(dateContainer);
    // Check if event has date property
    if (event.eventDate) {
      // Format the date to display only the month and day
      const formattedDate = new Date(event.eventDate).toLocaleDateString(
        undefined,
        { month: "short", day: "numeric" }
      );

      formattedDate.split(" ").forEach((e) => {
        // Create date element
        const date = document.createElement("p");
        date.className = "text-secondary-200 font-medium";
        date.textContent = e;

        // Append date and time to dateContainer
        dateContainer.appendChild(date);
      });
    }

    // Append dateContainer to the card
    card.appendChild(eventFooter);

    // Create detailsContainer element for additional details like speakers
    const detailsContainer = document.createElement("div");
    detailsContainer.className = "p-2";

    // Create timeContainer element for time
    const timeContainer = document.createElement("div");
    timeContainer.className = "relative";

    // Create clock icon
    const clockIcon = document.createElement("span");
    clockIcon.className = "absolute";
    clockIcon.innerHTML = '<i class="fa-regular fa-clock text-primary"></i>';

    // Create time element
    const eventTime = document.createElement("p");
    eventTime.className = "pl-6 text-secondary-200 font-semibold text-";
    eventTime.textContent = event.eventTime || "Time not specified";

    // Append clock icon and time to timeContainer
    timeContainer.appendChild(clockIcon);
    timeContainer.appendChild(eventTime);

    // Create title element
    const title = document.createElement("p");
    title.className = "text-primary font-medium text-2xl mb-2";
    title.textContent = event.eventName || "No title";

    // Append timeContainer to detailsContainer
    detailsContainer.appendChild(title);
    detailsContainer.appendChild(timeContainer);

    // Append detailsContainer to the card
    eventFooter.appendChild(detailsContainer);

    // Create dropdownContainer element
    const dropdownContainer = document.createElement("div");
    dropdownContainer.className = "absolute top-2 right-5";

    // Create three dots icon element
    const threeDotsIcon = document.createElement("span");
    threeDotsIcon.id = ""; // Set your ID if needed
    threeDotsIcon.className = "dropdown-toggle cursor-pointer";
    threeDotsIcon.innerHTML =
      '<i class="fa-solid fa-ellipsis-vertical text-primary"></i>';

    // Create dropdownMenu element
    const dropdownMenu = document.createElement("div");
    dropdownMenu.id = ""; // Set your ID if needed
    dropdownMenu.className =
      "dropdown-menu hidden absolute right-0 mt-2 w-40 bg-primary rounded-lg shadow-lg border border-secondary-300";

    // Create a list of actions
    const actionsList = document.createElement("ul");
    actionsList.className = "py-1";

    // Add "Edit Event" action
    const editEventAction = document.createElement("li");
    editEventAction.innerHTML =
      '<a id="" class="edit-event-form cursor-pointer block px-4 py-2 text-secondary-200 hover:text-hover">Edit Event</a>';
    actionsList.appendChild(editEventAction);

    // Add "Delete Event" action
    const deleteEventAction = document.createElement("li");
    deleteEventAction.innerHTML =
      '<a class="delete-event-form cursor-pointer block px-4 py-2 text-secondary-200 hover:text-hover">Delete Event</a>';
    actionsList.appendChild(deleteEventAction);

    // Append the list to the dropdownMenu
    dropdownMenu.appendChild(actionsList);

    // Append threeDotsIcon and dropdownMenu to dropdownContainer
    dropdownContainer.appendChild(threeDotsIcon);
    dropdownContainer.appendChild(dropdownMenu);

    // Append dropdownContainer to the card
    card.appendChild(dropdownContainer);

    return card;
  }

  if (currentUser) {
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const updateUsername = document.getElementById("update-username");
    const email = document.getElementById("email");
    const yearGroup = document.getElementById("group");
    const phone = document.getElementById("phone");

    firstName.value = currentUser.user?.firstName || "";
    lastName.value = currentUser.user?.lastName || "";
    updateUsername.value = currentUser.user?.username || "";
    email.value = currentUser.user?.email || "";
    yearGroup.value = currentUser.user?.group || "";
    phone.value = currentUser.user?.phone || "";

    // Display events for the current user
    const userId = getCurrentUserId();
    if (userId) {
      fetch(`http://localhost:8080/api/events/my-events/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((events) => {
          console.log("Events:", events);
          renderEvents(events);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  } else {
    // Show a popup message
    alert("Please login!.");
    window.location.href = "/auth/login";
  }
});
