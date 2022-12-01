
function createStackedBarGraph (xAxisLabels, barStackLabels, yAxisLabel, xAxisDocumentCountArray, barStackDocumentCountArray) 
{

  const randomColors = [];

  for (let i = 0; i < barStackLabels.length; i++) {
    var x=Math.round(0xffffff * Math.random()).toString(16);
  var y=(6-x.length);
  var z="000000";
  var z1 = z.substring(0,y);
  var color = "#" + z1 + x;
    randomColors.push(color);
  }

  const mainContent = document.getElementsByClassName("main-content")[0];

  const graphMainWrapper = document.createElement("div");
  graphMainWrapper.classList.add("graph-main-wrapper");

  mainContent.appendChild(graphMainWrapper);

  const graphWrapper = document.createElement("div");
  graphWrapper.classList.add("graph-wrapper");

  const graphBackgroundContent = document.createElement("div");
  graphBackgroundContent.classList.add("graph-background-content");
  
  const graphDataContent = document.createElement("div");
  graphDataContent.classList.add("graph-data-content");

  const graphLegendsWrapper = document.createElement("div");
  graphLegendsWrapper.classList.add("graph-legends-wrapper");


  graphMainWrapper.appendChild(graphWrapper);
  graphMainWrapper.appendChild(graphLegendsWrapper);
  graphWrapper.appendChild(graphBackgroundContent);
  graphWrapper.appendChild(graphDataContent);

  const graphTitle = document.createElement("div");
  graphTitle.classList.add("graph-background-content-title");
  graphTitle.innerHTML = (document.getElementById("y-axis-filter").options[document.getElementById("y-axis-filter").selectedIndex].innerHTML) + " vs. " + (document.getElementById("x-axis-filter").options[document.getElementById("x-axis-filter").selectedIndex].innerHTML);

  graphBackgroundContent.appendChild(graphTitle);

  const graphBackgroundGridSection = document.createElement("div");
  graphBackgroundGridSection.classList.add("graph-background-content-grid-section");

  graphBackgroundContent.appendChild(graphBackgroundGridSection);

  const maxValueInXArray = Math.max(...xAxisDocumentCountArray);

  

  for (let i = 0; i < 6; i++) {

    let gridValue = 0;

    if (i == 0) {
      gridValue = 0;
    } else {
      gridValue = Math.floor((maxValueInXArray / 6) * (i+1));
    }
    const eachGridContent = document.createElement("div");
    eachGridContent.classList.add("graph-each-grid-content");

    const eachGridContentLabel = document.createElement("div");
    eachGridContentLabel.classList.add("each-grid-content-label");
    eachGridContentLabel.innerHTML = gridValue;

    eachGridContent.appendChild(eachGridContentLabel);

    const hr = document.createElement("hr")
    eachGridContent.appendChild(hr);

    graphBackgroundGridSection.appendChild(eachGridContent);
  }


  for (let i = 0; i < xAxisDocumentCountArray.length; i++) {
    const eachBarTotalValue = xAxisDocumentCountArray[i];
    
    const eachBarWrapper = document.createElement("div");
    eachBarWrapper.classList.add("each-bar-wrapper");
    graphDataContent.appendChild(eachBarWrapper);
    eachBarWrapper.style.height = ((eachBarTotalValue / Math.max(...xAxisDocumentCountArray)) * 100) + "%";

    for (let j = 0; j < barStackDocumentCountArray[i].length; j++) {
      const eachBarStackValue = barStackDocumentCountArray[i][j];
      const eachBarStackLabel = barStackLabels[j];

      const eachBarEachStack = document.createElement("div");
      eachBarEachStack.classList.add("each-bar-each-stack");
      
      const eachBarStackValueWrapper = document.createElement("div");
      eachBarStackValueWrapper.classList.add("each-bar-stack-value");
      eachBarStackValueWrapper.innerHTML = eachBarStackValue;

      const eachBarStackLabelWrapper = document.createElement("div");
      eachBarStackLabelWrapper.classList.add("each-bar-stack-label");
      eachBarStackLabelWrapper.innerHTML = eachBarStackLabel;

      eachBarEachStack.appendChild(eachBarStackValueWrapper);
      eachBarEachStack.appendChild(eachBarStackLabelWrapper);

      eachBarEachStack.style.height = ((eachBarStackValue / eachBarTotalValue) * 100) + "%";
      eachBarEachStack.style.backgroundColor = randomColors[j];
      console.log(randomColors[j]);
      eachBarWrapper.appendChild(eachBarEachStack);
    }

    const xAxisLabel = document.createElement("div");
    xAxisLabel.classList.add("each-bar-wrapper-x-label");
    if (xAxisLabels[i] == "m") {
      xAxisLabels[i] = "Male";
    } else if (xAxisLabels[i] == "f") {
      xAxisLabels[i] = "Female";
    }
    xAxisLabel.innerHTML = xAxisLabels[i];
    eachBarWrapper.appendChild(xAxisLabel);
  }

  for (let i = 0; i < barStackLabels.length; i++) {
    let eachLabel = barStackLabels[i];
    
    const eachGraphLegend = document.createElement("div");
    eachGraphLegend.classList.add("each-graph-legend");

    const eachGraphLegendColorContent = document.createElement("div");
    eachGraphLegendColorContent.classList.add("each-graph-legend-color-content");
    eachGraphLegendColorContent.style.backgroundColor = randomColors[i];

    const eachGraphLegendLabelContent = document.createElement("div");
    eachGraphLegendLabelContent.classList.add("each-graph-legend-label-content");
    if (eachLabel == "m") {
      eachLabel = "Male"
    } else if (eachLabel == "f") {
      eachLabel = "Female";
    }
    eachGraphLegendLabelContent.innerHTML = eachLabel;

    eachGraphLegend.appendChild(eachGraphLegendColorContent);
    eachGraphLegend.appendChild(eachGraphLegendLabelContent);

    graphLegendsWrapper.appendChild(eachGraphLegend);
  }
}

