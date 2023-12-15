document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("alumni")) || null;
  const protectedRoutes = [
    "/dashboard",
    "/admin",
    "/events",
    "/details",
    "/opportunity",
    "/stories",
    "/rsvp",
    "/jobdetails",
  ];

  if (!currentUser) {
    // Save the current route in local storage
    localStorage.setItem("redirectPath", window.location.pathname);
    // Redirect only if not already on the login page
    if (window.location.pathname !== "/auth/login") {
      window.location.href = "/auth/login";
    }
  } else {
    // Check if the user is already on the home page to avoid unnecessary redirects
    if (window.location.pathname !== "/home") {
      fetch(
        `https://alumni-nexus-api.vercel.app/api/users/me/${currentUser.token}`,
        {
          method: "GET",
        }
      )
        .then(async (response) => {
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data.message);
          // Get the saved redirect path from local storage
          let redirectPath = localStorage.getItem("redirectPath") || "/home";
          // Clear the saved redirect path from local storage
          localStorage.removeItem("redirectPath");
          // Check if the path is in the protected routes
          const isProtectedRoute = protectedRoutes.some((route) =>
            window.location.pathname.startsWith(route)
          );

          // Redirect to the saved path if not a protected route
          if (!isProtectedRoute) {
            window.location.href = redirectPath;
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
          // Handle errors as needed
        });
    }
  }
});
