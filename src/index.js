import * as PHYSICS from './physics.js';

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
let font;
let BMD,SFD,box;

let beam_offset = new THREE.Vector3(0, 4, -10);
let scene;
let lut;
// let cooltowarm = new Lut("cooltowarm", 512); // options are rainbow, cooltowarm and blackbody
// let cooltowarm = new THREE.Lut('cooltowarm', 512); // options are rainbow, cooltowarm and blackbody
var cooltowarm = {};

// Define the color map
cooltowarm.colorMap = [
  [0, 0, 1],   // Blue
  [1, 1, 1],   // White
  [1, 0, 0]    // Red
];

// Define the min and max values for the LUT
cooltowarm.minValue = 0;
cooltowarm.maxValue = 1;

// Define a function to set the min value for the LUT
cooltowarm.setMin = function(minValue) {
  this.minValue = minValue;
};

// Define a function to set the max value for the LUT
cooltowarm.setMax = function(maxValue) {
  this.maxValue = maxValue;
};

// Define a function to get the color value for a given index
cooltowarm.getColor = function(index) {
  if (typeof index !== 'number') {
    console.error('Invalid index: ' + index);
    return null;
  }
  if (isNaN(index)) {
    index = 0;
  }

  var colorIndex = Math.floor((index - this.minValue) / (this.maxValue - this.minValue) * (this.colorMap.length - 1));
  if (colorIndex < 0 || colorIndex >= this.colorMap.length) {
    return {
      isColor: true,
      r: 1,
      g: 1,
      b: 1
    };
  }
  return {
    isColor: true,
    r: this.colorMap[colorIndex][0],
    g: this.colorMap[colorIndex][1],
    b: this.colorMap[colorIndex][2]
  };
};



window.onload = function() {

    scene = document.querySelector('a-scene');
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
        lengthSlider.setAttribute("slider-length","");
        lengthSlider.setAttribute("percent",(params.length - 6) / (50 - 5));
        lengthSlider.setAttribute("position", "0 0 0.1");
    // lengthSlider.addEventListener('onChange', update_beam_length())
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
        heightSlider.setAttribute("onclick", update_beam_height);
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
        depthSlider.setAttribute("onclick", update_beam_depth);
        depthSlider.setAttribute("percent", params.depth);
        depthSlider.setAttribute("position", "0 -2 0.1");

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
        loadPositionSlider.setAttribute("onclick", update_load_position);
        loadPositionSlider.setAttribute("percent", (params.length - 6) / (50 - 5));
        loadPositionSlider.setAttribute("position", "0 1 0.1");

    flexContainer2.appendChild(loadPositionLabel)
    flexContainer2.appendChild(loadPositionSlider)

}

export function update_beam_length(click, percent) {
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
    document.getElementById('beam').setAttribute('percent', params.length);
}

