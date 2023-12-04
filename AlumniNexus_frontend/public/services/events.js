document
  .getElementById("event-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const eventData = new FormData(this);

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(eventData)),
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
        document.getElementById("event-modal").classList.add("hidden");
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert("Error: Event creation failed");
      });
  });
