
const handleHeaderMenu = () => {
  const hamburgerMenuToggle = document.getElementById("hamburger-menu-toggle");
  const hamburgerMenuWrapper = document.getElementById("hamburger-menu-wrapper");

  let clickCnt = 0;

  hamburgerMenuToggle.addEventListener("click", (event) => {
    event.preventDefault();

    if (clickCnt % 2 == 0) {
      hamburgerMenuWrapper.style.left = "0";

      for (let i = 0; i < hamburgerMenuToggle.children.length; i++) {
        const eachHr = hamburgerMenuToggle.children[i];
        eachHr.style.backgroundColor = "rgb(255,255,255)";
        if (i == 1) {
          eachHr.style.display = "none"
        } else if (i == 0) {
          eachHr.style.transform = "rotate(-45deg)";
          eachHr.style.marginTop = "0";
          eachHr.style.marginBottom = "-2px";
        } else if (i == 2) {
          eachHr.style.transform = "rotate(45deg)";
          eachHr.style.marginTop = "0";
          eachHr.style.marginBottom = "0";
        }
      }
    } else if (clickCnt % 2 == 1) {
      hamburgerMenuWrapper.style.left = "-1000px";

      for (let i = 0; i < hamburgerMenuToggle.children.length; i++) {
        const eachHr = hamburgerMenuToggle.children[i];
        eachHr.style.backgroundColor = "rgb(0,0,0)";
        if (i == 1) {
          eachHr.style.display = "block"
        } else if (i == 0) {
          eachHr.style.transform = "rotate(0)";
          eachHr.style.marginTop = "5px";
          eachHr.style.marginBottom = "5px";
        } else if (i == 2) {
          eachHr.style.transform = "rotate(0)";
          eachHr.style.marginTop = "5px";
          eachHr.style.marginBottom = "5px";
        }
      }

    }
    clickCnt++;
  })
}
