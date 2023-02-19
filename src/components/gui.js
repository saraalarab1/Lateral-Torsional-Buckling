import {params} from '../utils/params'

window.addEventListener("load", (event) => {

    let flexContainer = document.querySelector("#dimensions");

    let lengthLabel = document.createElement("a-gui-label");
    lengthLabel.setAttribute("width", "2.5");
    lengthLabel.setAttribute("height", "0.75");
    lengthLabel.setAttribute("value", "Length");
    lengthLabel.setAttribute("font-size", "0.35");
    lengthLabel.setAttribute("line-height", "0.8");

    let lengthSlider = document.createElement("a-gui-slider");
    lengthSlider.setAttribute("id", "lengthSlider");
    lengthSlider.setAttribute("width", "2.5");
    lengthSlider.setAttribute("height", "0.75");
    lengthSlider.setAttribute("onclick", "update_beam_length");
    lengthSlider.setAttribute("percent", (params.length - 6) / (50 - 5));
    lengthSlider.setAttribute("position", "0 0 0.1");
    lengthSlider.setAttribute("margin", "0 0 0 0")

    let heightLabel = document.createElement("a-gui-label");
    heightLabel.setAttribute("width", "2.5");
    heightLabel.setAttribute("height", "0.75");
    heightLabel.setAttribute("value", "Height");
    heightLabel.setAttribute("font-size", "0.35");
    heightLabel.setAttribute("line-height", "0.8");
    heightLabel.setAttribute("position", "0 0 0");

    let heightSlider = document.createElement("a-gui-slider");
    heightSlider.setAttribute("id", "heightSlider");
    heightSlider.setAttribute("width", "2.5");
    heightSlider.setAttribute("height", "0.75");
    heightSlider.setAttribute("onclick", "update_beam_height");
    heightSlider.setAttribute("percent", (params.height - 0.2) / (1.5 - 0.1));
    heightSlider.setAttribute("position", "0 1 0.1");
    heightSlider.setAttribute("margin", "0 0 0 0")

    let depthLabel = document.createElement("a-gui-label");
    depthLabel.setAttribute("width", "2.5");
    depthLabel.setAttribute("height", "0.75");
    depthLabel.setAttribute("value", "Depth");
    depthLabel.setAttribute("font-size", "0.35");
    depthLabel.setAttribute("line-height", "0.8");
    depthLabel.setAttribute("position", "0 0 0");

    let depthSlider = document.createElement("a-gui-slider");
    depthSlider.setAttribute("id", "depthSlider");
    depthSlider.setAttribute("width", "2.5");
    depthSlider.setAttribute("height", "0.75");
    depthSlider.setAttribute("onclick", "update_beam_depth");
    depthSlider.setAttribute("percent", params.depth);
    depthSlider.setAttribute("position", "0 -2 0.1");
    depthSlider.setAttribute("margin", "0 0 0 0")


    flexContainer.appendChild(lengthLabel)
    flexContainer.appendChild(lengthSlider)
    flexContainer.appendChild(heightLabel)
    flexContainer.appendChild(heightSlider)
    flexContainer.appendChild(depthLabel)
    flexContainer.appendChild(depthSlider)

    let flexContainer2 = document.querySelector("#load");

    let loadPositionLabel = document.createElement("a-gui-label");
    loadPositionLabel.setAttribute("width", "2.5");
    loadPositionLabel.setAttribute("height", "0.75");
    loadPositionLabel.setAttribute("value", "Load Position");
    loadPositionLabel.setAttribute("font-size", "0.35");
    loadPositionLabel.setAttribute("line-height", "0.8");
    loadPositionLabel.setAttribute("position", "0 0 0");

    let loadPositionSlider = document.createElement("a-gui-slider");
    loadPositionSlider.setAttribute("id", "depthSlider");
    loadPositionSlider.setAttribute("width", "2.5");
    loadPositionSlider.setAttribute("height", "0.75");
    loadPositionSlider.setAttribute("onclick", "update_load_position");
    loadPositionSlider.setAttribute("percent", (params.length - 6) / (50 - 5));
    loadPositionSlider.setAttribute("position", "0 1 0.1");
    loadPositionSlider.setAttribute("margin", "0 0 0 0")

    flexContainer2.appendChild(loadPositionLabel)
    flexContainer2.appendChild(loadPositionSlider)
})