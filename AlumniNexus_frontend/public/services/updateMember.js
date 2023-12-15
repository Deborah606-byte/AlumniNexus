const updateMemberForm = document.getElementById("updateMemberForm");
const updateMemberModal = document.getElementById("update-member-modal");

const updateMemberButton = document.getElementById("updateMemberButton");
updateMemberForm.addEventListener("submit", function (event) {
  event.preventDefault();

  updateMemberButton.innerHTML = "Updating...";

  const updateMemberData = new FormData(this);
  console.log(updateMemberData);
  const memberId = updateMemberForm.getAttribute("memberId");

  fetch(`https://alumni-nexus-api.vercel.app/api/users/update/${memberId}`, {
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
      updateMemberButton.innerHTML = "Update Member";
      // document.getElementById("updateModal").classList.add("hidden");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error: Member update failed");
    });
});
