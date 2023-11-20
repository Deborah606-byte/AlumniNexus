let currentStory = 1; // Initial event

function showStory(storyNumber) {
  // Show all story
  const eventContainers = document.querySelectorAll(".story-container");
  eventContainers.forEach((container) => {
    container.classList.add("hidden");
  });

  // Show the selected event
  document.getElementById("story" + storyNumber).classList.remove("hidden");
}

function prevStory() {
  currentStory = Math.max(1, currentStory - 1);
  showStory(currentStory);
}

function nextStory() {
  const totalStorys = document.querySelectorAll(".story-container").length;
  currentStory = Math.min(totalStorys, currentStory + 1);
  showStory(currentStory);
}

// Show the initial story on page load
showStory(currentStory);
