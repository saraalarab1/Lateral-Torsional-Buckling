import {params, beam_offset} from '../../utils/params'
import * as PHYSICS from '../../utils/physics.js';
import { Lut } from 'three/examples/jsm/math/Lut.js';
let lut;
let cooltowarm = new Lut("cooltowarm", 512); // options are rainbow, cooltowarm and blackbody


AFRAME.registerComponent('beam', {
    schema: {
        length: { type: 'number', default: params.length },
        height: { type: 'number', default: params.height },
        depth: { type: 'number', default: params.depth },
        applied_displacement: { type: 'number', default: params.displacement.y },
        load_position: { type: 'number', default: params.load_position },
        color_by: { type: 'string', default: params.colour_by },
        color_visibility: {default: false}
    },

    /**
     * Initial creation and setting of the mesh.
     */
    init: function() {
        var data = this.data;
        var el = this.el;

        this.data['depthMin'] = 0.1
        this.data['depthMax'] = 2
        this.data['lengthMin'] = 6
        this.data['lengthMax'] = 30
        this.data['applied_displacementMin'] = 0
        this.data['applied_displacementMax'] =1
        this.data['load_positionMin'] =0
        this.data['load_positionMax'] = data.length

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
        this.data['load_positionMax'] = data.length
        params.length = data.length
        params.height = data.height
        params.depth = data.depth
        params.load_position = data.load_position
        params.displacement.y = data.applied_displacement
        params.visible = data.color_visibility;
        PHYSICS.updateDeformation(params);
        this.mesh.geometry.setAttribute('position', new THREE.BufferAttribute(PHYSICS.positions, 3));
        this.mesh.geometry.attributes.position.needsUpdate = true;

        if (params.colour_by === 'None') {
            let colors = [];
            for (let i = 0; i < PHYSICS.shear_force.length; i++) {
                colors.push(1, 1, 1);
            }
    
            this.mesh.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            this.mesh.geometry.attributes.color.needsUpdate = true;
            this.mesh.material.needsUpdate = true;
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
            this.mesh.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            this.mesh.geometry.attributes.color.needsUpdate = true;
            this.mesh.material.needsUpdate = true;
    
        }

    },
    getVariables: function(){
        var data = this.data;

        let variables = {}
        variables['length'] = data.length;
        variables['depth'] = data.depth;
        variables['applied_displacement'] = data.applied_displacement;
        variables['load_position'] = data.load_position;

       
        return variables;
        

    }

});