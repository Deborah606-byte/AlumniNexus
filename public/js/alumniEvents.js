function searchEvents() {
  // Get the selected category value
  const selectedCategory = document.getElementById("categorySelect").value;

  // Get all event cards
  const eventCards = document.querySelectorAll(".card");

  // Loop through each card and show/hide based on the selected category
  eventCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");

    // If the selected category is "all" or the card belongs to the selected category, show it; otherwise, hide it
    if (selectedCategory === "all" || cardCategory === selectedCategory) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const loadMoreLink = document.querySelector(".load-more-link");
  const hiddenGrid = document.querySelector(".hidden-grid");

  loadMoreLink.addEventListener("click", function () {
    // Toggle visibility of the hidden grid
    hiddenGrid.classList.toggle("hidden");

    // Change the text of the "Load more" link based on its visibility
    const isVisible = !hiddenGrid.classList.contains("hidden");
    loadMoreLink.textContent = isVisible ? "Load less" : "Load more";
  });
});
