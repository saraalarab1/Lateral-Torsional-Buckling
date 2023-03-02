import {params, pin_radius, beam_offset} from '../../utils/params'



AFRAME.registerComponent('left_support', {
    schema: {
        support_type: { type: 'string', default: params.left },
        length: { type: 'number', default: params.length },
        height: { type: 'number', default: params.height },
        depth: { type: 'number', default: params.depth },
        visible:{
            default: false,
        }
    },

    /**
     * Initial creation and setting of the mesh.
     */
    init: function() {
        var data = this.data;
        var el = this.el;

        let length = data.length 
        let height = data.height

        let pin_geometry = new THREE.CylinderBufferGeometry(pin_radius, pin_radius, data.depth + 2 * pin_radius, 20, 32);
        let fixed_geometry = new THREE.BoxBufferGeometry(pin_radius, height + 2 * pin_radius, data.depth + 2 * pin_radius);
        let support_material = new THREE.MeshStandardMaterial({ color: 0xcccccc, vertexColors: false });

        if (data.support_type == 'Pin') {
            this.mesh = new THREE.Mesh(pin_geometry, support_material);

            this.mesh.position.set(-length / 2., -height / 2 - pin_radius, 0);
            this.mesh.position.add(beam_offset);
            this.mesh.rotation.x = Math.PI / 2.;
        } else if (data.support_type === 'Fixed') {
            this.mesh = new THREE.Mesh(fixed_geometry, support_material);

            this.mesh.position.set(-length / 2. - pin_radius / 2., 0, 0);
            this.mesh.position.add(beam_offset);
        } else if (data.support_type === 'Free') {
            let material = support_material.clone();
            material.transparent = true;
            material.opacity = 0.3;
            this.mesh = new THREE.Mesh(fixed_geometry, material);

            this.mesh.position.set(-length / 2., -height / 2 - pin_radius, 0);
            this.mesh.position.add(beam_offset);
            this.mesh.rotation.x = Math.PI / 2.;
        }

        this.mesh.name = 'Left support'
        this.mesh.userData.type = 'left_support'; 

        console.log("left support visible: ", data.visible)

        el.setAttribute('visible', data.visible);
  
        // Set mesh on entity.
        el.setObject3D('mesh', this.mesh);
    },
    update: function() {
        var data = this.data;
        var el = this.el;

        let length = data.length 
        let height = data.height

        console.log('updating left support')
        let pin_geometry = new THREE.CylinderBufferGeometry(pin_radius, pin_radius, data.depth + 2 * pin_radius, 20, 32);
        let fixed_geometry = new THREE.BoxBufferGeometry(pin_radius, height + 2 * pin_radius, data.depth + 2 * pin_radius);
        let support_material = new THREE.MeshStandardMaterial({ color: 0xcccccc, vertexColors: false });

        if (data.support_type == 'Pin') {
            this.mesh = new THREE.Mesh(pin_geometry, support_material);

            this.mesh.position.set(-length / 2., -height / 2 - pin_radius, 0);
            this.mesh.position.add(beam_offset);
            this.mesh.rotation.x = Math.PI / 2.;
        } else if (data.support_type === 'Fixed') {
            this.mesh = new THREE.Mesh(fixed_geometry, support_material);

            this.mesh.position.set(-length / 2. - pin_radius / 2., 0, 0);
            this.mesh.position.add(beam_offset);
        } else if (data.support_type === 'Free') {
            let material = support_material.clone();
            material.transparent = true;
            material.opacity = 0.3;
            this.mesh = new THREE.Mesh(fixed_geometry, material);

            this.mesh.position.set(-length / 2., -height / 2 - pin_radius, 0);
            this.mesh.position.add(beam_offset);
            this.mesh.rotation.x = Math.PI / 2.;
        }

        this.mesh.name = 'Left support'
        this.mesh.userData.type = 'left_support'; 

        let isVisible = data.visible;
        params.support_visible = isVisible

        console.log("left support visible: ", params.support_visible)

        el.setAttribute('visible', params.support_visible);
        el.setObject3D('mesh', this.mesh);
    }
});