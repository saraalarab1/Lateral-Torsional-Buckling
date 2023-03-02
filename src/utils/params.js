
export let beam_offset = new THREE.Vector3(0.5, 0.5, 0);

export let pin_radius = 1;

export let params = {
    length: 1, // beam length (m)
    depth: 1,
    height: 1,
    left: 'Fixed',
    right: 'Fixed',
    applied_load: 0,
    load_position:0.5,
    support_visible: false,
    youngs_modulus: 215,
    colour_by: 'Bending Moment',
    np: 100, // number of points along beam
    displacement: new THREE.Vector3(0, 0, 0),
    visible: true
}