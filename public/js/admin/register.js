
window.onload = () => {
  const submitButton = document.getElementById("submit-button");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const reRassword = document.getElementById("re-password");
  const rootAdminPassword = document.getElementById("root-password");
  const adminType = document.getElementById("admin-type");
  const nameSurname = document.getElementById("name-surname");

  const resTextWrapper = document.getElementById("res-text-wrapper");

  submitButton.addEventListener("click", (event) => {
    if (password.value && reRassword.value && password.value == reRassword.value) {

      if (email.value == null || password.value == null || reRassword.value == null || rootAdminPassword.value == null || nameSurname.value == null || adminType.value == null) {
        return resTextWrapper.innerHTML = "Please fill all of the required inputs."
      }

      const domain = email.value.split("@")[1]

      if (!domain.includes(".com") && !domain.includes(".tr") && !domain.includes(".net") && !domain.includes(".org") && !domain.includes(".k12")) {
        return resTextWrapper.innerHTML = "Email format is not correct."
      }

      const url = window.location.href.split("admin")[0] + "admin/authRegister";

      serverRequest(url, "POST", {
        email: email.value,
        password: password.value,
        root_admin_password: rootAdminPassword.value,
        name_surname: nameSurname.value,
        admin_type: adminType.value
      }, (res) => {
        if (res.error) {
          return resTextWrapper.innerHTML = "An error occured on the server side. Please try again later."
        } else {
          return window.location.href = "/admin";
        }
      })
    } else {
      return resTextWrapper.innerHTML = "Please fill all of the required inputs correctly."
    }
  })
}
