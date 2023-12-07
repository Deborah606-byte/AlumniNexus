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
      "../images/audience-seminar-applauding-young-black-woman-lectern_625516-3573.avif";
    img.alt = "seminar";

    card.appendChild(img);

    const speakersContainer = document.createElement("div");
    speakersContainer.className =
      "absolute top-[48%] left-0 bg-black/50 w-full";

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
      fetch(`http://localhost:8080/api/events/my-events/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((events) => {
          // console.log("Events:", events);
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
          eventDateValue.innerHTML = myEvent.eventDate.split("T")[0];
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

        const closeDelelteForm = document.querySelector(".close-delete");
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
