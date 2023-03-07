
window.onload = () => {

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

  const searchInput = document.getElementById("search");
  const searchRes = document.getElementById("search-res");
  const noResInitialInnerHtml = searchRes.innerHTML;
  searchInput.addEventListener("focusin", () => {
    searchRes.style.display = "flex";
  })
  document.addEventListener("click", (event) => {
    if (event.target.id != "search-res" && event.target.parentNode.id != "search-res" && event.target.id != "search") {
      searchRes.style.display = "none";
    }
  })
  searchInput.addEventListener("keyup", () => {
    const url = "/search-query";
    serverRequest(url, "POST", {
      query: searchInput.value
    }, res => {
      if (res.success && !res.error) {
        if (res.data == []) {
          searchRes.innerHTML = "";
          searchRes.innerHTML = noResInitialInnerHtml;
        } else {
          searchRes.innerHTML = "";
          res.data.forEach(project => {
            const eachResultProject = document.createElement("a");
            eachResultProject.href = `/project?_id=${project._id}`;
            eachResultProject.classList.add("each-result-project");

            const eachResultProjectImage = document.createElement("div");
            eachResultProjectImage.classList.add("each-result-project-img");
            const projectImg = document.createElement("img");

            let binary = '';
            project.photo.data.forEach((byte) => binary += String.fromCharCode(byte));
            const photo = btoa(binary);

            projectImg.src = `data:image/png;base64,${photo}`;
            eachResultProjectImage.appendChild(projectImg);
            eachResultProject.appendChild(eachResultProjectImage);

            const eachResultProjectTexts = document.createElement("div");
            eachResultProjectTexts.classList.add("each-result-project-texts");
            eachResultProject.appendChild(eachResultProjectTexts);

            const eachProjectName = document.createElement("div");
            eachProjectName.classList.add("each-result-name");
            eachProjectName.innerHTML = project.name;

            const eachProjectCreatorName = document.createElement("div");
            eachProjectCreatorName.classList.add("each-result-creator-name");
            eachProjectCreatorName.innerHTML = project.creator_name;

            eachResultProjectTexts.appendChild(eachProjectName);
            eachResultProjectTexts.appendChild(eachProjectCreatorName);

            searchRes.appendChild(eachResultProject);
          });
        }
      } else {
        searchRes.innerHTML = "";
        searchRes.innerHTML = noResInitialInnerHtml;
      }
    })
  })
}

function clone(listToAppend, node) {
  const clonedNode = node.cloneNode(true);
  listToAppend.appendChild(clonedNode);
}
