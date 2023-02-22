import {params, beam_offset} from '../utils/params'
import * as PHYSICS from '../utils/physics.js';
import { Lut } from 'three/examples/jsm/math/Lut.js';

let lut;
let cooltowarm = new Lut("cooltowarm", 512); // options are rainbow, cooltowarm and blackbody

function redraw_beam(beam) {
    console.log("redraw beam")

    PHYSICS.updateDeformation(params);
    beam.geometry.setAttribute('position', new THREE.BufferAttribute(PHYSICS.positions, 3));
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
        } else if (params.colour_by === 'Shear Force') {
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
        beam.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        beam.geometry.attributes.color.needsUpdate = true;
        beam.material.needsUpdate = true;

    }

}



AFRAME.registerComponent('beam', {
    schema: {
        length: { type: 'number', default: params.length },
        height: { type: 'number', default: params.height },
        depth: { type: 'number', default: params.depth },
        applied_displacement: { type: 'number', default: params.displacement.y },
        load_position: { type: 'number', default: params.load_position },
        color_by: { type: 'string', default: params.colour_by }
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
        this.mesh.rotation.set(165,0,0)
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