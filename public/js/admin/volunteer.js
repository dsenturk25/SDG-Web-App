
window.onload = () => {

  document.addEventListener("click", (event) => {

    if (event.target.innerHTML == "Delete") {

      if (confirm("Do you really want to DELETE the volunteer?")) {
        const id = event.target.parentNode.children[0].children[0].innerHTML;
        const url = window.location.href.split("/admin")[0] + "/admin/volunteer/delete";

        serverRequest(url, "POST", {_id: id}, (res) => {
          if (res.error){
            alert("An error occured on the server side. Please try again later.");
          } else {
            window.location.reload();
          }
        });
      } 
    }
  })
}
