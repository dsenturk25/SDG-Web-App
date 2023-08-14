
function searchBar() {
  const searchInput = document.getElementById("search");
  const searchRes = document.getElementById("search-res");
  const noResInitialInnerHtml = searchRes.innerHTML;
  searchInput.addEventListener("focusin", () => {
    searchRes.style.display = "flex";
  })
  document.addEventListener("click", (event) => {
    if (event.target.id != "search-res" && event.target.parentNode.id != "search-res" && event.target.id != "search") {
      searchRes.style.display = "none";
    }
  })
  searchInput.addEventListener("keyup", () => {
    const url = "/search-query";
    serverRequest(url, "POST", {
      query: searchInput.value
    }, res => {
      if (res.success && !res.error) {
        if (res.data == []) {
          searchRes.innerHTML = "";
          searchRes.innerHTML = noResInitialInnerHtml;
        } else {
          searchRes.innerHTML = "";
          res.data.forEach(project => {
            const eachResultProject = document.createElement("a");
            eachResultProject.href = `/project?_id=${project._id}`;
            eachResultProject.classList.add("each-result-project");

            const eachResultProjectImage = document.createElement("div");
            eachResultProjectImage.classList.add("each-result-project-img");
            const projectImg = document.createElement("img");

            let binary = '';
            project.photo.data.forEach((byte) => binary += String.fromCharCode(byte));
            const photo = btoa(binary);

            projectImg.src = `data:image/png;base64,${photo}`;
            eachResultProjectImage.appendChild(projectImg);
            eachResultProject.appendChild(eachResultProjectImage);

            const eachResultProjectTexts = document.createElement("div");
            eachResultProjectTexts.classList.add("each-result-project-texts");
            eachResultProject.appendChild(eachResultProjectTexts);

            const eachProjectName = document.createElement("div");
            eachProjectName.classList.add("each-result-name");
            eachProjectName.innerHTML = project.name;

            const eachProjectCreatorName = document.createElement("div");
            eachProjectCreatorName.classList.add("each-result-creator-name");
            eachProjectCreatorName.innerHTML = project.creator_name;

            eachResultProjectTexts.appendChild(eachProjectName);
            eachResultProjectTexts.appendChild(eachProjectCreatorName);

            searchRes.appendChild(eachResultProject);
          });
        }
      } else {
        searchRes.innerHTML = "";
        searchRes.innerHTML = noResInitialInnerHtml;
      }
    })
  })
}

