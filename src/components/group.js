window.addEventListener("load", (event) => {

    const entity = document.createElement('a-entity');
    const group = new THREE.Group();

    // Create the left_support entity
    const leftSupport = document.createElement('a-entity');
    leftSupport.setAttribute('left_support', '');
    leftSupport.setAttribute("id", "left_support");
    // Create the beam entity
    const beam = document.createElement('a-entity');
    beam.setAttribute('beam', '');
    beam.setAttribute("id", "beam")

    // Create the right_support entity
    const rightSupport = document.createElement('a-entity');
    rightSupport.setAttribute('right_support', '');
    rightSupport.setAttribute("id", "right_support");
    // Add the Three.js objects of each entity to the group
    group.add(leftSupport.object3D.el.object3D);
    group.add(beam.object3D.el.object3D);
    group.add(rightSupport.object3D.el.object3D);

    entity.appendChild(leftSupport);
    entity.appendChild(beam);
    entity.appendChild(rightSupport);

    entity.setAttribute('object3D', { threeObject: group });

    AFRAME.scenes[0].appendChild(entity);

})