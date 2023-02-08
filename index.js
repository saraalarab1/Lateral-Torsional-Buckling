let params = {
    length: 20, // beam length (m)
    depth: 0.2,
    height: 1.5,
    left: 'Pin',
    right: 'Pin',
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

window.onload = function(){

const scene = document.querySelector('a-scene');
const entity = document.createElement('a-entity');
const group = new THREE.Group();

// Create the left_support entity
const leftSupport = document.createElement('a-entity');
leftSupport.setAttribute('left_support', '');

// Create the beam entity
const beam = document.createElement('a-entity');
beam.setAttribute('beam', '');

// Create the right_support entity
const rightSupport = document.createElement('a-entity');
rightSupport.setAttribute('right_support', '');

// Add the Three.js objects of each entity to the group
group.add(leftSupport.object3D.el.object3D);
group.add(beam.object3D.el.object3D);
group.add(rightSupport.object3D.el.object3D);

entity.appendChild(leftSupport);
entity.appendChild(beam);
entity.appendChild(rightSupport);

entity.setAttribute('object3D', {threeObject: group});
scene.appendChild(entity);

}

AFRAME.registerComponent('beam', {
    schema: {
      length: {type: 'number', default: params.length},
      height: {type: 'number', default: params.height},
      depth:  {type: 'number', default: params.depth},
    },
  
    /**
     * Initial creation and setting of the mesh.
     */
    init: function () {
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
    update: function () {
      var data = this.data;

      this.mesh.scale.set(data.length, data.height, data.depth);
      params.length = data.length
      params.height = data.height
      params.depth = data.depth
      updateDeformation(params);

    },

  });

  AFRAME.registerComponent('right_support', {
    schema: {
        support_type: {type: 'string', default: params.right},
        length: {type: 'number', default: params.length},
        height: {type: 'number', default: params.height},
        depth:  {type: 'number', default: params.depth},
    },
  
    /**
     * Initial creation and setting of the mesh.
     */
    init: function () {
        var data = this.data;
        var el = this.el;

        let pin_geometry = new THREE.CylinderGeometry(pin_radius, pin_radius, data.depth + 2 * pin_radius, 20, 32);
        let fixed_geometry = new THREE.BoxGeometry(pin_radius, data.height + 2 * pin_radius, data.depth + 2 * pin_radius);
        let support_material = new THREE.MeshStandardMaterial({ color: 0xcccccc, vertexColors: false });

        if (data.support_type == 'Pin'){
            this.mesh = new THREE.Mesh(pin_geometry, support_material);
            this.mesh.position.set(data.length / 2., -data.height / 2 - pin_radius, 0);
            this.mesh.position.add(beam_offset);
            this.mesh.rotation.x = Math.PI / 2.;
        }
        else if (data.support_type === 'Fixed') {
            this.mesh = new THREE.Mesh(fixed_geometry, support_material);
    
            this.mesh.position.set(data.length / 2. + pin_radius / 2., 0, 0);
            this.mesh.position.add(beam_offset);
        }
        else if (data.support_type === 'Free') {
            let material = support_material.clone();
            material.transparent = true;
            material.opacity = 0.3;
            this.mesh = new THREE.Mesh(fixed_geometry, material);
    
            this.mesh.position.set(data.length / 2., -data.height / 2 - pin_radius, 0);
            this.mesh.position.add(beam_offset);
            this.mesh.rotation.x = Math.PI / 2.;
    
        }
        this.mesh.name = 'Left support'
        this.mesh.userData.type = 'left_support'; // this sets up interaction group for controllers
        // Set mesh on entity.
        el.setObject3D('mesh', this.mesh);
    }
  });

  AFRAME.registerComponent('left_support', {
    schema: {
      support_type: {type: 'string', default: params.right},
    
    },
  
    /**
     * Initial creation and setting of the mesh.
     */
    init: function () {
        var data = this.data;
        var el = this.el;

        let pin_geometry = new THREE.CylinderGeometry(pin_radius, pin_radius, params.depth + 2 * pin_radius, 20, 32);
        let fixed_geometry = new THREE.BoxGeometry(pin_radius, params.height + 2 * pin_radius, params.depth + 2 * pin_radius);
        let support_material = new THREE.MeshStandardMaterial({ color: 0xcccccc, vertexColors: false });

        if (data.support_type == 'Pin'){
            this.mesh = new THREE.Mesh(pin_geometry, support_material);
    
            this.mesh.position.set(-params.length / 2., -params.height / 2 - pin_radius, 0);
            this.mesh.position.add(beam_offset);
            this.mesh.rotation.x = Math.PI / 2.;
        }   
        else if (data.support_type === 'Fixed') {
            this.mesh =  new THREE.Mesh(fixed_geometry, support_material);
    
            this.mesh.position.set(-params.length / 2. - pin_radius / 2., 0, 0);
            this.mesh.position.add(beam_offset);
        }
        else if (data.support_type === 'Free') {
            let material = support_material.clone();
            material.transparent = true;
            material.opacity = 0.3;
            this.mesh = new THREE.Mesh(fixed_geometry, material);
    
            this.mesh.position.set(-params.length / 2., -params.height / 2 - pin_radius, 0);
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

    init: function () {
      // Do something when component first attached.
    },

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
});

