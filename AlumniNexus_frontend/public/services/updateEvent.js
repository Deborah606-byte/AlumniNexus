const updateForm = document.getElementById("updateForm");
const updateModel = document.getElementById("update-event-modal");
updateForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const updateEventData = new FormData(this);
  const eventId = updateForm.getAttribute("eventId");

  fetch(`http://localhost:8080/api/events/update/${eventId}`, {
    method: "PUT", // Assuming you use the PUT method for updates
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(updateEventData)),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data.message);
      alert("Event Updated Successfully!");
      // document.getElementById("updateModal").classList.add("hidden");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert("Error: Event update failed");
    });
});
