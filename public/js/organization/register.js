
window.onload = () => {

  const form = document.getElementById("form");
  form.style.opacity = "1";
  form.style.marginBottom = "0";

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("password-confirm");
  const resInfoWrapper = document.getElementById("res-info-wrapper");
  const submitButton = document.getElementById("submit");

  submitButton.addEventListener("click", (event) => {

    if (email.value && password.value && confirmPassword.value && password.value == confirmPassword.value) {
      const domain = email.value.split("@")[1];

      if (!domain) {
        return resInfoWrapper.innerHTML = "Email format is not correct.";

      } else if (!domain.includes(".com") && !domain.includes(".tr") && !domain.includes(".net") && !domain.includes(".org") && !domain.includes(".k12")) {
        return resInfoWrapper.innerHTML = "Email format is not correct.";

      } else {

        const url = window.location.href.split("/organization")[0] + "/organization/register";

        serverRequest(url, "POST", {
          email: email.value,
          password: password.value
        }, (res) => {
          if (res.error) {
            resInfoWrapper.innerHTML = "Something went wrong. Please try again later."
          } else {
            window.location.href = "/organization";
          }
        })
      }
    } else {
      if (password.value == confirmPassword.value) {
        return resInfoWrapper.innerHTML = "Please fill all required fields";
      } else {
        return resInfoWrapper.innerHTML = "Password entries doesn't match";
      }
    }
  })
}
