
window.onload = () => {
  const waitlistButton = document.getElementById("waitlist");
  const volunteersButton = document.getElementById("volunteers");
  const sdgButton = document.getElementById("sdg");
  const organizationsButton = document.getElementById("organizations");
  const comparisonsButton = document.getElementById("comparisons");

  waitlistButton.addEventListener("click", (event) => {
    window.location.href = "/admin/waitlist";
  });

  volunteersButton.addEventListener("click", (event) => {
    window.location.href = "/admin/volunteer";
  });

  organizationsButton.addEventListener("click", (event) => {
    window.location.href = "/admin/organization";
  });

  sdgButton.addEventListener("click", (event) => {
    window.location.href = "/admin/sdg";
  });

  comparisonsButton.addEventListener("click", (event) => {
    window.location.href = "/admin/comparisons";
  })
}
