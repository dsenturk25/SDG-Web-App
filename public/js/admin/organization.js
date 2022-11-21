
window.onload = () => {

  const seeProjectsButton = document.getElementById("see-projects-button");
  const projects = document.querySelector("projects-content");

  let cnt = 0;

  seeProjectsButton.addEventListener("click", (event) => {
    if (cnt % 2 == 0) {
      seeProjectsButton.innerHTML = "Less info";
      event.target.parentNode.parentNode.parentNode.style.height = "300px";
    } else {
      seeProjectsButton.innerHTML = "More info";
      event.target.parentNode.parentNode.parentNode.style.height = "50px";
    }
    cnt++;
  })

  document.addEventListener("click", (event) => {
    if (event.target.innerHTML == "Delete") {
      
      const flag = confirm("Do you really want to DELETE the organization?");

      if (flag) {
        const id = event.target.parentNode.children[0].children[0].children[1].innerHTML;

        const url = window.location.href.split("/admin")[0] + "/admin/organization/delete";

        serverRequest(url, "POST", {
          _id: id
        }, (res) => {
          if (res.error) {
            alert("An error occured. Please try again.");
          } else {
            window.location.reload();
          }
        })
      }
    } else if (event.target.innerHTML == "See details") {
      const contents = document.getElementsByClassName("each-organization-project-more-content");

      for (let int = 0; int < contents.length; int++) {
        const element = contents[int];
        element.style.display = "none";
      }

      const moreInfoSection = event.target.parentNode.parentNode.children[1];
      moreInfoSection.style.display = "flex";
      window.getComputedStyle(moreInfoSection).opacity;
      moreInfoSection.style.opacity = 1;

    } else if (event.target.innerHTML == "Close") {
      const moreInfoSection = event.target.parentNode;
      window.getComputedStyle(moreInfoSection).opacity;
      moreInfoSection.style.opacity = 0;
      moreInfoSection.style.display = "none";
    }
  })
}
