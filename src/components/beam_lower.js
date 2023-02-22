import * as PHYSICS_LOWER from '../utils/physics_lower';
import { beam_lower_offset, beam_offset, params_lower } from '../utils/params';
import { Lut } from 'three/examples/jsm/math/Lut.js';

let lut;
let cooltowarm = new Lut("cooltowarm", 512); // options are rainbow, cooltowarm and blackbody

function redraw_beam_lower(beam) {
    console.log("redraw beam")

    PHYSICS_LOWER.updateDeformation_lower(params_lower);
    beam.geometry.setAttribute('position', new THREE.BufferAttribute(PHYSICS_LOWER.positions_lower, 3));
    beam.geometry.attributes.position.needsUpdate = true;

    if (params_lower.colour_by === 'None') {
        let colors = [];
        for (let i = 0; i < PHYSICS_LOWER.shear_force_lower.length; i++) {
            colors.push(1, 1, 1);
        }

        beam.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        beam.geometry.attributes.color.needsUpdate = true;
        beam.material.needsUpdate = true;
    } else {
        let arr, max_val;
        if (params_lower.colour_by === 'Bending Moment') {
            arr = PHYSICS_LOWER.bending_moment_lower;
            lut = cooltowarm;
            max_val = PHYSICS_LOWER.M_max_lower;
        } else if (params_lower.colour_by === 'Shear Force') {
            arr = PHYSICS_LOWER.shear_force_lower;
            lut = cooltowarm;
            max_val = PHYSICS_LOWER.SF_max_lower;
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
        beam.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        beam.geometry.attributes.color.needsUpdate = true;
        beam.material.needsUpdate = true;

    }

}


AFRAME.registerComponent('beam_lower', {
    schema: {
        length: { type: 'number', default: params_lower.length },
        height: { type: 'number', default: params_lower.height },
        depth: { type: 'number', default: params_lower.depth },
        applied_displacement: { type: 'number', default: params_lower.displacement.y },
        load_position: { type: 'number', default: params_lower.load_position },
        color_by: { type: 'string', default: params_lower.colour_by }
    },

    /**
     * Initial creation and setting of the mesh.
     */
    init: function() {
        var data = this.data;
        var el = this.el;
        // Create geometry.
        this.geometry = new THREE.BoxBufferGeometry(1, 1, 1, params_lower.np, 1, 1);

        // Create material.
        this.material = new THREE.MeshStandardMaterial({ color: 0xcccccc, vertexColors: true });

        // Create mesh.
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        
        this.mesh.scale.set(data.length, data.height, data.depth);
        this.mesh.position.add(beam_lower_offset); // move the beam away from the start location

        const type = 'beam_lower';
        this.mesh.userData.type = type; // this sets up interaction group for controllers

        PHYSICS_LOWER.set_initial_position_lower(this.mesh.geometry.attributes.position.array);
        // Set mesh on entity.
        el.setObject3D('mesh', this.mesh);
    },
    update: function() {
        var data = this.data;

        this.mesh.scale.set(data.length, data.height, data.depth);

        console.log('updating')
        params_lower.length = data.length
        params_lower.height = data.height
        params_lower.depth = data.depth
        redraw_beam_lower(this.mesh);

    },

});