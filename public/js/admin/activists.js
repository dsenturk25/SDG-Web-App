
window.onload = () => {
    document.addEventListener("change", (event) => {
        if (event.target.classList.contains("each-activist-checkbox")) {
            
            const projectId = event.target.parentNode.children[0].children[0].innerHTML;
            const status = event.target.checked;
            
            const url = window.location.href.split("/admin")[0] + "/admin/activists/edit";
            serverRequest(url, "POST", {
                _id: projectId,
                status: status
            }, (res) => {
                if (!res.success) {
                    alert("An error occured please try again");
                }
            })
        }
    })
}
