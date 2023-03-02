import {params, beam_offset} from '../../utils/params'
import * as PHYSICS from '../../utils/physics.js';
import { Lut } from 'three/examples/jsm/math/Lut.js';
let lut;
let cooltowarm = new Lut("cooltowarm", 512); // options are rainbow, cooltowarm and blackbody


AFRAME.registerComponent('i_beam', {
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

        this.data['applied_displacementMin'] = 0
        this.data['applied_displacementMax'] =0.5
        this.data['load_positionMin'] =0
        this.data['load_positionMax'] = data.length

        var modelEntity = document.querySelector('#i_beam');
        modelEntity.addEventListener('model-loaded', this.onModelLoaded.bind(this));
      
    },
    update: function() {
        var data = this.data;
        if(!this.mesh){
            return
        }
        console.log("redrawing beam")


        params.load_position = data.load_position
        params.displacement.y = data.applied_displacement
        params.visible = data.color_visibility;
        console.log("before")
        console.log(this.mesh.geometry.attributes.position)
        PHYSICS.updateDeformation(params);
        this.mesh.geometry.setAttribute('position', new THREE.BufferAttribute(PHYSICS.positions, 3));
        this.mesh.geometry.attributes.position.needsUpdate = true;
        console.log("after")
        console.log(this.mesh.geometry.attributes.position)

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
        variables['applied_displacement'] = data.applied_displacement;
        variables['load_position'] = data.load_position;

       
        return variables;
        

    },
    onModelLoaded: function (event) {
        var data = this.data;

        this.mesh = event.detail.model.children[0];
        console.log(this.mesh)
        let box3 = new THREE.Box3().setFromObject(this.mesh);
        let size = new THREE.Vector3();

        // Now you can manipulate the mesh, for example changing its material color
        console.log(box3.getSize(size))
        console.log("before 0")
        console.log(this.mesh.geometry.attributes.position)
        this.mesh.scale.set(data.depth, data.height, data.length);
        console.log("after 0")
        console.log(this.mesh.geometry.attributes.position)
        // this.mesh.position.add(beam_offset); // move the beam away from the start location
        const type = 'i_beam';
        this.mesh.userData.type = type; // this sets up interaction group for controllers

        PHYSICS.set_initial_position(this.mesh.geometry.attributes.position.array);

      }

});