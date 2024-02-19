
window.onload = () => {

  let focusedInput;
  const confirmationCodeInputsArray = document.getElementsByClassName("each-confirmation-input");
  const resInfoWrapper = document.getElementById("res-info-wrapper");
  const resendCodeButton = document.getElementById("resend-code-button");

  document.addEventListener("focusin", (event) => {
    focusedInput = event.target;
  })

  document.addEventListener("click", (event) => {
    if (event.target == resendCodeButton) {

      resendCodeButton.disabled = true;
      resendCodeButton.style.background = "#ccc";
      resendCodeButton.style.cursor = "default";

      const url = window.location.href.split("/volunteer")[0] + "/volunteer/auth/resend_code";

      serverRequest(url, "POST", {
        _id: ""
      }, (res) => {
        if (res.error) {
          resInfoWrapper.style.color = "red";
          return resInfoWrapper.innerHTML = "An error occured in the server side. Please try again later.";
        }
        else {
          resInfoWrapper.style.color = "green";
          resInfoWrapper.innerHTML = "We've send the new code. Please check your email.";
        }
      })
    }
  })

  document.addEventListener("keydown", (event) => {
    if (event.keyCode == 37) {
      if (focusedInput.previousSibling) {
        focusedInput.previousSibling.focus();
      }
    } else if (event.keyCode == 39) {
      if (focusedInput.nextSibling) {
        focusedInput.nextSibling.focus();
      }
    }
  })

  document.addEventListener("keyup", (event) => {
    if (event.target.className == "each-confirmation-input" && event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39) {
      if (event.target.nextSibling) {
        event.target.nextSibling.focus();
      }
    } else if (event.keyCode == 8 && event.target.className == "each-confirmation-input") {
      if (event.target.previousSibling) {
        event.target.innerHTML = "";
        event.target.previousSibling.focus();
      }
    }
    let flag = 1;
    for (let i = 0; i < confirmationCodeInputsArray.length; i++) {
      const element = confirmationCodeInputsArray[i];
      if (element.value == "") {
        flag = 0;
        break;
      }
    }

    if (flag == 1) {
      const url = window.location.href.split("/volunteer")[0] + "/volunteer/auth/email_confirm";
      let confirmationCode = "";

      for (let i = 0; i < confirmationCodeInputsArray.length; i++) {
        const element = confirmationCodeInputsArray[i];
        confirmationCode += element.value;
      }

      serverRequest(url, "POST", {
        _id: "",
        confirmation_code: confirmationCode
      }, (res) => {

        if (res.error) {
          resInfoWrapper.style.color = "red";
          return resInfoWrapper.innerHTML = "The code you've entered appears to be incorrect. Please try again";
        }
        else return window.location.href = "/volunteer/complete_account";
      })
    }
  })
}
