require('./components/beam')
require('./components/right_support')
require('./components/left_support')
require('./components/camera')
require('./components/gui')
require('./components/group')
require('./components/animate')
require('./components/gaze')


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