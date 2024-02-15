
function clone(listToAppend, node) {
  const clonedNode = node.cloneNode(true);
  listToAppend.appendChild(clonedNode);
}


window.onload = () => {

  searchBar();

  const volunteerId = document.getElementById("volunteer-id").innerHTML;
  const projectId = document.getElementById("project-id").innerHTML;

  let clickCnt = -1;

  document.addEventListener("click", (event) => {

    if (event.target.innerHTML == "Join the project") {
      const url = "/volunteer/project/join";
      serverRequest(url, "POST", {
        volunteer_id: volunteerId,
        project_id: projectId
      }, (res) => {
        if (!res.success && res.error) {
          alert("An error occured please try again later");
        } else {
          window.location.reload()
        }
      })
    }

    if (event.target.innerHTML == "You are a participant. Click to view your projects.") {
      window.location.href = "/my-projects";
    }

    if (event.target.innerHTML == "Exit project") {
      if (confirm("Do you confirm that you want to exit the project?")) {
        const url = "/volunteer/project/exit";
        serverRequest(url, "POST", {
          volunteer_id: volunteerId,
          project_id: projectId
        }, (res) => {
          if (!res.success && res.error) {
            alert("An error occured please try again later");
          } else {
            window.location.reload()
          }
        })
      }
    }

    if (event.target.classList.contains("next")) {
      clickCnt++;

      const left = window.getComputedStyle(event.target.parentNode.children[2]).getPropertyValue("left");
      event.target.parentNode.children[2].style.left = parseInt(left.split("px")[0]) - 300 + "px";
      event.target.parentNode.children[2].style.left = (event.target.parentNode.children[2].children.length * 300);
      clone(event.target.parentNode.children[2], event.target.parentNode.children[2].children[clickCnt])
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

  const datesWrapper = document.getElementById("project-dates-wrapper");

  makeDatesPrettier(datesWrapper);

  const sessionDates = document.getElementsByClassName("session_date");
  for (let i = 0; i < sessionDates.length; i++) {
    const dateWrapper = sessionDates[i];
    makeDatesPrettier(dateWrapper);
  }

  const innerMainWrapper = document.getElementById("inner-main-wrapper");
  const projectMainTitleWrapper = document.getElementById("project-image-title-button-main-wrapper");
  let clonedNode = "";

  innerMainWrapper.addEventListener("scroll", () => {

    if (innerMainWrapper.scrollTop >= projectMainTitleWrapper.offsetHeight + 30) {
      if (!clonedNode) {
        clonedNode = projectMainTitleWrapper.cloneNode(true);
        
        innerMainWrapper.appendChild(clonedNode);
        if (document.getElementsByClassName("project-exit-button-div").length > 0) {
          document.getElementsByClassName("project-exit-button-div")[2].style.fontSize = "14px";
          document.getElementsByClassName("project-exit-button-div")[2].innerHTML = "My Projects";
          document.getElementsByClassName("project-exit-button-div")[3].style.fontSize = "14px";
        }
        document.getElementsByClassName("project-image-content")[1].style.height = "55%";
        clonedNode.classList.add("scrolled-project-image-title-button")
        clonedNode.classList.remove("project-image-title-button-main-wrapper")
        clonedNode.id = "";
        const projectDescriptionTextsWrapper = document.getElementsByClassName("project-descriptions-texts-wrapper")[1];
        projectDescriptionTextsWrapper.style.display = "flex";
        setInterval(() => {
          clonedNode.style.opacity = 1;
        }, 50)
      }
    }
    else if (innerMainWrapper.scrollTop < projectMainTitleWrapper.offsetHeight + 30) {
      if (clonedNode) {
        if (document.getElementsByClassName("project-exit-button-div").length > 0) {
          document.getElementsByClassName("project-exit-button-div")[0].style.fontSize = "16px";
          document.getElementsByClassName("project-exit-button-div")[1].style.fontSize = "16px";  
        }
        document.getElementsByClassName("project-image-content")[0].style.height = "max-content";
        innerMainWrapper.removeChild(clonedNode)
        clonedNode.style.opacity = 1;
        clonedNode = "";
      }
    }
  })


  const projectAddToFavoritesButton = document.getElementById("project-add-to-favorites-button");
  const likeStatus = document.getElementById("like-status");

  document.addEventListener("click", (event) => {
    if (event.target.id == "project-add-to-favorites-button" || event.target.parentNode.id == "project-add-to-favorites-button") {
      if (likeStatus.children[0].innerHTML == "true") {
        likeStatus.children[0].innerHTML = "false"
        projectAddToFavoritesButton.children[1].className = "fa-regular fa-heart";
        projectAddToFavoritesButton.children[1].style.color = "white";
      } else if (likeStatus.children[0].innerHTML == "false") {
        likeStatus.children[0].innerHTML = "true"
        projectAddToFavoritesButton.children[1].className = "fa-solid fa-heart";
        projectAddToFavoritesButton.children[1].style.color = "red";
      }

      const url = window.location.href.split("?")[0] + `/like`;

      serverRequest(url, "POST", {
        volunteerId: volunteerId,
        projectId: projectId,
        likeStatus: likeStatus.children[0].innerHTML == "true" ? true : false
      }, (res) => {
        ;
      })
    }
  })


  const sessionLatitudeContentArray = document.getElementsByClassName("session-latitude");
  const sessionLongitudeContentArray = document.getElementsByClassName("session-longitude");
  const sessionLocationContentArray = document.getElementsByClassName("session-location-content");

  for (let i = 0; i < sessionLocationContentArray.length; i++) {
    const eachSessionLocationContent = sessionLocationContentArray[i];
    const eachSessionLatitude = sessionLatitudeContentArray[i];
    const eachSessionLongitude = sessionLongitudeContentArray[i];
  
    console.log(eachSessionLatitude.innerHTML)
    const map = document.createElement("div");
    map.id = `map-${i}`;
    map.classList.add("map");

    const lat = parseInt(eachSessionLatitude.innerHTML);
    const long = parseInt(eachSessionLongitude.innerHTML);
    if (Math.abs(lat) > 0 && Math.abs(long) > 0) {
      eachSessionLocationContent.appendChild(map);
      createMap(lat, long, i)
    }
  }
}

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function makeDatesPrettier(datesWrapper) {
  let date = "";

  for (let i = 0; i < datesWrapper.innerHTML.split("/").length; i++) {
    const element = datesWrapper.innerHTML.split("/")[i].trim();

    const date_day = element.split("-")[2];
    const date_month = month[parseInt(element.split("-")[1]) - 1];
    const date_year = element.split("-")[0];

    if (datesWrapper.innerHTML.split("/").length == 2) {
      if (i == 0) {
        date += `${date_day} ${date_month} ${date_year} - `;
      } else {
        date += `${date_day} ${date_month} ${date_year}`;
      }
    } else {
      date += `${date_day} ${date_month} ${date_year}`
    }
  }

  datesWrapper.innerHTML = date;
  datesWrapper.style.display = "flex";
  datesWrapper.style.opacity = "1";
}

function createMap(latitude, longitude, sessionIdx) {
  const map = L.map(`map-${sessionIdx}`).setView([latitude, longitude], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
  }).addTo(map);

  L.marker([latitude, longitude], { draggable: true }).addTo(map);
}

