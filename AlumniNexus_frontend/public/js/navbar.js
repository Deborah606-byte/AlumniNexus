// Add JavaScript to handle dropdown toggle
document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("alumni")) || null;
  if (currentUser) {
    const alumniDashboard = document.getElementById("dashboard-link");
    console.log(currentUser);
    alumniDashboard.addEventListener("click", function () {
      if (currentUser.user.role == "alumni") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/admin";
      }
    });
  } else {
    // Show a popup message
    // alert("Please login!.");
    // window.location.href = "/auth/login";
  }
});

function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("hidden");
}
