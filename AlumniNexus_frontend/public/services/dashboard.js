window.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");
  let myEvents = [];

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
    card.id = event._id;
    card.className = "card shadow-sm relative bg-secondary-300";

    const img = document.createElement("img");
    img.className = "w-full";
    img.src =
      event?.image?.url ||
      "../images/audience-seminar-applauding-young-black-woman-lectern_625516-3573.jpg";
    img.alt = event.eventName;

    card.appendChild(img);

    const speakersContainer = document.createElement("div");
    speakersContainer.className =
      "absolute top-[35%] left-0 bg-black/50 w-full";

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
        if (speaker) {
          speakerElement.textContent = speaker;
        } else {
          speakerElement.textContent = "Speakers not yet specified";
        }
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

    card.appendChild(eventFooter);

    const detailsContainer = document.createElement("div");
    detailsContainer.className = "p-2";

    const timeContainer = document.createElement("div");
    timeContainer.className = "relative";

    const clockIcon = document.createElement("span");
    clockIcon.className = "absolute";
    clockIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" class="text-primary fill-current"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>';

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
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="4" viewBox="0 0 128 512" class="text-white fill-current"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>';

    const dropdownMenu = document.createElement("div");
    dropdownMenu.id = "dropdownMenu"; // Set an ID for easier reference
    dropdownMenu.className =
      "dropdown-menu hidden absolute right-0 mt-2 w-40 bg-primary rounded-lg shadow-lg border border-secondary-300";

    const actionsList = document.createElement("ul");
    actionsList.className = "py-1";

    const editEventAction = document.createElement("li");
    editEventAction.innerHTML = `<button id=${event._id} class="edit-event-form cursor-pointer block px-4 py-2 text-secondary-200 hover:text-hover">Edit Event</button>`;
    actionsList.appendChild(editEventAction);

    const deleteEventAction = document.createElement("li");
    deleteEventAction.innerHTML = `<button id=${event._id} class="delete-event-form cursor-pointer block px-4 py-2 text-secondary-200 hover:text-hover">Delete Event</button>`;
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
      loader.classList.remove("hidden");
      loader.classList.add("flex");
      fetch(
        `https://alumni-nexus-api.vercel.app/api/events/my-events/${userId}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((events) => {
          console.log("Events:", events);
          renderEvents(events);
          myEvents = events;
          loader.classList.add("hidden");
          loader.classList.remove("flex");

          // Attach event listeners after events are rendered
          attachEventListeners();
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

  function attachEventListeners() {
    const editEventElements = document.querySelectorAll(".edit-event-form");
    const deleteEventElements = document.querySelectorAll(".delete-event-form");
    const eventDateValue = document.querySelector("#eventDateValue");

    editEventElements.forEach((editEventElement) => {
      editEventElement.addEventListener("click", (event) => {
        const updateModal = document.querySelector("#update-event-modal");
        updateModal.classList.remove("hidden");

        const closeUpdateForm = document.querySelector(".close-update");
        closeUpdateForm.addEventListener("click", () => {
          updateModal.classList.add("hidden");
        });

        const cancelUpdate = document.querySelector("#cancelUpdate");
        cancelUpdate.addEventListener("click", () => {
          updateModal.classList.add("hidden");
        });

        if (event.target.id) {
          const myEvent = myEvents.filter(
            (createdEvent) => createdEvent._id == event.target.id
          )[0];
          eventDateValue.innerHTML = myEvent.eventDate?.split("T")[0];
          const updateForm = document.querySelector("#updateForm");
          updateForm.setAttribute("eventId", event.target.id);

          const data = {
            eventDate: myEvent.eventDate,
            eventSpeaker1: myEvent.eventSpeaker[0],
            eventSpeaker2: myEvent.eventSpeaker[1],
            ...myEvent,
          };

          // Iterate over the form elements
          for (const fieldName in data) {
            if (data.hasOwnProperty(fieldName)) {
              // Find the input element with the corresponding name
              const inputElement = updateForm.elements[fieldName];

              // Check if the input element exists
              if (inputElement) {
                // Assign the value from the data object
                inputElement.value = data[fieldName];
              }
            }
          }
        }
      });
    });

    deleteEventElements.forEach((deleteEventElement) => {
      deleteEventElement.addEventListener("click", (event) => {
        const deleteModal = document.querySelector("#delete-event-modal");
        deleteModal.classList.remove("hidden");

        const closeDelelteForm = document.querySelector(".close-event-delete");
        closeDelelteForm.addEventListener("click", () => {
          deleteModal.classList.add("hidden");
        });

        if (event.target.id) {
          const myEvent = myEvents.filter(
            (createdEvent) => createdEvent._id == event.target.id
          )[0];

          console.log(myEvent);
          const deleteForm = document.querySelector("#delete-event");
          deleteForm.setAttribute("eventId", event.target.id);
        }
      });
    });
  }
});
