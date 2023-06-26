
window.onload = () => {

  const createProjectWrapper = document.getElementById("create-project-wrapper");
  const projectMoreInfoWrappers = document.getElementsByClassName("each-project-more-info-wrapper");

  const startTimeOfEachSessionInput = document.getElementById("start_time_of_each_session");
  const durationOfEachSessionInput = document.getElementById("duration_of_each_session");
  const numberOfSessionsInput = document.getElementById("number_of_sessions");

  const sessionAdressInput = document.getElementById("session_address");
  const sessionLinkToOnlineEnvironmentInput = document.getElementById("session_link_to_online_environment");

  const sessionAdressLabel = document.getElementById("session_address_label");
  const sessionLinkToOnlineEnvironmentLabel = document.getElementById("session_link_to_online_environment_label");

  const addSessionForm = document.getElementById("session-form");
  const addSessionButton = document.getElementById("add-session-button");

  let sessionCnt = 0;

  document.addEventListener("click", (event) => {

    if (event.target.classList.contains("each-project-mark-as-complete-button")) {
      const projectId = event.target.previousSibling.previousSibling.innerHTML;

      const url = window.location.href.split("organization")[0] + "project/edit/isCompleted";
      if (confirm("Do you really want to mark this project as complete? This action will not be reversible.")) {
        serverRequest(url, "POST", { id: projectId }, () => window.location.reload());
      }
    }

    if (event.target.classList.contains("add-session-button")) {
      if (sessionCnt % 2 == 0) {
        addSessionForm.style.display = "flex";
        addSessionButton.innerHTML = "Cancel";
      } else {
        addSessionForm.style.display = "none";
        addSessionButton.innerHTML = "Add new session";
      }
      sessionCnt++;
    }

    if (event.target.parentNode.id == "create") {
      createProjectWrapper.style.display = "block";
    }
    if (event.target.className == "close-window-button" || event.target.className == "fa-solid fa-close") {
      createProjectWrapper.style.display = "none";
      for (let i = 0; i < projectMoreInfoWrappers.length; i++) {
        const element = projectMoreInfoWrappers[i];
        element.style.display = "none";
      }
    }
    if (event.target.className == "each-project-image") {
      event.target.parentNode.parentNode.childNodes[1].style.display = "block"
    }

    if (event.target.id == "add-sessions-manual-checkbox") {
      if (event.target.checked) {
        startTimeOfEachSessionInput.disabled = true;
        durationOfEachSessionInput.disabled = true;
        numberOfSessionsInput.disabled = true;
      } else {
        startTimeOfEachSessionInput.disabled = false;
        durationOfEachSessionInput.disabled = false;
        numberOfSessionsInput.disabled = false;
      }
    }
  })

  document.addEventListener("change", (event) => {
    if (event.target.id == "session_environment") {
      if (event.target.value == "online") {
        sessionAdressInput.style.display = "none";
        sessionAdressLabel.style.display = "none";
        sessionLinkToOnlineEnvironmentInput.style.display = "inline-block";
        sessionLinkToOnlineEnvironmentLabel.style.display = "inline-block"
      } else if (event.target.value == "face-to-face") {
        sessionAdressInput.style.display = "inline-block";
        sessionAdressLabel.style.display = "inline-block"
        sessionLinkToOnlineEnvironmentInput.style.display = "none";
        sessionLinkToOnlineEnvironmentLabel.style.display = "none";
      }
    }
  })
}
