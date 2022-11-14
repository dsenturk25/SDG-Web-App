
window.onload = () => {
  const createButton = document.getElementById("create-button");
  const createForm = document.getElementById("create-form");
  const initialInnerHtml = createButton.innerHTML;
  const submitButton = document.getElementById("submit-button");

  const name = document.getElementById("name")
  const number = document.getElementById("number")
  const photo = document.getElementById("photo")

  let cnt = 0;
  createButton.addEventListener("click", (event) => {
    if (cnt % 2 == 0) {
      createButton.innerHTML = "Cancel";
      createForm.style.height = "350px";
    } else {
      createButton.innerHTML = initialInnerHtml;
      createForm.style.height = "0px";
    }
    cnt++;
  })

  submitButton.addEventListener("click", (event) => {
    if (name, number, photo) {

      const url = window.location.href.split("/admin")[0] + "/admin/sdg/create";

      serverRequest(url, "POST", {
        name: name.value,
        number: number.value,
        image: photo.value
      }, (res) => {
        if (res.error) {
          alert("error")
        } else {
          alert("success")
        }
      })
      
    } else {
      alert("Please fill all required fields.");
    }
  })
}
