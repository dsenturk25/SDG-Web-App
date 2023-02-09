
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

}

function clone(listToAppend, node) {
  const clonedNode = node.cloneNode(true);
  listToAppend.appendChild(clonedNode);
}
