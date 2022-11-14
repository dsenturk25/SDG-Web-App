
window.onload = () => {

  document.addEventListener("click", (event) => {
    
    if (event.target.innerHTML == "Accept Organization") {
      const id = event.target.parentNode.children[0].children[0].children[1].innerHTML;

      const url = window.location.href.split("/admin")[0] + "/admin/organization/waitlist"

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
  })  
}
