const deleteForm = document.getElementById("delete-event");
const deleteModel = document.getElementById("delete-event-modal");
deleteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const eventId = deleteForm.getAttribute("eventId");

  fetch(`https://alumni-nexus-api.vercel.app/api/events/delete/${eventId}`, {
    method: "DELETE", // Assuming you use the PUT method for updates
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data.message);
      alert("Event Deleted Successfully!");
      // document.getElementById("updateModal").classList.add("hidden");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert("Error: Event update failed");
    });
});
