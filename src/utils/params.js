let beamLength = 20;

export let beam_offset = new THREE.Vector3(0, 4, -10);
export let beam_upper_offset = new THREE.Vector3(0, 4.65, -10);
export let beam_lower_offset = new THREE.Vector3(0, 3.2, -10);

export let pin_radius = 1;

export let params = {
    length: beamLength, // beam length (m)
    depth: 1.5,
    height: 0.2,
    left: 'Fixed',
    right: 'Fixed',
    applied_load: 0,
    load_position:10,
    visible: false,
    youngs_modulus: 215,
    colour_by: 'Bending Moment',
    np: 100, // number of points along beam
    displacement_control: true,
    displacement: new THREE.Vector3(0, 0, 0),
}

export let params_upper = {
    length: beamLength, // beam length (m)
    depth: 1.5,
    height: 0.2,
    left: 'Fixed',
    right: 'Fixed',
    applied_load: 0,
    load_position: 10,
    visible: false,
    youngs_modulus: 215,
    colour_by: 'Bending Moment',
    np: 100, // number of points along beam
    displacement_control: true,
    displacement: new THREE.Vector3(0, 0, 0),
}

export let params_lower = {
    length: beamLength, // beam length (m)
    depth: 1.5,
    height: 0.2,
    left: 'Fixed',
    right: 'Fixed',
    applied_load: 0,
    load_position: 10,
    visible: false,
    youngs_modulus: 215,
    colour_by: 'Bending Moment',
    np: 100, // number of points along beam
    displacement_control: true,
    displacement: new THREE.Vector3(0, 0, 0),
}