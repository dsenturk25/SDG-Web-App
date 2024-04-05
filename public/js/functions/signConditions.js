
function signConditions() {
  const signConditionsButton = document.getElementById("sign-conditions-sign-button");

  if (signConditionsButton) {
    signConditionsButton.addEventListener("click", (event) => {

      const url = "/volunteer/update/terms-and-conditions";

      serverRequest(url, "POST", {}, (res) => {
        if (res) {
          window.location.reload();
        }
      })
    })
  }
}