export function update_beam_height(click,percent) {
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

export function update_beam_depth(click,percent) {
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


export function update_applied_displacement(click, percent) {
  percent = (percent * 0.5).toFixed(4);
  params.displacement.y = percent;
  console.log(percent)

  document.getElementById('beam').setAttribute('beam', {
    applied_displacement: params.displacement.y,
});

}

export function update_load_position(click, percent) {
  percent = ((percent * (20 - 1)) + 1).toFixed(2);
  params.load_position = percent;
  console.log(percent)

  document.getElementById('beam').setAttribute('beam', {
    load_position: params.load_position,
});

}

export function update_left(value) {
  params.left = value;
  document.getElementById('left_support').setAttribute('left_support', {
      support_type: params.left,
      length: params.length,
      height: params.height,
      depth: params.depth,
  });
}

export function update_right(value) {
  params.right = value;
  document.getElementById('right_support').setAttribute('right_support', {
      support_type: params.right,
      length: params.length,
      height: params.height,
      depth: params.depth,
  });
}

function redraw_beam(beam) {
  console.log("redraw beam")

  PHYSICS.updateDeformation(params);
  beam.geometry.addAttribute('position', new THREE.BufferAttribute(PHYSICS.positions, 3));
  beam.geometry.attributes.position.needsUpdate = true;

  if (params.colour_by === 'None') {
      let colors = [];
      for (let i = 0; i < PHYSICS.shear_force.length; i++) {
          colors.push(1, 1, 1);
      }

      beam.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      beam.geometry.attributes.color.needsUpdate = true;
      beam.material.needsUpdate = true;
  } else {
      let arr, max_val;
      if (params.colour_by === 'Bending Moment') {
          arr = PHYSICS.bending_moment;
          lut = cooltowarm;
          max_val = PHYSICS.M_max;
      }
      else if (params.colour_by === 'Shear Force') {
          arr = PHYSICS.shear_force;
          lut = cooltowarm;
          max_val = PHYSICS.SF_max;
      }
      const colors = [];

      if (max_val > 0) {
          lut.setMin(-max_val);
          lut.setMax(max_val);
          for (let i = 0; i < arr.length; i++) {
              const colorValue = arr[i];
              const color = lut.getColor(colorValue);
              colors.push(color.r, color.g, color.b);
          }
      } else {
          for (let i = 0; i < arr.length; i++) {
              colors.push(0, 0, 0);
          }
      }
      beam.geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      beam.geometry.attributes.color.needsUpdate = true;
      beam.material.needsUpdate = true;

  }

}

AFRAME.registerComponent('slider-length',{
    init: function () {

    console.log("***")
    // Get the target element to add the listener to
    const el = this.el;

    // Add the onchange listener to the target element
    // el.addEventListener('onClick', function (event) {
    //     console.log("***")
    //     var percent = el.getAttribute('percent');
    //     console.log('Slider value changed to ' + percent);
    // });

    
    },
    update: function(){
        const el = this.el;

        console.log("***")
        var percent = el.getAttribute('percent');
        console.log('Slider value changed to ' + percent);
    }
   
})

AFRAME.registerComponent('beam', {
    schema: {
        length: { type: 'number', default: params.length },
        height: { type: 'number', default: params.height },
        depth: { type: 'number', default: params.depth },
        applied_displacement: { type: 'number', default: params.displacement.y },
        load_position: { type: 'number', default: params.load_position },
    },

    /**
     * Initial creation and setting of the mesh.
     */
    init: function() {
        var data = this.data;
        var el = this.el;
        // Create geometry.
        this.geometry = new THREE.BoxBufferGeometry(1, 1, 1, params.np, 1, 1);

        // Create material.
        this.material = new THREE.MeshStandardMaterial({ color: 0xcccccc, vertexColors: true });

        // Create mesh.
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.scale.set(data.length, data.height, data.depth);
        this.mesh.position.add(beam_offset); // move the beam away from the start location

        const type = 'beam';
        this.mesh.userData.type = type; // this sets up interaction group for controllers

        PHYSICS.set_initial_position(this.mesh.geometry.attributes.position.array);
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
        redraw_beam(this.mesh);

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

        let pin_geometry = new THREE.CylinderBufferGeometry(pin_radius, pin_radius, data.depth + 2 * pin_radius, 20, 32);
        let fixed_geometry = new THREE.BoxBufferGeometry(pin_radius, data.height + 2 * pin_radius, data.depth + 2 * pin_radius);
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

        let pin_geometry = new THREE.CylinderBufferGeometry(pin_radius, pin_radius, data.depth + 2 * pin_radius, 20, 32);
        let fixed_geometry = new THREE.BoxBufferGeometry(pin_radius, data.height + 2 * pin_radius, data.depth + 2 * pin_radius);
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
        // updateDeformation(params);

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

        let pin_geometry = new THREE.CylinderBufferGeometry(pin_radius, pin_radius, data.depth + 2 * pin_radius, 20, 32);
        let fixed_geometry = new THREE.BoxBufferGeometry(pin_radius, data.height + 2 * pin_radius, data.depth + 2 * pin_radius);
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

        let pin_geometry = new THREE.CylinderBufferGeometry(pin_radius, pin_radius, data.depth + 2 * pin_radius, 20, 32);
        let fixed_geometry = new THREE.BoxBufferGeometry(pin_radius, data.height + 2 * pin_radius, data.depth + 2 * pin_radius);
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


function animate() {
  requestAnimationFrame( animate );
  render();
  controls.update();
}