
window.onload = () => {

  const createButton = document.getElementById("create-button");
  const createForm = document.getElementById("create-form");
  const initialInnerHtml = createButton.innerHTML;

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

}
