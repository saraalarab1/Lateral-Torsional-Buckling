let beamLength = 20;

export let beam_offset = new THREE.Vector3(0, 4, -10);

export let pin_radius = 1;

export let params = {
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