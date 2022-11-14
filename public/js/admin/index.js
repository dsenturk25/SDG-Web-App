
window.onload = () => {
  const waitlistButton = document.getElementById("waitlist");
  const volunteersButton = document.getElementById("volunteers");
  const sdgButton = document.getElementById("sdg");
  const organizationsButton = document.getElementById("organizations");
  const projectsButton = document.getElementById("projects");

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

  projectsButton.addEventListener("click", (event) => {
    window.location.href = "/admin/project";
  });

}
