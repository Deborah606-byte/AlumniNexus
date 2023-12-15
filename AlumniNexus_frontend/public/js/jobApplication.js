document.addEventListener("DOMContentLoaded", () => {
  const applicationForm = document.getElementById("application-form");
  const applicationInfo = document.getElementById("apply");

  applicationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    applicationInfo.classList.remove("hidden");
    applicationForm.reset();
    setTimeout(() => {
      applicationInfo.classList.add("hidden");
    }, 3000);
  });
});
