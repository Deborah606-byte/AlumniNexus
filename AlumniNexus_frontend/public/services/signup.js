document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch("https://alumni-nexus-api.vercel.app/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message == "fail") {
          console.log("Error:", data);
          alert(data.data.message);
        } else {
          // Show a success message
          alert("Signup successful! Please log in.");
          // Redirect to the login page
          window.location.href = "/auth/login";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
