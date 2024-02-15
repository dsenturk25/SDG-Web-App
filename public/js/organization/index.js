
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

  let sessionCnt = 0;

  document.addEventListener("click", (event) => {

    if (event.target.classList.contains("each-project-mark-as-complete-button")) {
      const projectId = event.target.previousSibling.previousSibling.innerHTML;

      const url = window.location.href.split("organization")[0] + "project/edit/isCompleted";
      if (confirm("Do you really want to mark this project as complete?")) {
        serverRequest(url, "POST", { id: projectId }, () => window.location.reload());
      }
    } else if (event.target.classList.contains("each-project-mark-as-incomplete-button")) {
      const projectId = event.target.previousSibling.previousSibling.previousSibling.innerHTML;

      const url = window.location.href.split("organization")[0] + "project/edit/isIncomplete";
      if (confirm("Do you really want to mark this project as incomplete?")) {
        serverRequest(url, "POST", { id: projectId }, () => window.location.reload());
      }
    }

    if (event.target.classList.contains("add-session-button")) {
      const addSessionButton = event.target;
      const addSessionForm = event.target.nextSibling;
      if (sessionCnt % 2 == 0) {
        addSessionForm.style.display = "flex";

        const mapContainer = document.createElement("div")
        mapContainer.id = "map";
        mapContainer.classList.add("map");

        const afterChild = addSessionForm.children[addSessionForm.children.length - 1];
        addSessionForm.insertBefore(mapContainer, afterChild);
        createMap(addSessionForm);
        addSessionButton.innerHTML = "Cancel";
      } else {

        const map = document.getElementById("map");
        map.remove();

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

    if (event.target.classList.includes("add-session-submit")) {
      event.target.disabled = true;
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

  document.addEventListener("click", (event) => {

    if (event.target.classList.contains("attendance-present-button")) {

      event.target.style.backgroundColor = "green";
      event.target.nextSibling.style.backgroundColor = "#ccc";

      const attendantId = event.target.parentNode.previousSibling.innerHTML;
      const sessionIndex = event.target.parentNode.previousSibling.previousSibling.innerHTML;
      const projectId = event.target.parentNode.previousSibling.previousSibling.previousSibling.innerHTML;
      const sessionDuration = event.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;

      const url = window.location.href + "/attendance/present";

      serverRequest(url, "POST", {
        volunteer_id: attendantId,
        projectId: projectId,
        sessionIndex: sessionIndex,
        sessionDuration: sessionDuration
      }, () => { });
    }

    if (event.target.classList.contains("attendance-absent-button")) {

      event.target.style.backgroundColor = "red";
      event.target.previousSibling.style.backgroundColor = "#ccc";

      const attendantId = event.target.parentNode.previousSibling.innerHTML;
      const sessionIndex = event.target.parentNode.previousSibling.previousSibling.innerHTML;
      const projectId = event.target.parentNode.previousSibling.previousSibling.previousSibling.innerHTML;
      const sessionDuration = event.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;

      const url = window.location.href + "/attendance/absent";

      serverRequest(url, "POST", {
        volunteer_id: attendantId,
        projectId: projectId,
        sessionIndex: sessionIndex,
        sessionDuration: sessionDuration
      }, () => { });
    }
  })
}

function createMap(sessionFormContainer) {
  const map = L.map('map').setView([0, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
  }).addTo(map);

  var marker = L.marker([0, 0], { draggable: true }).addTo(map);

  marker.on('dragend', function (event) {
      var marker = event.target;
      var position = marker.getLatLng();

      const latitudeContainer = sessionFormContainer.children[sessionFormContainer.children.length - 5];
      const longitudeContainer = sessionFormContainer.children[sessionFormContainer.children.length - 3];

      latitudeContainer.value = position.lat.toFixed(6);
      longitudeContainer.value = position.lng.toFixed(6);
  });
}

