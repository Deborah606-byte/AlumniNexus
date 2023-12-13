const updateForm = document.getElementById("updateMemberForm");
const updateModel = document.getElementById("update-member-modal");

const updateButton = document.getElementById("updateMemberButton");
updateForm.addEventListener("submit", function (event) {
  event.preventDefault();

  updateButton.innerHTML = "Updating...";

  const updateMemberData = new FormData(this);
  console.log(updateMemberData);
  const memberId = updateForm.getAttribute("memberId");

  fetch(`http://localhost:8080/api/users/update/${memberId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(updateMemberData)),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data.message);
      alert("Member Updated Successfully!");
      updateButton.innerHTML = "Update Member";
      // document.getElementById("updateModal").classList.add("hidden");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error: Member update failed");
    });
});
