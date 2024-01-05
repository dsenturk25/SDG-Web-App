
window.onload = () => {

  const volunteerId = document.getElementById("volunteer-id").innerHTML;

  searchBar();
  handleHeaderMenu();

  let clickCnt = -1;

  var arrLoading = document.getElementsByClassName("loading");
  var arrImageContent = document.getElementsByClassName("card-image-content-opacity");


  while (arrLoading.length) {
    arrLoading[0].classList.remove("loading");
  }

  while (arrImageContent.length) {
    arrImageContent[0].classList.remove("card-image-content-opacity");
  }


  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("next")) {
      if (event.target.nextSibling.offsetWidth > event.target.parentNode.offsetWidth) {
        clickCnt++;

        const left = window.getComputedStyle(event.target.parentNode.children[2]).getPropertyValue("left");
        event.target.parentNode.children[2].style.left = parseInt(left.split("px")[0]) - 300 + "px";
        event.target.parentNode.children[2].style.left = (event.target.parentNode.children[2].children.length * 300);
        clone(event.target.parentNode.children[2], event.target.parentNode.children[2].children[clickCnt])
      }
    }
    else if (event.target.classList.contains("prev")) {
      if (clickCnt > -1) {
        clickCnt--;
      }
      const left = window.getComputedStyle(event.target.parentNode.children[2]).getPropertyValue("left");
      if (parseInt(left) <= -100) {
        event.target.parentNode.children[2].style.left = parseInt(left.split("px")[0]) + 300 + "px";
      } else {
        event.target.parentNode.children[2].style.left = 0;
      }
    } else if (event.target.classList[0] == "cards") {
      window.location.href = `/project?_id=${event.target.children[0].innerHTML}`
    } else if (event.target.classList[0] == "card-property") {
      window.location.href = `/project?_id=${event.target.parentNode.children[0].innerHTML}`
    } else if (event.target.classList[0] == "card-image-content") {
      window.location.href = `/project?_id=${event.target.parentNode.parentNode.children[0].innerHTML}`
    }
  })

  const featuredProjectsContent = document.getElementById("featured-projects-content");
  const featuredInnerWrapper = document.getElementById("featured-inner-wrapper");

  let featuredContentInterval;
  let viewProgressBarInterval;

  document.addEventListener("mouseover", (event) => {
    clearInterval(featuredContentInterval);
    clearInterval(viewProgressBarInterval);
    if (event.target.parentNode.parentNode == featuredInnerWrapper.children[0] || event.target.parentNode.parentNode.parentNode == featuredInnerWrapper.children[1]) {
      if (event.target.parentNode.parentNode == featuredInnerWrapper.children[0]) {
        featuredInnerWrapper.style.left = "0"
      } else {
        featuredInnerWrapper.style.left = "-50%"
      }
    } else {
      let featuredCnt = 0, viewProgressBar;
      viewProgressBarInterval = setTimeout(() => {
        viewProgressBar = document.getElementById("view-time-progress-bar");
        if (featuredCnt % 2 == 0) {
          viewProgressBar.children[0].style.width = "100%"
        } else {
          viewProgressBar.children[0].style.width = "0%"
        }
      }, 1)
      featuredContentInterval = setInterval(() => {
        if (featuredCnt % 2 == 0) {
          featuredInnerWrapper.style.left = "-50%"
          viewProgressBar.children[0].style.width = "100%"
          featuredCnt++;
        } else {
          featuredInnerWrapper.style.left = "0%"
          viewProgressBar.children[0].style.width = "0"
          featuredCnt++;
        }
      }, 5000)
    }
  })


  const organizationDescriptions = document.getElementsByClassName("organization-content-organization-description");

  for (let i = 0; i < organizationDescriptions.length; i++) {
    const descriptions = organizationDescriptions[i];
    descriptions.innerHTML = descriptions.innerHTML.slice(0, 200) + "...";
  }

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("project-thumbnail-add-to-favorites-button")) {
      if (event.target.previousSibling.children[0].innerHTML == "true") {
        event.target.previousSibling.children[0].innerHTML = "false"
        event.target.children[0].className = "fa-regular fa-heart";
        event.target.children[0].style.color = "white";
      } else if (event.target.previousSibling.children[0].innerHTML == "false") {
        event.target.previousSibling.children[0].innerHTML = "true"
        event.target.children[0].className = "fa-solid fa-heart";
        event.target.children[0].style.color = "red";
      }

      const projectId = event.target.previousSibling.previousSibling.previousSibling.innerHTML;
      const url = window.location.href + `project/like`;

      serverRequest(url, "POST", {
        volunteerId: volunteerId,
        projectId: projectId,
        likeStatus: event.target.previousSibling.children[0].innerHTML == "true" ? true : false
      }, (res) => {
        ;
      })
    } else if (event.target.parentNode.classList.contains("project-thumbnail-add-to-favorites-button")) {
      if (event.target.parentNode.previousSibling.children[0].innerHTML == "true") {
        event.target.parentNode.previousSibling.children[0].innerHTML = "false"
        event.target.parentNode.children[0].className = "fa-regular fa-heart";
        event.target.parentNode.children[0].style.color = "white";
      } else if (event.target.parentNode.previousSibling.children[0].innerHTML == "false") {
        event.target.parentNode.previousSibling.children[0].innerHTML = "true"
        event.target.parentNode.children[0].className = "fa-solid fa-heart";
        event.target.parentNode.children[0].style.color = "red";
      }

      const projectId = event.target.parentNode.previousSibling.previousSibling.previousSibling.innerHTML;
      const url = window.location.href + `project/like`;

      serverRequest(url, "POST", {
        volunteerId: volunteerId,
        projectId: projectId,
        likeStatus: event.target.parentNode.previousSibling.children[0].innerHTML == "true" ? true : false
      }, (res) => {
        ;
      })
    }
  })
}

function clone(listToAppend, node) {
  const clonedNode = node.cloneNode(true);
  listToAppend.appendChild(clonedNode);
}
