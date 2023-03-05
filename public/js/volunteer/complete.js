window.onload = () => {
  var input = document.getElementById("phone"),
    form = document.querySelector("form");

  intlTelInput(input, {
    initialCountry: "tr"
  });

}