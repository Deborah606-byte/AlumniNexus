// Sample data for the pie chart
const graduationYears = ["2010", "2011", "2012", "2013", "2014"];
const membersCount = [15, 20, 18, 25, 22];

// Get the canvas element
const chartCanvas = document.getElementById("graduationChart").getContext("2d");

// Create the pie chart
new Chart(chartCanvas, {
  type: "pie",
  data: {
    labels: graduationYears,
    datasets: [
      {
        data: membersCount,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
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
