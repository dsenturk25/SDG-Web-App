
window.onload = () => {

  searchBar();
  signConditions();

  const editGoalButton = document.getElementById("edit-goal-button");

  editGoalButton.addEventListener("click", (event) => {

    editGoalButton.disabled = true;

    const editGoalInputWrapper = document.createElement("div");
    const editGoalInputWrapperDiv = document.createElement("div");
    const editGoalInputWrapperInput = document.createElement("input");
    const editGoalInputWrapperButton = document.createElement("div");
    editGoalInputWrapperInput.type = "number";

    editGoalInputWrapperDiv.innerHTML = "Enter your goal in hours";
    editGoalInputWrapperButton.innerHTML = "Save";

    editGoalInputWrapper.appendChild(editGoalInputWrapperDiv);
    editGoalInputWrapper.appendChild(editGoalInputWrapperInput);
    editGoalInputWrapper.appendChild(editGoalInputWrapperButton);

    editGoalInputWrapperButton.classList.add("edit-goal-input-wrapper-button");
    editGoalInputWrapper.classList.add("edit-goal-input-wrapper");
    editGoalInputWrapper.id = "edit-goal-input-wrapper";

    editGoalInputWrapper.style.left = editGoalButton.offsetLeft + 50 + "px";
    editGoalInputWrapper.style.top = editGoalButton.offsetTop + 50 + "px";

    document.body.appendChild(editGoalInputWrapper);

    editGoalInputWrapperButton.addEventListener("click", (event) => {

      const url = window.location.href.split("leaderboard")[0] + "hoursOfServiceGoal/update";

      if (editGoalInputWrapperInput.value.length < 1 || (parseInt(editGoalInputWrapperInput.value) - 1) < 0) {
        return alert("Please enter a valid number");
      }
      serverRequest(url, "POST", {
        hoursOfServiceGoal: editGoalInputWrapperInput.value
      }, () => {
        window.location.reload();
      })
    })
  })

  document.addEventListener("click", (event) => {
    if (!event.target.classList.contains("edit-goal-button") && event.target.nodeName.toLowerCase() != "input" && !event.target.classList.contains("edit-goal-input-wrapper-button")) {
      editGoalButton.disabled = false;
      document.getElementById("edit-goal-input-wrapper") ? document.getElementById("edit-goal-input-wrapper").remove() : "";
    }
  })


  const fakeNameNames = ["Elon", "Bill", "Mark", "Sam", "Mira", "Jeff", "Sergey", "Larry", "Sean", "Gavin"];
  const fakeNameSurnames = ["Musk", "Gates", "Zuckerberg", "Altman", "Murati", "Bezos", "Brin", "Page", "Parker", "Belson"];

  const volunteerOpponents = document.getElementsByClassName("each-ranking-wrapper-volunteer-opponent-item");

  for (let i = 0; i < volunteerOpponents.length; i++) {
    const volunteerOpponent = volunteerOpponents[i];

    const fakeNameName = fakeNameNames[Math.floor(Math.random() * fakeNameNames.length)];
    const fakeNameSurname = fakeNameSurnames[Math.floor(Math.random() * fakeNameNames.length)];

    volunteerOpponent.children[0].children[1].innerHTML = fakeNameName + " " + fakeNameSurname;
  }
}
