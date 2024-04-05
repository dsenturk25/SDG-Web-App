
window.onload = () => {

  searchBar();
  signConditions();

  const logoutButton = document.getElementById("logout")
  logoutButton.addEventListener("click", () => {
    if (confirm("Do you confirm you want to log out?")) {
      serverRequest("/volunteer/logout", "POST", {}, (res) => {
        window.location.reload();
      })
    }
  })
}
