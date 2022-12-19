
window.onload = () => {

  const stackInfoContent = document.createElement("div");
  stackInfoContent.classList.add("stack-info-content");

  document.addEventListener("mouseover", (event) => {
    if (event.target.className == "each-bar-each-stack") {
      document.body.appendChild(stackInfoContent);

      const filterValue = document.createElement("div");
      filterValue.classList.add("stack-info-content-each-info");
      stackInfoContent.appendChild(filterValue);

      const infoValue = document.createElement("div");
      infoValue.classList.add("stack-info-content-each-info");
      stackInfoContent.appendChild(infoValue);

      const percentageValue = document.createElement("div");
      percentageValue.classList.add("stack-info-content-each-info");
      stackInfoContent.appendChild(percentageValue);

      stackInfoContent.children[0].innerHTML = "Filter: " + event.target.children[1].innerHTML;
      stackInfoContent.children[1].innerHTML = "Value: " + event.target.children[0].innerHTML;
      stackInfoContent.children[2].innerHTML = "Percentage: " + ((event.target.offsetHeight / event.target.parentNode.offsetHeight) * 100).toFixed(1) + "%";
    
    }
    if (event.target.className != "each-bar-each-stack") {
      stackInfoContent.remove();
      event.target.style.boxShadow = "";
    }
  })

  document.addEventListener("mousemove", (event) => {
    if (event.target.className == "each-bar-each-stack") {
      stackInfoContent.style.left = event.clientX + 20 + "px";
      stackInfoContent.style.top = event.clientY + 20 + "px";
      event.target.style.boxShadow = "0 0 10px 5px " + event.target.style.backgroundColor;
    }
    const legendsArray = document.getElementsByClassName("each-graph-legend");

    Array.prototype.forEach.call(legendsArray, element => {
      if (element.children[0].style.backgroundColor == event.target.style.backgroundColor) {
        element.children[0].style.boxShadow = "0 0 10px 2px " + event.target.style.backgroundColor;
        element.children[1].style.fontWeight = "bold";
      } else {
        element.children[0].style.boxShadow = "";
        element.children[1].style.fontWeight = "";
      }
    });

    const eachBarEachStackArray = document.getElementsByClassName("each-bar-each-stack");
    Array.prototype.forEach.call(eachBarEachStackArray, e => {
      if (e!=event.target) {
        e.style.boxShadow = "";
      }
    })
  })

  const xAxisFilter = document.getElementById("x-axis-filter");
  const barStackFilters = document.getElementById("bar-stack-filters");
  const yAxisFilter = document.getElementById("y-axis-filter");
  const organizationId = document.getElementById("organization-id");

  document.addEventListener("click", (event) => {
    if (event.target.innerHTML == "Graph") {

      const url = window.location.href.split("/organization")[0] + "/organization/comparisons";

      serverRequest(url, "POST", {
        _id: organizationId.innerHTML,
        x_axis_filter: xAxisFilter.value,
        bar_stack_filter: barStackFilters.value,
        y_axis_filter: yAxisFilter.value
      }, (res) => {
        if (res.error) {
          alert("An error occured in the server side.");
        } else {
          createStackedBarGraph(res.xAxisLabels, res.barStackLabels, res.yAxisLabel, res.xAxisDocumentCountArray, res.barStackDocumentCountArray);
        }
      })
    }
  })
}
