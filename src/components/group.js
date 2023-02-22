import { params } from "../utils/params";

window.addEventListener("load", (event) => {

    const entity = document.createElement('a-entity');
    const group = new THREE.Group();

    // Create the left_support entity
    const leftSupport = document.createElement('a-entity');
    leftSupport.setAttribute('left_support', '');
    leftSupport.setAttribute("id", "left_support");
    leftSupport.setAttribute('visible', params.visible);
    // Create the beam entity
    const beam = document.createElement('a-entity');
    beam.setAttribute('beam', '');
    beam.setAttribute("id", "beam");

    const beam_upper = document.createElement('a-entity');
    beam_upper.setAttribute('beam_upper', '');
    beam_upper.setAttribute("id", "beam_upper");

    const beam_lower = document.createElement('a-entity');
    beam_lower.setAttribute('beam_lower', '');
    beam_lower.setAttribute("id", "beam_lower");

    // Create the right_support entity
    const rightSupport = document.createElement('a-entity');
    rightSupport.setAttribute('right_support', '');
    rightSupport.setAttribute("id", "right_support");
    rightSupport.setAttribute('visible', params.visible);

    // Add the Three.js objects of each entity to the group
    group.add(leftSupport.object3D.el.object3D);
    group.add(beam_upper.object3D.el.object3D);
    group.add(beam.object3D.el.object3D);
    group.add(beam_lower.object3D.el.object3D);
    group.add(rightSupport.object3D.el.object3D);

    entity.appendChild(leftSupport);
    entity.appendChild(beam);
    entity.appendChild(beam_upper);
    entity.appendChild(beam_lower);
    entity.appendChild(rightSupport);

    entity.setAttribute('object3D', { threeObject: group });

    AFRAME.scenes[0].appendChild(entity);

})