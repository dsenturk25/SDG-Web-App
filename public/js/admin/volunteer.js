
window.onload = () => {

  const searchBar = document.getElementById("search-bar");
  const searchFilter = document.getElementById("search-filter");
  const volunteersMainWrapper = document.getElementById("volunteers-main-wrapper");

  const searchBarInitialPlaceHolder = searchBar.placeholder;

  document.addEventListener("click", (event) => {

    if (event.target.innerHTML == "Delete") {

      if (confirm("Do you really want to DELETE the volunteer?")) {
        const id = event.target.parentNode.children[0].children[0].innerHTML;
        const url = window.location.href.split("/admin")[0] + "/admin/volunteer/delete";

        serverRequest(url, "POST", { _id: id }, (res) => {
          if (res.error) {
            alert("An error occured on the server side. Please try again later.");
          } else {
            window.location.reload();
          }
        });
      }
    }
  });

  document.addEventListener("change", (event) => {
    searchBar.value = "";
    if (searchFilter.value == "gender") {
      searchBar.placeholder = "type m for male / f for female";
    } else {
      searchBar.placeholder = searchBarInitialPlaceHolder;
    }
  })

  document.addEventListener("keyup", (event) => {

    if (event.target.id == "search-bar") {

      if (searchFilter.value == "gender") {
        if (searchBar.value != "m" && searchBar.value != "f") {
          searchBar.value = "";
        }
      }

      const url = window.location.href.split("/admin")[0] + "/admin/volunteer/filter/fetch";

      console.log(searchFilter.value);
      console.log(searchBar.value);

      serverRequest(url, "POST", {
        filter: searchFilter.value,
        input: searchBar.value
      }, (res) => {
        if (res.error) {
          alert("An error occured on the server side.")
        } else {
          volunteersMainWrapper.innerHTML = "";

          for (let i = 0; i < res.length; i++) {
            const eachVolunteerContent = document.createElement("div");
            eachVolunteerContent.classList.add("each-volunteer-content");

            const eachVolunteerContentInfoWrapper = document.createElement("div");
            eachVolunteerContentInfoWrapper.classList.add("each-volunteer-content-info-wrapper");

            eachVolunteerContent.appendChild(eachVolunteerContentInfoWrapper);
            volunteersMainWrapper.appendChild(eachVolunteerContent);

            const id = document.createElement("div");
            id.classList.add("each-volunteer-info");
            id.style.display = "none";
            id.innerHTML = res[i]._id;

            const name = document.createElement("div");
            name.classList.add("each-volunteer-info");
            name.innerHTML = "Name: " + res[i].name + " " + res[i].surname;

            const email = document.createElement("div");
            email.classList.add("each-volunteer-info");
            email.innerHTML = "Email: " + res[i].email;

            const gender = document.createElement("div");
            gender.classList.add("each-volunteer-info");
            gender.innerHTML = "Gender: " + res[i].gender;

            const phone = document.createElement("div");
            phone.classList.add("each-volunteer-info");
            phone.innerHTML = "Phone number: " + res[i].phone_number;

            const school = document.createElement("div");
            school.classList.add("each-volunteer-info");
            school.innerHTML = "School: " + res[i].school;

            const location = document.createElement("div");
            location.classList.add("each-volunteer-info");
            location.innerHTML = "Location: " + res[i].city + " / " + res[i].country;

            const dates = document.createElement("div");
            dates.classList.add("each-volunteer-info-dates");
            dates.innerHTML = res[i].birth_date

            eachVolunteerContentInfoWrapper.appendChild(id);
            eachVolunteerContentInfoWrapper.appendChild(name);
            eachVolunteerContentInfoWrapper.appendChild(email);
            eachVolunteerContentInfoWrapper.appendChild(phone);
            eachVolunteerContentInfoWrapper.appendChild(school);
            eachVolunteerContentInfoWrapper.appendChild(gender);
            eachVolunteerContentInfoWrapper.appendChild(location);
            eachVolunteerContentInfoWrapper.appendChild(dates);

            const deleteButton = document.createElement("div");
            deleteButton.classList.add("waitlist-button-delete");
            deleteButton.innerHTML = "Delete";
            eachVolunteerContent.appendChild(deleteButton);

          }
        }
      })
    }
  })
}
