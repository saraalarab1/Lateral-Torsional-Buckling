import * as PHYSICS_UPPER from '../utils/physics_upper';
import { beam_upper_offset, params_upper } from '../utils/params';

import { Lut } from 'three/examples/jsm/math/Lut.js';

let lut;
let cooltowarm = new Lut("cooltowarm", 512); // options are rainbow, cooltowarm and blackbody

function redraw_beam_upper(beam) {
    console.log("redraw beam")

    PHYSICS_UPPER.updateDeformation_upper(params_upper);
    beam.geometry.setAttribute('position', new THREE.BufferAttribute(PHYSICS_UPPER.positions_upper, 3));
    beam.geometry.attributes.position.needsUpdate = true;

    if (params_upper.colour_by === 'None') {
        let colors = [];
        for (let i = 0; i < PHYSICS_UPPER.shear_force_upper.length; i++) {
            colors.push(1, 1, 1);
        }

        beam.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        beam.geometry.attributes.color.needsUpdate = true;
        beam.material.needsUpdate = true;
    } else {
        let arr, max_val;
        if (params_upper.colour_by === 'Bending Moment') {
            arr = PHYSICS_UPPER.bending_moment_upper;
            lut = cooltowarm;
            max_val = PHYSICS_UPPER.M_max_upper;
        } else if (params_upper.colour_by === 'Shear Force') {
            arr = PHYSICS_UPPER.shear_force_upper;
            lut = cooltowarm;
            max_val = PHYSICS_UPPER.SF_max_upper;
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

AFRAME.registerComponent('beam_upper', {
    schema: {
        length: { type: 'number', default: params_upper.length },
        height: { type: 'number', default: params_upper.height },
        depth: { type: 'number', default: params_upper.depth },
        applied_displacement: { type: 'number', default: params_upper.displacement.y },
        load_position: { type: 'number', default: params_upper.load_position },
        color_by: { type: 'string', default: params_upper.colour_by }
    },

    /**
     * Initial creation and setting of the mesh.
     */
    init: function() {
        var data = this.data;
        var el = this.el;
        // Create geometry.
        this.geometry = new THREE.BoxBufferGeometry(1, 1, 1, params_upper.np, 1, 1);

        // Create material.
        this.material = new THREE.MeshStandardMaterial({ color: 0xcccccc, vertexColors: true });

        // Create mesh.
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        
        this.mesh.scale.set(data.length, data.height, data.depth);
        this.mesh.position.add(beam_upper_offset); // move the beam away from the start location
        // this.mesh.position.add(beam_offset); // move the beam away from the start location

        const type = 'beam_upper';
        this.mesh.userData.type = type; // this sets up interaction group for controllers

        PHYSICS_UPPER.set_initial_position_upper(this.mesh.geometry.attributes.position.array);
        // Set mesh on entity.
        el.setObject3D('mesh', this.mesh);
    },
    update: function() {
        var data = this.data;

        this.mesh.scale.set(data.length, data.height, data.depth);
        console.log('updating')
        params_upper.length = data.length
        params_upper.height = data.height
        params_upper.depth = data.depth
        redraw_beam_upper(this.mesh);

    },

});