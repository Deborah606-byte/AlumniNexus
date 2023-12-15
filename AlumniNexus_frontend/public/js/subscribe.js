document.addEventListener("DOMContentLoaded", () => {
  const subscribeForm = document.getElementById("subscribe-form");
  const subscribeInfo = document.getElementById("subscribe");

  subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    subscribeInfo.classList.remove("hidden");
    subscribeForm.reset();
    setTimeout(() => {
      subscribeInfo.classList.add("hidden");
    }, 3000);
  });
});
