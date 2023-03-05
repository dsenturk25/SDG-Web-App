window.onload = () => {
  var input = document.getElementById("phone"),
    form = document.querySelector("form");

  intlTelInput(input, {
    initialCountry: "tr"
  });

  const organizationType = document.getElementById("organization_type");
  const associatedSchoolInput = document.getElementById("associated_school");

  associatedSchoolInput.disabled = true;

  document.addEventListener("change", (event) => {
    console.log(organizationType.value)
    if (organizationType.value == "school_based") {
      associatedSchoolInput.disabled = false;
      associatedSchoolInput.required = true;
    } else {
      associatedSchoolInput.disabled = true;
      associatedSchoolInput.required = false;
    }
  })

}