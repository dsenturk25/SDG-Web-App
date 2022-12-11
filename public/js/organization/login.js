
window.onload = () => {

  const form = document.getElementById("form");
  form.style.opacity = "1";
  form.style.marginBottom = "0";

  const submitButton = document.getElementById("submit");

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const resInfoWrapper = document.getElementById("res-info-wrapper");

  submitButton.addEventListener("click", (event) => {

    const url = window.location.href.split("/organization")[0] + "/organization/login";

    serverRequest(url, "POST", {
      email: email.value,
      password: password.value
    }, (res) => {
      if (res.error) {
        resInfoWrapper.innerHTML = "Email or password is incorrect."
      } else {
        window.location.href = "/organization";
      }
    })
  })
}
