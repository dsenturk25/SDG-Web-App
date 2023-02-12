
function clone(listToAppend, node) {
  const clonedNode = node.cloneNode(true);
  listToAppend.appendChild(clonedNode);
}


window.onload = () => {

  let clickCnt = -1;

  document.addEventListener("click", (event) => {
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
        console.log(clonedNode)
        innerMainWrapper.appendChild(clonedNode);
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
        innerMainWrapper.removeChild(clonedNode)
        clonedNode.style.opacity = 1;
        clonedNode = "";
      }
    }
  })

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
