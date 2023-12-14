const deleteForm = document.getElementById("delete-member");
const deleteModel = document.getElementById("delete-member-modal");
deleteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const memberId = deleteForm.getAttribute("memberId");

  fetch(`http://localhost:8080/api/users/delete/${memberId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data.message);
      alert("Member Deleted Successfully!");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert("Error: Member delete failed");
    });
});