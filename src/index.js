require('aframe');
require('aframe-event-set-component');
// require('aframe-environment-component');
require('aframe-log-component');
require('aframe-plot-component');
require('aframe-ui-widgets');
require('aframe-orbit-controls');
require('aframe-physics-system')
require('aframe-extras')
require('aframe-physics-extras')
require('aframe-fps-counter-component');

require('./components/camera')
require('./components/Beam/beam')
require('./components/Beam/beam_upper')
require('./components/Beam/beam_lower')
require('./components/Support/right_support')
require('./components/Support/left_support')
require('./components/Support/visibility')
require('./components/Group/group')


// require('./components/GazeBasedSystem/DeviceCamera')
// require('./components/GazeBasedSystem/GraphScaler')
require('./components/aframe-aabb-collider');
require('./components/aframe-parent-constraint');
require('./components/helper');
require('./components/gui')
require('./components/animate')
require('./components/gaze')

require('./components/SliderComponent/slider.component');
// require('./components/BeamUI/beam_variable_ui');
// require('./components/GraphComponent/Graph');
// require('./components/ToggleComponent/toggle.component');
// require('./components/GraphParameterUIComponent/graph-parameter-ui.component');
// require('./components/TextComponent/text.component');


        

AFRAME.utils.device.checkHeadsetConnected = function() {
    if (AFRAME.utils.device.isMobile()) {
      return false; // Disable HTTPS on mobile devices
    }
    return true;
  };
function animate() {
    requestAnimationFrame(animate);
    // controls.update();
}