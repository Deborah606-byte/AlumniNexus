import { getAllEvents } from "./eventService.js";

document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("eventId");
  console.log("Event ID from URL:", eventId);

  try {
    const allEvents = await getAllEvents();

    const rsvpEvent = allEvents.find((event) => event._id === eventId);

    if (!rsvpEvent) {
      console.error(`Event with ID ${eventId} not found.`);
      return;
    }
  } catch (error) {
    console.error("Error rsvping for event:", error.message);
  }
});

document
  .getElementById("rsvpForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formRsvpData = new FormData(this);

    fetch("https://alumni-nexus-api.vercel.app/api/rsvp/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formRsvpData)),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message === "fail") {
          console.log("Error:", data);
          alert(data.data.message);
        } else {
          alert("RSVP submitted successfully!");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
