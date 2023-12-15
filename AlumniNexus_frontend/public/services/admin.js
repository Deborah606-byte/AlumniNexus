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
window.addEventListener("DOMContentLoaded", async () => {
  let alumni = [];
  let alumniEvent = [];
  const currentUser = JSON.parse(localStorage.getItem("alumni")) || null;
  const memberContainer = document.getElementById("member-container");
  const eventContainer = document.getElementById("event-container");

  function getCurrentUserId() {
    return currentUser.user?._id || null;
  }

  function renderMember(members) {
    members.forEach((member) => {
      const memberCard = createMemberCard(member);
      memberContainer.appendChild(memberCard);
    });
  }

  function renderEvents(events) {
    eventContainer.innerHTML = "";

    events.forEach((event) => {
      const eventCard = createEventCard(event);
      eventContainer.appendChild(eventCard);
    });
  }

  // Member cards
  function createMemberCard(member) {
    const card = document.createElement("div");
    card.id = member._id;
    card.className = "grid lg:grid-cols-5 py-4 font-light";

    const usernameElement = createCardElement(member.username);
    const firstNameElement = createCardElement(member.firstName);
    const lastNameElement = createCardElement(member.lastName);
    const phoneElement = createCardElement(member.phone);
    const actionElement = createActionElement(member._id);

    // Append elements to the card
    card.appendChild(usernameElement);
    card.appendChild(firstNameElement);
    card.appendChild(lastNameElement);
    card.appendChild(phoneElement);
    card.appendChild(actionElement); // Append the action element to the card

    return card;
  }

  // Helper function to create card elements
  function createCardElement(value) {
    const element = document.createElement("div");
    element.className = "text-primary text-lg mb-2";
    element.innerHTML = `${value}`;
    return element;
  }

  // Helper function to create action elements
  function createActionElement(memberId) {
    const actionDiv = document.createElement("div");
    actionDiv.className = "pl-4";

    const actionSpan = document.createElement("span");
    actionSpan.id = `action-${memberId}`;
    actionSpan.className = "cursor-pointer dropdown-toggle";
    actionSpan.innerHTML =
      '<i class="fa-solid fa-ellipsis-vertical text-primary"></i>';

    // Dropdown Menu
    const dropdownMenu = document.createElement("div");
    dropdownMenu.className =
      "dropdown-menu hidden absolute right-0 mt-2 w-40 bg-primary rounded-lg shadow-lg border border-secondary-300";

    const ul = document.createElement("ul");
    ul.className = "py-1";

    // Edit Alumni
    const editLi = document.createElement("li");
    const editLink = document.createElement("a");
    editLink.id = `${memberId}`;
    editLink.className =
      "open-admin-edit-form block px-4 py-2 text-secondary-200 hover:text-hover";
    editLink.textContent = "Edit Alumni";
    editLi.appendChild(editLink);

    // Delete Alumni
    const deleteLi = document.createElement("li");
    const deleteLink = document.createElement("a");
    deleteLink.id = `${memberId}`;
    deleteLink.className =
      "open-admin-delete-form block px-4 py-2 text-secondary-200 hover:text-hover";
    deleteLink.textContent = "Delete Alumni";
    deleteLi.appendChild(deleteLink);

    ul.appendChild(editLi);
    ul.appendChild(deleteLi);

    dropdownMenu.appendChild(ul);

    actionDiv.appendChild(actionSpan);
    actionDiv.appendChild(dropdownMenu);

    // Event listener for showing/hiding the dropdown
    actionSpan.addEventListener("click", function () {
      dropdownMenu.classList.toggle("hidden");
    });

    // Event listener to close dropdown when clicking outside
    document.addEventListener("click", (member) => {
      if (!actionDiv.contains(member.target)) {
        dropdownMenu.classList.add("hidden");
      }
    });

    return actionDiv;
  }

  //event cards
  function createEventCard(event) {
    const card = document.createElement("div");
    card.id = event._id;
    card.className = "card shadow-sm relative bg-secondary-300";

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
    clockIcon.innerHTML = '<i class="fa-regular fa-clock text-primary"></i>';

    const eventTime = document.createElement("p");
    eventTime.className = "pl-6 text-secondary-200 font-semibold text-";
    eventTime.textContent = event.eventTime || "Time not specified";

    timeContainer.appendChild(clockIcon);
    timeContainer.appendChild(eventTime);

    const title = document.createElement("p");
    title.className = "text-primary font-medium text-2xl mb-2";
    title.textContent = event.eventCategory || "No title";

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
      '<i class="fa-solid fa-ellipsis-vertical text-white"></i>';

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

    const signupForm = document.getElementById("signupForm");
    const signupButton = document.getElementById("signupButton");

    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const addMember = new FormData(signupForm);

      // Fetch API to add a new alumni member
      fetch("https://alumni-nexus-api.vercel.app/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(addMember)),
      })
        .then(async (response) => {
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.data.message);
          }
        })
        .then((data) => {
          // Log the received data
          console.log("Data received from server:", data);

          // Check for success or handle the response as needed
          if (data.success) {
            alert("Signup successful!");
            window.location.reload();
          } else {
            // Handle the case where the signup was not successful
            console.error("Signup failed:", data.message);
          }
        })
        .catch((error) => {
          alert(error.message);
          console.error("Error adding member:", error);
        });
    });

    // Fetch all members
    fetch("https://alumni-nexus-api.vercel.app/api/users/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Log the received data
        console.log("Data received from server:", data);

        // Extract the array of members from the 'users' property
        const members = data.users;

        // Check if members is an array
        if (!Array.isArray(members)) {
          console.error("Members is not an array:", members);
          return;
        }

        // Render or process the list of members as needed
        console.log("All Members:", members);
        renderMember(members);
        alumni = members;
        // Attach event listeners after events are rendered
        attachMemberListeners();
      })
      .catch((error) => {
        console.error("Error fetching members:", error.message);
      });

    //fetch all events
    try {
      const events = await getAllEvents();
      console.log("All Events:", events);
      renderEvents(events);
      alumniEvent = events;

      // Attach event listeners after events are rendered
      attachEventListeners();
    } catch (error) {
      console.error("Error fetching events:", error.message);
    }
  }

  function attachMemberListeners() {
    const editMemberElements = document.querySelectorAll(
      ".open-admin-edit-form"
    );
    const deleteMemberElements = document.querySelectorAll(
      ".open-admin-delete-form"
    );

    editMemberElements.forEach((editMemberElement) => {
      editMemberElement.addEventListener("click", (member) => {
        const updateMemberModal = document.querySelector(
          "#update-member-modal"
        );
        updateMemberModal.classList.remove("hidden");

        const closeUpdateForm = document.querySelector(".close-update-form");
        closeUpdateForm.addEventListener("click", () => {
          updateMemberModal.classList.add("hidden");
        });

        const cancelUpdate = document.querySelector("#cancelUpdateMember");
        cancelUpdate.addEventListener("click", () => {
          updateMemberModal.classList.add("hidden");
        });

        constupdateMemberForm = document.querySelector("#updateMemberForm");
        updateMemberForm.setAttribute("memberId", member.target.id);

        if (member.target.id) {
          const alumniMember = alumni.filter(
            (alumniUser) => alumniUser._id == member.target.id
          )[0];
          // Iterate over the form elements
          const data = {
            ...alumniMember,
          };
          for (const fieldName in data) {
            if (data.hasOwnProperty(fieldName)) {
              // Find the input element with the corresponding name
              const inputElement = updateMemberForm.elements[fieldName];

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

    deleteMemberElements.forEach((deleteMemberElement) => {
      deleteMemberElement.addEventListener("click", (member) => {
        const deleteMemberModal = document.querySelector(
          "#delete-member-modal"
        );
        deleteMemberModal.classList.remove("hidden");

        const closeDelelteForm = document.querySelector(".close-delete");
        closeDelelteForm.addEventListener("click", () => {
          deleteMemberModal.classList.add("hidden");
        });

        if (member.target.id) {
          const alumniMember = alumni.filter(
            (alumniUser) => alumniUser._id == member.target.id
          )[0];

          console.log(alumniMember);
          const deleteForm = document.querySelector("#delete-member");
          deleteForm.setAttribute("memberId", member.target.id);
        }
      });
    });
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
          const alumniCreatedEvent = alumniEvent.filter(
            (createdAlumniEvent) => createdAlumniEvent._id == event.target.id
          )[0];
          eventDateValue.innerHTML =
            alumniCreatedEvent.eventDate?.split("T")[0];
          const updateMemberForm = document.querySelector("#updateForm");
          updateMemberForm.setAttribute("eventId", event.target.id);

          const data = {
            eventDate: alumniCreatedEvent.eventDate,
            eventSpeaker1: alumniCreatedEvent.eventSpeaker[0],
            eventSpeaker2: alumniCreatedEvent.eventSpeaker[1],
            ...alumniCreatedEvent,
          };

          // Iterate over the form elements
          for (const fieldName in data) {
            if (data.hasOwnProperty(fieldName)) {
              // Find the input element with the corresponding name
              const inputElement = updateMemberForm.elements[fieldName];

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
        const deleteMemberModel = document.querySelector("#delete-event-modal");
        deleteMemberModel.classList.remove("hidden");

        const closeDelelteForm = document.querySelector(".close-event-delete");
        closeDelelteForm.addEventListener("click", () => {
          deleteMemberModel.classList.add("hidden");
        });

        if (event.target.id) {
          const alumniCreatedEvent = alumniEvent.filter(
            (createdAlumniEvent) => createdAlumniEvent._id == event.target.id
          )[0];

          console.log(alumniCreatedEvent);
          const deleteMemberForm = document.querySelector("#delete-event");
          deleteMemberForm.setAttribute("eventId", event.target.id);
        }
      });
    });
  }
});
