let beamLength = 20;

let params = {
    length: beamLength, // beam length (m)
    depth: 0.2,
    height: 1.5,
    left: 'Pin',
    right: 'Fixed',
    applied_load: 0,
    load_position: 10,
    youngs_modulus: 215,
    colour_by: 'Bending Moment',
    np: 100, // number of points along beam
    displacement_control: true,
    displacement: new THREE.Vector3(0, 0.25, 0),
}
let pin_radius;
pin_radius = 1;

let beam_offset = new THREE.Vector3(0, 4, -10);

window.onload = function() {

    const scene = document.querySelector('a-scene');
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

    scene.appendChild(entity);

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
        lengthSlider.setAttribute("percent",(params.length - 6) / (50 - 5));
        lengthSlider.setAttribute("position", "0 0 0.1");

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

    flexContainer.appendChild(lengthLabel)
    flexContainer.appendChild(lengthSlider)
    flexContainer.appendChild(heightLabel)
    flexContainer.appendChild(heightSlider)
    flexContainer.appendChild(depthLabel)
    flexContainer.appendChild(depthSlider)

}

function update_beam_length(click, percent) {
  percent = ((percent * (50 - 5)) + 5).toFixed(1);
  params.length = percent;
  console.log(percent)

    document.getElementById('beam').setAttribute('beam', {
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
    document.getElementById('right_support').setAttribute('right_support', {
        support_type: params.right,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
    document.getElementById('left_support').setAttribute('left_support', {
        support_type: params.left,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
}

function update_beam_height(click,percent) {
  percent = ((percent * (1.5 - 0.1)) + 0.1).toFixed(1);
  params.height = percent;
  console.log(percent)

    document.getElementById('beam').setAttribute('beam', {
        length: params.length,
        height: params.height,
        depth: params.depth
    });
    document.getElementById('right_support').setAttribute('right_support', {
        support_type: params.right,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
    document.getElementById('left_support').setAttribute('left_support', {
        support_type: params.left,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
}

function update_beam_depth(click,percent) {
    percent = percent.toFixed(2);
    params.depth = percent;
    console.log(percent)

    document.getElementById('beam').setAttribute('beam', {
        length: params.length,
        height: params.height,
        depth: params.depth
    });
    document.getElementById('right_support').setAttribute('right_support', {
        support_type: params.right,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
    document.getElementById('left_support').setAttribute('left_support', {
        support_type: params.left,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
}


function update_applied_displacement(click, percent) {
  percent = (percent * 0.5).toFixed(4);
  params.height = percent;
  console.log(percent)

}

function update_load_position(click, percent) {
  percent = ((percent * (20 - 1)) + 1).toFixed(2);
  params.height = percent;
  console.log(percent)

}

function update_left(value) {
  params.left = value;
  document.getElementById('left_support').setAttribute('left_support', {
      support_type: params.left,
      length: params.length,
      height: params.height,
      depth: params.depth,
  });
}

function update_right(value) {
  params.right = value;
  document.getElementById('right_support').setAttribute('right_support', {
      support_type: params.right,
      length: params.length,
      height: params.height,
      depth: params.depth,
  });
}

AFRAME.registerComponent('beam', {
    schema: {
        length: { type: 'number', default: params.length },
        height: { type: 'number', default: params.height },
        depth: { type: 'number', default: params.depth },
    },

    /**
     * Initial creation and setting of the mesh.
     */
    init: function() {
        var data = this.data;
        var el = this.el;
        // Create geometry.
        this.geometry = new THREE.BoxGeometry(1, 1, 1, params.np, 1, 1);

        // Create material.
        this.material = new THREE.MeshStandardMaterial({ color: 0xcccccc, vertexColors: true });

        // Create mesh.
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.scale.set(data.length, data.height, data.depth);
        this.mesh.position.add(beam_offset); // move the beam away from the start location

        const type = 'beam';
        this.mesh.userData.type = type; // this sets up interaction group for controllers

        set_initial_position(this.mesh.geometry.vertices);

        // Set mesh on entity.
        el.setObject3D('mesh', this.mesh);
    },
    update: function() {
        var data = this.data;

        this.mesh.scale.set(data.length, data.height, data.depth);
        console.log('updating')
        params.length = data.length
        params.height = data.height
        params.depth = data.depth
        updateDeformation(params);

    },

});

AFRAME.registerComponent('right_support', {
    schema: {
        support_type: { type: 'string', default: params.right },
        length: { type: 'number', default: params.length },
        height: { type: 'number', default: params.height },
        depth: { type: 'number', default: params.depth },
    },

    /**
     * Initial creation and setting of the mesh.
     */
    init: function() {
        var data = this.data;
        var el = this.el;

        let pin_geometry = new THREE.CylinderGeometry(pin_radius, pin_radius, data.depth + 2 * pin_radius, 20, 32);
        let fixed_geometry = new THREE.BoxGeometry(pin_radius, data.height + 2 * pin_radius, data.depth + 2 * pin_radius);
        let support_material = new THREE.MeshStandardMaterial({ color: 0xcccccc, vertexColors: false });

        if (data.support_type == 'Pin') {
            this.mesh = new THREE.Mesh(pin_geometry, support_material);
            this.mesh.position.set(data.length / 2., -data.height / 2 - pin_radius, 0);
            this.mesh.position.add(beam_offset);
            this.mesh.rotation.x = Math.PI / 2.;
        } else if (data.support_type === 'Fixed') {
            this.mesh = new THREE.Mesh(fixed_geometry, support_material);

            this.mesh.position.set(data.length / 2. + pin_radius / 2., 0, 0);
            this.mesh.position.add(beam_offset);
        } else if (data.support_type === 'Free') {
            let material = support_material.clone();
            material.transparent = true;
            material.opacity = 0.3;
            this.mesh = new THREE.Mesh(fixed_geometry, material);

            this.mesh.position.set(data.length / 2., -data.height / 2 - pin_radius, 0);
            this.mesh.position.add(beam_offset);
            this.mesh.rotation.x = Math.PI / 2.;

        }
        this.mesh.name = 'Right Support'
        this.mesh.userData.type = 'right_support'; // this sets up interaction group for controllers
        // Set mesh on entity.
        el.setObject3D('mesh', this.mesh);
    },
    update: function() {
        var data = this.data;
        var el = this.el;

        let pin_geometry = new THREE.CylinderGeometry(pin_radius, pin_radius, data.depth + 2 * pin_radius, 20, 32);
        let fixed_geometry = new THREE.BoxGeometry(pin_radius, data.height + 2 * pin_radius, data.depth + 2 * pin_radius);
        let support_material = new THREE.MeshStandardMaterial({ color: 0xcccccc, vertexColors: false });

        if (data.support_type == 'Pin') {
            this.mesh = new THREE.Mesh(pin_geometry, support_material);
            this.mesh.position.set(data.length / 2., -data.height / 2 - pin_radius, 0);
            this.mesh.position.add(beam_offset);
            this.mesh.rotation.x = Math.PI / 2.;
        } else if (data.support_type === 'Fixed') {
            this.mesh = new THREE.Mesh(fixed_geometry, support_material);

            this.mesh.position.set(data.length / 2. + pin_radius / 2., 0, 0);
            this.mesh.position.add(beam_offset);
        } else if (data.support_type === 'Free') {
            let material = support_material.clone();
            material.transparent = true;
            material.opacity = 0.3;
            this.mesh = new THREE.Mesh(fixed_geometry, material);

            this.mesh.position.set(data.length / 2., -data.height / 2 - pin_radius, 0);
            this.mesh.position.add(beam_offset);
            this.mesh.rotation.x = Math.PI / 2.;

        }
        this.mesh.name = 'Right Support'
        this.mesh.userData.type = 'right_support'; // this sets up interaction group for controllers
        // Set mesh on entity.
        el.setObject3D('mesh', this.mesh);
        updateDeformation(params);

    },
});

AFRAME.registerComponent('left_support', {
    schema: {
        support_type: { type: 'string', default: params.left },
        length: { type: 'number', default: params.length },
        height: { type: 'number', default: params.height },
        depth: { type: 'number', default: params.depth },
    },

    /**
     * Initial creation and setting of the mesh.
     */
    init: function() {
        var data = this.data;
        var el = this.el;

        let pin_geometry = new THREE.CylinderGeometry(pin_radius, pin_radius, data.depth + 2 * pin_radius, 20, 32);
        let fixed_geometry = new THREE.BoxGeometry(pin_radius, data.height + 2 * pin_radius, data.depth + 2 * pin_radius);
        let support_material = new THREE.MeshStandardMaterial({ color: 0xcccccc, vertexColors: false });

        if (data.support_type == 'Pin') {
            this.mesh = new THREE.Mesh(pin_geometry, support_material);

            this.mesh.position.set(-data.length / 2., -data.height / 2 - pin_radius, 0);
            this.mesh.position.add(beam_offset);
            this.mesh.rotation.x = Math.PI / 2.;
        } else if (data.support_type === 'Fixed') {
            this.mesh = new THREE.Mesh(fixed_geometry, support_material);

            this.mesh.position.set(-data.length / 2. - pin_radius / 2., 0, 0);
            this.mesh.position.add(beam_offset);
        } else if (data.support_type === 'Free') {
            let material = support_material.clone();
            material.transparent = true;
            material.opacity = 0.3;
            this.mesh = new THREE.Mesh(fixed_geometry, material);

            this.mesh.position.set(-data.length / 2., -data.height / 2 - pin_radius, 0);
            this.mesh.position.add(beam_offset);
            this.mesh.rotation.x = Math.PI / 2.;
        }
        this.mesh.name = 'Left support'
        this.mesh.userData.type = 'left_support'; // this sets up interaction group for controllers
        // Set mesh on entity.
        el.setObject3D('mesh', this.mesh);
    },
    update: function() {
        var data = this.data;
        var el = this.el;

        let pin_geometry = new THREE.CylinderGeometry(pin_radius, pin_radius, data.depth + 2 * pin_radius, 20, 32);
        let fixed_geometry = new THREE.BoxGeometry(pin_radius, data.height + 2 * pin_radius, data.depth + 2 * pin_radius);
        let support_material = new THREE.MeshStandardMaterial({ color: 0xcccccc, vertexColors: false });

        if (data.support_type == 'Pin') {
            this.mesh = new THREE.Mesh(pin_geometry, support_material);

            this.mesh.position.set(-data.length / 2., -data.height / 2 - pin_radius, 0);
            this.mesh.position.add(beam_offset);
            this.mesh.rotation.x = Math.PI / 2.;
        } else if (data.support_type === 'Fixed') {
            this.mesh = new THREE.Mesh(fixed_geometry, support_material);

            this.mesh.position.set(-data.length / 2. - pin_radius / 2., 0, 0);
            this.mesh.position.add(beam_offset);
        } else if (data.support_type === 'Free') {
            let material = support_material.clone();
            material.transparent = true;
            material.opacity = 0.3;
            this.mesh = new THREE.Mesh(fixed_geometry, material);

            this.mesh.position.set(-data.length / 2., -data.height / 2 - pin_radius, 0);
            this.mesh.position.add(beam_offset);
            this.mesh.rotation.x = Math.PI / 2.;
        }
        this.mesh.name = 'Left support'
        this.mesh.userData.type = 'left_support'; // this sets up interaction group for controllers
        // Set mesh on entity.
        el.setObject3D('mesh', this.mesh);
    }
});

AFRAME.registerComponent('bend', {
    schema: {

    },

    init: function() {
        // Do something when component first attached.
    },

    update: function() {
        // Do something when component's data is updated.
    },

    remove: function() {
        // Do something the component or its entity is detached.
    },

    tick: function(time, timeDelta) {
        // Do something on every scene tick or frame.
    }
});