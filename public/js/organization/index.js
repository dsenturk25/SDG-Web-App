
window.onload = () => {

  const createProjectWrapper = document.getElementById("create-project-wrapper");
  const projectMoreInfoWrappers = document.getElementsByClassName("each-project-more-info-wrapper");

  document.addEventListener("click", (event) => {

    console.log(event.target)

    if (event.target.parentNode.id == "create") {
      createProjectWrapper.style.display = "block";
    }
    if (event.target.className == "close-window-button" || event.target.className == "fa-solid fa-close") {
      createProjectWrapper.style.display = "none";
      for (let i = 0; i < projectMoreInfoWrappers.length; i++) {
        const element = projectMoreInfoWrappers[i];
        element.style.display = "none";
      }
    }
    if (event.target.className == "each-project-image") {
      event.target.parentNode.parentNode.childNodes[1].style.display = "block"
    }
  })
}
