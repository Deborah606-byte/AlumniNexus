document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("alumni")) || null;
  if (currentUser) {
    window.location.href = "/home";
  }
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const loginData = new FormData(this);

      fetch("https://alumni-nexus-api.vercel.app/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(loginData)),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);

          localStorage.setItem("alumni", JSON.stringify(data.data));

          // Show a popup message
          alert("Login successful! Welcome.");

          const redirectPath = localStorage.getItem("redirectPath") || "/home";
          // Redirect to the saved path
          window.location.href = redirectPath || "/home";
        })
        .catch((error) => {
          console.error("Error:", error);

          // Show a popup message for login failure
          alert("Invalid email or password. Please try again.");
        });
    });
});
