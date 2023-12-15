let image;
const fileInput = document.getElementById("image")
fileInput.addEventListener("change", function(){
  image = fileInput?.files[0];
});

const createButton = document.getElementById("create-event-button");

document
  .getElementById("event-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    createButton.innerHTML = "Creating...";

    const eventData = new FormData(this);
    eventData.delete("file");
    eventData.append("file", image)

    const currentUser = JSON.parse(localStorage.getItem("alumni")) || null;
    console.log({
      currentUser,
      eventData: JSON.stringify(Object.fromEntries(eventData)),
    });

    if (currentUser == null) return;

    const { _id: userId } = currentUser.user;
    eventData.append("userId", userId);

    fetch("http://localhost:8080/api/events/create", {
      method: "POST",
      body: eventData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data.message);
        alert("Event Added Successfully!");
        createButton.innerHTML = "Create Event";
        window.location.reload();
        document.getElementById("event-modal").classList.add("hidden");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error: Event creation failed");
      });
  });
