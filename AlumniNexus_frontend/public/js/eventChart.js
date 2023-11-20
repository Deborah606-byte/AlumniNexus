// Sample data for the pie chart
const eventCategories = ["Professional Development", "Networking", "Social"];
const eventsCount = [15, 10, 8];

// Get the canvas element
const chartCanvas = document
  .getElementById("eventCategoryChart")
  .getContext("2d");

// Create the pie chart
new Chart(chartCanvas, {
  type: "pie",
  data: {
    labels: eventCategories,
    datasets: [
      {
        data: eventsCount,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
