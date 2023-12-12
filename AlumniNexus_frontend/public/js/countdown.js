// Set the target date to be 65 days from now
const currentDate = new Date();
const targetDate = new Date(
  currentDate.getTime() + 65 * 24 * 60 * 60 * 1000
).getTime();

function updateCountdown() {
  const currentDate = new Date().getTime();
  const timeDifference = targetDate - currentDate;

  const days = Math.max(Math.floor(timeDifference / (1000 * 60 * 60 * 24)), 0);
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Update the HTML elements with the countdown values
  document.querySelector(".days").innerText = days;
  document.querySelector(".hours").innerText = hours;
  document.querySelector(".minutes").innerText = minutes;
  document.querySelector(".seconds").innerText = seconds;
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Initial update to avoid delay in displaying countdown
updateCountdown();
