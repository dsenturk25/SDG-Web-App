
window.onload = () => {
  const waitlistButton = document.getElementById("waitlist");
  const volunteersButton = document.getElementById("volunteers");
  const sdgButton = document.getElementById("sdg");
  const organizationsButton = document.getElementById("organizations");
  const comparisonsButton = document.getElementById("comparisons");
  const learnButton = document.getElementById("learn");
  const todaysPicksButton = document.getElementById("todays-picks");
  const activistsButton = document.getElementById("activists");
  const skillsButton = document.getElementById("skills");

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

  learnButton.addEventListener("click", (event) => {
    window.location.href = "/admin/learn";
  })

  todaysPicksButton.addEventListener("click", (event) => {
    window.location.href = "/admin/todays-picks";
  })

  activistsButton.addEventListener("click", (event) => {
    window.location.href = "/admin/activists";
  })

  skillsButton.addEventListener("click", (event) => {
    window.location.href = "/admin/skills";
  })
}
