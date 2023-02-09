
window.onload = () => {

  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const datesWrapper = document.getElementById("project-dates-wrapper");

  let date = "";

  for (let i = 0; i < datesWrapper.innerHTML.split("/").length; i++) {
    const element = datesWrapper.innerHTML.split("/")[i].trim();

    const date_day = element.split("-")[2];
    const date_month = month[parseInt(element.split("-")[1]) - 1];
    const date_year = element.split("-")[0];

    if (i == 0) {
      date += `${date_day} ${date_month} ${date_year} - `;
    } else {
      date += `${date_day} ${date_month} ${date_year}`;
    }
  }

  datesWrapper.innerHTML = date;
  datesWrapper.style.display = "flex";
  datesWrapper.style.opacity = "1";

}
