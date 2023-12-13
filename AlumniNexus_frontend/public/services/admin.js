window.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("alumni")) || null;
  const memberContainer = document.getElementById("member-container");

  function getCurrentUserId() {
    return currentUser.user?._id || null;
  }
  function renderMember(members) {
    members.forEach((member) => {
      const memberCard = createMemberCard(member);
      memberContainer.appendChild(memberCard);
    });
  }

  // Event cards
  function createMemberCard(member) {
    const card = document.createElement("div");
    card.id = member._id;
    card.className = "grid grid-cols-5 py-4 font-light";

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
      fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(addMember)),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
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
          console.error("Error adding member:", error.message);
        });
    });

    // Fetch all members
    fetch("http://localhost:8080/api/users/all")
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
        // Attach event listeners after events are rendered
        attachEventListeners();
      })
      .catch((error) => {
        console.error("Error fetching members:", error.message);
      });
  }

  function attachEventListeners() {
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

        const updateForm = document.querySelector("#updateMemberForm");
        updateForm.setAttribute("memberId", member.target.id);

        if (member.target.id) {
          // Iterate over the form elements
          for (const fieldName in member) {
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

    deleteMemberElements.forEach((deleteMemberElement) => {
      deleteMemberElement.addEventListener("click", (member) => {});
    });
  }
});
