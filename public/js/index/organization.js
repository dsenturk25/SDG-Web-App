
window.onload = () => {
  const organizationLikeButton = document.getElementById("organization-like-button");
  const organizationId = document.getElementById("organization-id");
  const likeStatus = document.getElementById("like-status")
  const volunteerId = document.getElementById("volunteer-id");

  document.addEventListener("click", (event) => {
    if (event.target == organizationLikeButton || event.target == organizationLikeButton.children[0]) {

      if (likeStatus.children[0].innerHTML == "true") {
        likeStatus.children[0].innerHTML = "false"
        organizationLikeButton.children[0].className = "fa-regular fa-heart";
        organizationLikeButton.children[0].style.color = "black";
      } else if (likeStatus.children[0].innerHTML == "false") {
        likeStatus.children[0].innerHTML = "true"
        organizationLikeButton.children[0].className = "fa-solid fa-heart";
        organizationLikeButton.children[0].style.color = "red";
      }

      const url = window.location.href.split("?")[0] + `/like`;

      serverRequest(url, "POST", {
        volunteerId: volunteerId.innerHTML,
        organizationId: organizationId.innerHTML,
        likeStatus: likeStatus.children[0].innerHTML == "true" ? true : false
      }, (res) => {
        ;
      })
    }
  })
}
