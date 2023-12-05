window.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("alumni")) || null;
  const eventContainer = document.getElementById("event-container");

  function getCurrentUserId() {
    return currentUser.user?._id || null;
  }

  function renderEvents(events) {
    eventContainer.innerHTML = "";

    events.forEach((event) => {
      const eventCard = createEventCard(event);
      eventContainer.appendChild(eventCard);
    });
  }

  //event cards
  function createEventCard(event) {
    const card = document.createElement("div");
    card.className = "card shadow-sm relative bg-secondary-300";

    const img = document.createElement("img");
    img.className = "w-full";
    img.src =
      "../images/audience-seminar-applauding-young-black-woman-lectern_625516-3573.avif";
    img.alt = "seminar";

    card.appendChild(img);

    const speakersContainer = document.createElement("div");
    speakersContainer.className =
      "absolute top-[49%] left-0 bg-black/50 w-full";

    if (event.eventSpeaker && Array.isArray(event.eventSpeaker)) {
      const speakersList = document.createElement("ul");
      speakersList.className = "list-disc px-6 py-2";

      const speakersTitle = document.createElement("p");
      speakersTitle.className = "text-secondary-200 font-bold text-xl -mx-6";
      speakersTitle.textContent = "Speakers";
      speakersList.appendChild(speakersTitle);

      event.eventSpeaker.forEach((speaker) => {
        const speakerElement = document.createElement("li");
        speakerElement.className = "text-secondary-200 font-medium";
        speakerElement.textContent = speaker;

        speakersList.appendChild(speakerElement);
      });

      speakersContainer.appendChild(speakersList);
    }

    card.appendChild(speakersContainer);

    const eventFooter = document.createElement("div");
    eventFooter.className = "flex justify-start space-x-8 mb-4";
    const dateContainer = document.createElement("div");
    dateContainer.className = "bg-primary px-4 py-2";

    eventFooter.appendChild(dateContainer);
    if (event.eventDate) {
      const formattedDate = new Date(event.eventDate).toLocaleDateString(
        undefined,
        { month: "short", day: "numeric" }
      );

      formattedDate.split(" ").forEach((e) => {
        const date = document.createElement("p");
        date.className = "text-secondary-200 font-medium";
        date.textContent = e;

        dateContainer.appendChild(date);
      });
    }

    card.appendChild(eventFooter);

    const detailsContainer = document.createElement("div");
    detailsContainer.className = "p-2";

    const timeContainer = document.createElement("div");
    timeContainer.className = "relative";

    const clockIcon = document.createElement("span");
    clockIcon.className = "absolute";
    clockIcon.innerHTML = '<i class="fa-regular fa-clock text-primary"></i>';

    const eventTime = document.createElement("p");
    eventTime.className = "pl-6 text-secondary-200 font-semibold text-";
    eventTime.textContent = event.eventTime || "Time not specified";

    timeContainer.appendChild(clockIcon);
    timeContainer.appendChild(eventTime);

    const title = document.createElement("p");
    title.className = "text-primary font-medium text-2xl mb-2";
    title.textContent = event.eventName || "No title";

    detailsContainer.appendChild(title);
    detailsContainer.appendChild(timeContainer);

    eventFooter.appendChild(detailsContainer);

    const dropdownContainer = document.createElement("div");
    dropdownContainer.className = "absolute top-2 right-5";

    // Dropdown
    const threeDotsIcon = document.createElement("span");
    threeDotsIcon.id = "dropdownToggle"; // Set an ID for easier reference
    threeDotsIcon.className = "dropdown-toggle cursor-pointer";
    threeDotsIcon.innerHTML =
      '<i class="fa-solid fa-ellipsis-vertical text-primary"></i>';

    const dropdownMenu = document.createElement("div");
    dropdownMenu.id = "dropdownMenu"; // Set an ID for easier reference
    dropdownMenu.className =
      "dropdown-menu hidden absolute right-0 mt-2 w-40 bg-primary rounded-lg shadow-lg border border-secondary-300";

    const actionsList = document.createElement("ul");
    actionsList.className = "py-1";

    const editEventAction = document.createElement("li");
    editEventAction.innerHTML =
      '<a id="editEvent" class="edit-event-form cursor-pointer block px-4 py-2 text-secondary-200 hover:text-hover">Edit Event</a>';
    actionsList.appendChild(editEventAction);

    const deleteEventAction = document.createElement("li");
    deleteEventAction.innerHTML =
      '<a id="deleteEvent" class="delete-event-form cursor-pointer block px-4 py-2 text-secondary-200 hover:text-hover">Delete Event</a>';
    actionsList.appendChild(deleteEventAction);

    dropdownMenu.appendChild(actionsList);

    // Append threeDotsIcon and dropdownMenu to dropdownContainer
    dropdownContainer.appendChild(threeDotsIcon);
    dropdownContainer.appendChild(dropdownMenu);

    // Append dropdownContainer to the card
    card.appendChild(dropdownContainer);

    // Event listener to toggle dropdown visibility
    threeDotsIcon.addEventListener("click", () => {
      dropdownMenu.classList.toggle("hidden");
    });

    // Event listener to close dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (!dropdownContainer.contains(event.target)) {
        dropdownMenu.classList.add("hidden");
      }
    });

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

  document.getElementById("editEvent").addEventListener("click", () => {
    //Logic for editing an event here
    console.log("Edit Event clicked");
  });

  document.getElementById("deleteEvent").addEventListener("click", () => {
    // Logic for deleting an event here
    console.log("Delete Event clicked");

    const confirmDelete = confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      // Perform the deletion logic
    }
  });
});
