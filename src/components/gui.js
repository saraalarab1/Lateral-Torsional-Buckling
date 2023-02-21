import {params} from '../utils/params'

window.addEventListener("load", (event) => {


        // create a-gui-flex-container element
    const dimensionsContainer = document.createElement("a-gui-flex-container");

    // set element attributes
    dimensionsContainer.setAttribute("id", "dimensions");
    dimensionsContainer.setAttribute("flex-direction", "column");
    dimensionsContainer.setAttribute("justify-content", "center");
    dimensionsContainer.setAttribute("align-items", "normal");
    dimensionsContainer.setAttribute("component-padding", "0.3");
    dimensionsContainer.setAttribute("opacity", "0.5");
    dimensionsContainer.setAttribute("width", "3.5");
    dimensionsContainer.setAttribute("height", "5");
    dimensionsContainer.setAttribute("panel-color", "#072B73");
    dimensionsContainer.setAttribute("panel-rounded", "0.2");
    dimensionsContainer.setAttribute("position", "-7 10 -10");
    dimensionsContainer.setAttribute("rotation", "0 15 0");

    // add the element to its parent
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
    heightSlider.setAttribute("margin", "0 0 0 0");

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


    dimensionsContainer.appendChild(lengthLabel)
    dimensionsContainer.appendChild(lengthSlider)
    dimensionsContainer.appendChild(heightLabel)
    dimensionsContainer.appendChild(heightSlider)
    dimensionsContainer.appendChild(depthLabel)
    dimensionsContainer.appendChild(depthSlider)

    AFRAME.scenes[0].appendChild(dimensionsContainer);

        // create a-gui-flex-container element
    const support1Container = document.createElement("a-gui-flex-container");

    // set element attributes
    support1Container.setAttribute("id", "leftsupport");
    support1Container.setAttribute("flex-direction", "column");
    support1Container.setAttribute("justify-content", "flexStart");
    support1Container.setAttribute("align-items", "normal");
    support1Container.setAttribute("component-padding", "1");
    support1Container.setAttribute("opacity", "0.8");
    support1Container.setAttribute("width", "2.5");
    support1Container.setAttribute("height", "3.5");
    support1Container.setAttribute("panel-rounded", "0.2");
    support1Container.setAttribute("position", "-1 9.5 -10");
    support1Container.setAttribute("rotation", "0 0 0");
    support1Container.setAttribute("panel-color", "#212121");

    // create child elements
    var support1 = document.createElement("a-gui-label");
    var button1 = document.createElement("a-gui-button");
    var button2 = document.createElement("a-gui-button");
    var button3 = document.createElement("a-gui-button");

    // set label element attributes
    support1.setAttribute("width", "1");
    support1.setAttribute("height", "0.75");
    support1.setAttribute("value", "Left");
    support1.setAttribute("font-size", "0.35");
    support1.setAttribute("line-height", "0.8");
    support1.setAttribute("margin", "0 0 0.05 0");

    // set button1 element attributes
    button1.setAttribute("width", "1");
    button1.setAttribute("height", "0.75");
    button1.setAttribute("onclick", "update_left('Free')");
    button1.setAttribute("font-size", "0.3");
    button1.setAttribute("value", "Free");
    button1.setAttribute("position", "-1 -0.5 0");

    // set button2 element attributes
    button2.setAttribute("width", "1");
    button2.setAttribute("height", "0.75");
    button2.setAttribute("onclick", "update_left('Pin')");
    button2.setAttribute("font-size", "0.3");
    button2.setAttribute("value", "Pin");
    button2.setAttribute("position", "-1 -1.5 0");

    // set button3 element attributes
    button3.setAttribute("width", "1");
    button3.setAttribute("height", "0.75");
    button3.setAttribute("onclick", "update_left('Fixed')");
    button3.setAttribute("font-size", "0.3");
    button3.setAttribute("value", "Fixed");

    // add child elements to the flex container
    support1Container.appendChild(support1);
    support1Container.appendChild(button1);
    support1Container.appendChild(button2);
    support1Container.appendChild(button3);

    AFRAME.scenes[0].appendChild(support1Container);

    // Create a flex container element
    const support2Container = document.createElement("a-gui-flex-container");
    support2Container.setAttribute("id", "rightsupport");
    support2Container.setAttribute("flex-direction", "column");
    support2Container.setAttribute("justify-content", "flexStart");
    support2Container.setAttribute("align-items", "normal");
    support2Container.setAttribute("component-padding", "1");
    support2Container.setAttribute("opacity", "0.8");
    support2Container.setAttribute("width", "2.5");
    support2Container.setAttribute("height", "3.5");
    support2Container.setAttribute("panel-rounded", "0.2");
    support2Container.setAttribute("position", "1 9.5 -10");
    support2Container.setAttribute("rotation", "0 0 0");
    support2Container.setAttribute("panel-color", "#212121");

    // Create a support2 element and add it to the flex container
    const support2 = document.createElement("a-gui-label");
    support2.setAttribute("width", "1");
    support2.setAttribute("height", "0.75");
    support2.setAttribute("value", "Right");
    support2.setAttribute("font-size", "0.35");
    support2.setAttribute("line-height", "0.8");
    support2.setAttribute("margin", "0 0 0.05 0");
    support2Container.appendChild(support2);

    // Create a button element with onclick event handler and add it to the flex container
    const freeBtn = document.createElement("a-gui-button");
    freeBtn.setAttribute("width", "1");
    freeBtn.setAttribute("height", "0.75");
    freeBtn.setAttribute("onclick", "update_right('Free')");
    freeBtn.setAttribute("font-size", "0.3");
    freeBtn.setAttribute("value", "Free");
    support2Container.appendChild(freeBtn);

    // Create a button element with onclick event handler and add it to the flex container
    const pinBtn = document.createElement("a-gui-button");
    pinBtn.setAttribute("width", "1");
    pinBtn.setAttribute("height", "0.75");
    pinBtn.setAttribute("onclick", "update_right('Pin')");
    pinBtn.setAttribute("font-size", "0.3");
    pinBtn.setAttribute("value", "Pin");
    support2Container.appendChild(pinBtn);

    // Create a button element with onclick event handler and add it to the flex container
    const fixedBtn = document.createElement("a-gui-button");
    fixedBtn.setAttribute("width", "1");
    fixedBtn.setAttribute("height", "0.75");
    fixedBtn.setAttribute("onclick", "update_right('Fixed')");
    fixedBtn.setAttribute("font-size", "0.3");
    fixedBtn.setAttribute("value", "Fixed");
    support2Container.appendChild(fixedBtn);

    AFRAME.scenes[0].appendChild(support2Container);

        // Create a flex container element
    const hiddenLeftContainer = document.createElement("a-gui-flex-container");
    hiddenLeftContainer.setAttribute("flex-direction", "column");
    hiddenLeftContainer.setAttribute("justify-content", "flexStart");
    hiddenLeftContainer.setAttribute("align-items", "normal");
    hiddenLeftContainer.setAttribute("component-padding", "1");
    hiddenLeftContainer.setAttribute("opacity", "0.8");
    hiddenLeftContainer.setAttribute("width", "2.5");
    hiddenLeftContainer.setAttribute("height", "3.5");
    hiddenLeftContainer.setAttribute("panel-rounded", "0.2");
    hiddenLeftContainer.setAttribute("position", "-1 6.5 -10");
    hiddenLeftContainer.setAttribute("rotation", "0 0 0");
    hiddenLeftContainer.setAttribute("panel-color", "#212121");

    // Create a label element and add it to the flex container
    const label1 = document.createElement("a-gui-label");
    label1.setAttribute("width", "1");
    label1.setAttribute("height", "0.75");
    label1.setAttribute("value", "Visible");
    label1.setAttribute("font-size", "0.35");
    label1.setAttribute("line-height", "0.8");
    label1.setAttribute("margin", "0 0 0.05 0");
    hiddenLeftContainer.appendChild(label1);

    // Create a button element with onclick event handler and add it to the flex container
    const trueBtn = document.createElement("a-gui-button");
    trueBtn.setAttribute("width", "1");
    trueBtn.setAttribute("height", "0.75");
    trueBtn.setAttribute("onclick", "update_visible_left(true)");
    trueBtn.setAttribute("font-size", "0.3");
    trueBtn.setAttribute("value", "True");
    trueBtn.setAttribute("position", "-1 -1.5 0");
    hiddenLeftContainer.appendChild(trueBtn);

    // Create a button element with onclick event handler and add it to the flex container
    const falseBtn = document.createElement("a-gui-button");
    falseBtn.setAttribute("width", "1");
    falseBtn.setAttribute("height", "0.75");
    falseBtn.setAttribute("onclick", "update_visible_left(false)");
    falseBtn.setAttribute("font-size", "0.3");
    falseBtn.setAttribute("value", "False");
    hiddenLeftContainer.appendChild(falseBtn);

    AFRAME.scenes[0].appendChild(hiddenLeftContainer);

    // create the container
    const hiddenRightContainer = document.createElement('a-gui-flex-container');
    hiddenRightContainer.setAttribute('flex-direction', 'column');
    hiddenRightContainer.setAttribute('justify-content', 'flexStart');
    hiddenRightContainer.setAttribute('align-items', 'normal');
    hiddenRightContainer.setAttribute('component-padding', '1');
    hiddenRightContainer.setAttribute('opacity', '0.8');
    hiddenRightContainer.setAttribute('width', '2.5');
    hiddenRightContainer.setAttribute('height', '3.5');
    hiddenRightContainer.setAttribute('panel-rounded', '0.2');
    hiddenRightContainer.setAttribute('position', '1 6.5 -10');
    hiddenRightContainer.setAttribute('rotation', '0 0 0');
    hiddenRightContainer.setAttribute('panel-color', '#212121');

    // create the label
    const label2 = document.createElement('a-gui-label');
    label2.setAttribute('width', '1');
    label2.setAttribute('height', '0.75');
    label2.setAttribute('value', 'Visible');
    label2.setAttribute('font-size', '0.35');
    label2.setAttribute('line-height', '0.8');
    label2.setAttribute('margin', '0 0 0.05 0');

    // create the "True" button
    const trueButton = document.createElement('a-gui-button');
    trueButton.setAttribute('width', '1');
    trueButton.setAttribute('height', '0.75');
    trueButton.setAttribute('onclick', 'update_visible_right(true)');
    trueButton.setAttribute('font-size', '0.3');
    trueButton.setAttribute('value', 'True');

    // create the "False" button
    const falseButton = document.createElement('a-gui-button');
    falseButton.setAttribute('width', '1');
    falseButton.setAttribute('height', '0.75');
    falseButton.setAttribute('onclick', 'update_visible_right(false)');
    falseButton.setAttribute('font-size', '0.3');
    falseButton.setAttribute('value', 'False');

    // append the label and buttons to the container
    hiddenRightContainer.appendChild(label2);
    hiddenRightContainer.appendChild(trueButton);
    hiddenRightContainer.appendChild(falseButton);

    AFRAME.scenes[0].appendChild(hiddenRightContainer);

    // create the <a-gui-flex-container> element
    const colorContainer = document.createElement("a-gui-flex-container");
    colorContainer.setAttribute("id", "color");
    colorContainer.setAttribute("flex-direction", "column");
    colorContainer.setAttribute("justify-content", "flexStart");
    colorContainer.setAttribute("align-items", "normal");
    colorContainer.setAttribute("component-padding", "1");
    colorContainer.setAttribute("opacity", "0.8");
    colorContainer.setAttribute("width", "4.5");
    colorContainer.setAttribute("height", "4.5");
    colorContainer.setAttribute("panel-color", "#212121");
    colorContainer.setAttribute("panel-rounded", "0.2");
    colorContainer.setAttribute("position", "0 12.5 -10");
    colorContainer.setAttribute("rotation", "0 0 0");

    // create the <a-gui-label> element
    const label3 = document.createElement("a-gui-label3");
    label3.setAttribute("width", "3");
    label3.setAttribute("height", "0.7");
    label3.setAttribute("value", "Color By");
    label3.setAttribute("font-size", "0.35");
    label3.setAttribute("line-height", "0.8");
    label3.setAttribute("position", "0 0 0");

    // create the <a-gui-button> elements
    const shearForceButton = document.createElement("a-gui-button");
    shearForceButton.setAttribute("width", "3");
    shearForceButton.setAttribute("height", "0.7");
    shearForceButton.setAttribute("onclick", "update_color('Shear Force')");
    shearForceButton.setAttribute("font-size", "0.3");
    shearForceButton.setAttribute("value", "Shear Force");

    const bendingMomentButton = document.createElement("a-gui-button");
    bendingMomentButton.setAttribute("width", "3");
    bendingMomentButton.setAttribute("height", "0.7");
    bendingMomentButton.setAttribute("onclick", "update_color('Bending Moment')");
    bendingMomentButton.setAttribute("font-size", "0.3");
    bendingMomentButton.setAttribute("value", "Bending Moment");

    const noneButton = document.createElement("a-gui-button");
    noneButton.setAttribute("width", "3");
    noneButton.setAttribute("height", "0.7");
    noneButton.setAttribute("onclick", "update_color('None')");
    noneButton.setAttribute("font-size", "0.3");
    noneButton.setAttribute("value", "None");

    // append the elements to the <a-gui-flex-container> element
    colorContainer.appendChild(label3);
    colorContainer.appendChild(shearForceButton);
    colorContainer.appendChild(bendingMomentButton);
    colorContainer.appendChild(noneButton);

    AFRAME.scenes[0].appendChild(colorContainer);

    // create the <a-gui-flex-container> element
    const loadContainer = document.createElement("a-gui-flex-container");
    loadContainer.setAttribute("id", "load");
    loadContainer.setAttribute("flex-direction", "column");
    loadContainer.setAttribute("justify-content", "center");
    loadContainer.setAttribute("align-items", "normal");
    loadContainer.setAttribute("component-padding", "0.3");
    loadContainer.setAttribute("opacity", "0.8");
    loadContainer.setAttribute("width", "3.5");
    loadContainer.setAttribute("height", "4.5");
    loadContainer.setAttribute("panel-color", "#072B73");
    loadContainer.setAttribute("panel-rounded", "0.2");
    loadContainer.setAttribute("position", "6 10 -10");
    loadContainer.setAttribute("rotation", "0 -15 0");

    // create the <a-gui-label> element
    const label4 = document.createElement("a-gui-label");
    label4.setAttribute("width", "2.5");
    label4.setAttribute("height", "0.75");
    label4.setAttribute("value", "Applied Displacement");
    label4.setAttribute("font-size", "0.35");
    label4.setAttribute("line-height", "0.8");
    label4.setAttribute("position", "0 0 0");

    // create the <a-gui-slider> element
    const slider = document.createElement("a-gui-slider");
    slider.setAttribute("width", "2.5");
    slider.setAttribute("height", "0.75");
    slider.setAttribute("onclick", "update_applied_displacement");
    slider.setAttribute("percent", "0.1");
    slider.setAttribute("position", "0 0 0.1");
    slider.setAttribute("margin", "0 0 0 0");

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

    loadContainer.appendChild(label4);
    loadContainer.appendChild(slider);
    loadContainer.appendChild(loadPositionLabel)
    loadContainer.appendChild(loadPositionSlider)

    AFRAME.scenes[0].appendChild(loadContainer);

})