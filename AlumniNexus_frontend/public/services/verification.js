document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("alumni")) || null;
  if (currentUser) {
    fetch(`http://localhost:8080/api/users/me/${currentUser?.token}`, {
      method: "GET",
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.data.message);
        }
      })
      .then((data) => {
        window.location.href = "/home";
        console.log("Success:", data.message);
      })
      .catch((error) => {
        alert(error.message);
        window.location.href = "/auth/login";
        console.error("Error:", error.message);
      });
  } else {
    // Show a popup message
    // alert("Please login!.");
    window.location.href = "/auth/login";
  }
});
