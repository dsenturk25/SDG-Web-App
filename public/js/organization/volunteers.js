
window.onload = () => {

  const organizationId = document.getElementById("organization-id");

  document.addEventListener("click", (event) => {

    if (event.target.innerHTML == "Remove") {
      
      const url = window.location.href.split("/organization")[0] + "/organization/volunteers/remove";

      serverRequest(url, "POST", {
        volunteer_id: event.target.parentNode.children[0].innerHTML,
        organization_id: organizationId.innerHTML
      }, (res) => {
        if (res.error) {
          return alert("error");
        } else {
          return console.log(res);
        }
      })
    }
  })
}
