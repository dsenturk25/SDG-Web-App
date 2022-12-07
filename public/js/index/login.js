
window.onload = () => {

  const submitButton = document.getElementById("submit");

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const resInfoWrapper = document.getElementById("res-info-wrapper");

  submitButton.addEventListener("click", (event) => {

    const url = window.location.href.split("/login")[0] + "/volunteer/login";

    serverRequest(url, "POST", {
      email: email.value,
      password: password.value
    }, (res) => {
      if (res.error) {
        resInfoWrapper.innerHTML = "Email or password is incorrect."
      } else {
        alert("Success madıfakı")
      }
    })
  })
}
