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

export { getAllEvents };
