const updateForm = document.getElementById("updateForm");
const updateModel = document.getElementById("update-event-modal");

let updatedImage;
const fileUpdatedInput = document.getElementById("updatedImage");
fileUpdatedInput.addEventListener("change", function () {
  updatedImage = fileUpdatedInput.files[0];
  console.log("Selected file:", updatedImage);
});

const updateButton = document.getElementById("update-event-button");
updateForm.addEventListener("submit", function (event) {
  event.preventDefault();

  updateButton.innerHTML = "Updating...";

  const updateEventData = new FormData(this);
  console.log(updateEventData);
  updateEventData.delete("file");
  updateEventData.append("file", updatedImage);
  const eventId = updateForm.getAttribute("eventId");

  fetch(`https://alumni-nexus-api.vercel.app/api/events/update/${eventId}`, {
    method: "PUT",
    body: updateEventData,
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
      updateButton.innerHTML = "Update Event";
      // document.getElementById("updateModal").classList.add("hidden");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert("Error: Event update failed (Upload a different image: Size 10MB)");
    });
});
