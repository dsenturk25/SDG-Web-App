
function profileHover() {
    const profileHoverWrapper = document.getElementById("profile-hover-wrapper");
    const authBlock = document.getElementById("volunteer-auth-block");

    if (profileHoverWrapper != undefined || profileHoverWrapper != null) {
        authBlock.addEventListener("mouseenter", (event) => {
            profileHoverWrapper.style.display = "block";
            profileHoverWrapper.style.opacity = "1";
        })
    
        profileHoverWrapper.addEventListener("mouseenter", (event) => {
            profileHoverWrapper.style.display = "block";
            profileHoverWrapper.style.opacity = "1";
        })
    
        authBlock.addEventListener("mouseleave", (event) => {
            profileHoverWrapper.style.display = "none";
            profileHoverWrapper.style.opacity = "0";
        })
    
        profileHoverWrapper.addEventListener("mouseleave", (event) => {
            profileHoverWrapper.style.display = "none";
            profileHoverWrapper.style.opacity = "0";
        })
    }
}
