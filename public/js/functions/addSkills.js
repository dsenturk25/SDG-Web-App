
function addSkillsWrapper () {

    const addSkillsWrapper = document.getElementById("add-new-skills-wrapper");
    const addSkillsButton = document.getElementById("add-new-skills-button");

    const expandSkillsButton = document.getElementById("skills-wrapper-expand-button");
    const addNewSkillsWrapper = document.getElementById("skills-wrapper-add-new-skills-wrapper");

    const skillsWrapperCloseButton = document.getElementById("skills-wrapper-close-button");

    let cnt = 0;

    addSkillsButton.addEventListener("click", (event) => {
        addSkillsWrapper.style.display = "flex";
        addSkillsWrapper.style.opacity = "1";
    })

    expandSkillsButton.addEventListener("click", (event) => {
        if (cnt % 2 == 0) {
            addNewSkillsWrapper.style.overflowY = "scroll"
            addNewSkillsWrapper.style.height = "300px";
            setTimeout(() => {
                addNewSkillsWrapper.style.height = "fit-content";    
            }, 500)
        } else {
            addNewSkillsWrapper.style.overflowY = "hidden"
            addNewSkillsWrapper.style.height = "150px";
        }
        cnt++;
    })

    skillsWrapperCloseButton.addEventListener("click", (event) => {
        addSkillsWrapper.style.opacity = "0";
        setTimeout(() => {
            addSkillsWrapper.style.display = "none";
        }, 500)
    })

    document.addEventListener("change", (event) => {
        if (event.target.classList.contains("each-skill-checkbox")) {
            const id = event.target.previousSibling.innerHTML;

            const url = "/volunteer/skill/edit"
            serverRequest(url, "POST", {
                skillId: id
            }, (res) => { return; })
        }
    })
}
