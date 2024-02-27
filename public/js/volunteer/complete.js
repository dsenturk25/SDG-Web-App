window.onload = () => {
  var input = document.getElementById("phone"),
    form = document.querySelector("form");

  intlTelInput(input, {
    initialCountry: "tr"
  });


  const expandSkillsButton = document.getElementById("expand-skills-button");
  const selectSkillGroup = document.getElementById("profile-edit-skill-group");

  let clickCnt = 0;

  expandSkillsButton.addEventListener("click", (err) => {
    if (clickCnt % 2 == 0) {
      selectSkillGroup.style.height = "200px";
      setTimeout(() => {
        selectSkillGroup.style.height = "fit-content";
      }, 500);
    } else {
      selectSkillGroup.style.height = "200px";
      setTimeout(() => {
        selectSkillGroup.style.height = "75px";
      }, 500);
    }
    clickCnt++;
  })
}