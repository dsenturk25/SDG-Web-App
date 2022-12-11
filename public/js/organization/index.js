
window.onload = () => {

  const sideBar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");
  const createProjectWrapper = document.getElementById("create-project-wrapper");

  document.addEventListener("mouseover", (event) => {
    if (event.target.parentNode.className == "each-side-bar-icon") {
      sideBar.style.width = "15%";
      mainContent.style.width = "85%";
      setTimeout(() => {
        event.target.parentNode.children[1].style.display = "flex";
      }, 300);
    } else {
      for (let i = 0; i < sideBar.children.length; i++) {
        const eachSideBarIcon = sideBar.children[i];
        eachSideBarIcon.children[1].style.display = "none";
        sideBar.style.width = "5%";
        mainContent.style.width = "calc(95% - 100px)";
      }
    }
  })

  document.addEventListener("click", (event) => {

    if (event.target.parentNode.id == "create") {
      createProjectWrapper.style.display = "block";
    }
    if (event.target.className == "close-window-button" || event.target.className == "fa-solid fa-close") {
      createProjectWrapper.style.display = "none";
    }
  })
}
