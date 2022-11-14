
window.onload = () => {
  const submitButton = document.getElementById("submit-button");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const resTextWrapper = document.getElementById("res-text-wrapper");

  submitButton.addEventListener("click", (event) => {

    if (email.value == null || password.value == null) {
      return resTextWrapper.innerHTML = "Please fill all of the required inputs."
    }

    const domain = email.value.split("@")[1]

    if (!email.value.includes("@") || !domain.includes(".com") && !domain.includes(".tr") && !domain.includes(".net") && !domain.includes(".org") && !domain.includes(".k12")) {
      return resTextWrapper.innerHTML = "Email format is not correct."
    }

    const url = window.location.href.split("admin")[0] + "admin/authLogin";

    serverRequest(url, "POST", {
      email: email.value,
      password: password.value,
    }, (res) => {
      if (res.error) {
        return resTextWrapper.innerHTML = "Incorrect email or password. Please try again."
      } else {
        return window.location.href = "/admin";
      }
    })
    
  })

}
