require('./components/beam')
require('./components/right_support')
require('./components/left_support')
require('./components/camera')
require('./components/gui')
require('./components/group')
import {params} from './utils/params'


window.update_beam_length = function(click, percent) {
    percent = ((percent * (50 - 5)) + 5).toFixed(1);
    params.load_position = params.load_position * percent / params.length;
    params.length = percent;
    console.log(percent)

    document.getElementById('beam').setAttribute('beam', {
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
    document.getElementById('right_support').setAttribute('right_support', {
        support_type: params.right,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
    document.getElementById('left_support').setAttribute('left_support', {
        support_type: params.left,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
    document.getElementById('beam').setAttribute('percent', params.length);
    update_all_functions();
}

window.update_beam_height = function(click, percent) {
    percent = ((percent * (1.5 - 0.1)) + 0.1).toFixed(1);
    params.height = percent;
    console.log(percent)

    document.getElementById('beam').setAttribute('beam', {
        length: params.length,
        height: params.height,
        depth: params.depth
    });
    document.getElementById('right_support').setAttribute('right_support', {
        support_type: params.right,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
    document.getElementById('left_support').setAttribute('left_support', {
        support_type: params.left,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
    update_all_functions();
    animate();
}

function update_all_functions() {
    update_beam_depth();
    update_beam_height();
    update_beam_length();
    update_applied_displacement();
    update_load_position();
}

window.update_beam_depth = function(click, percent) {
    percent = percent.toFixed(2);
    params.depth = percent;
    console.log(percent)

    document.getElementById('beam').setAttribute('beam', {
        length: params.length,
        height: params.height,
        depth: params.depth
    });
    document.getElementById('right_support').setAttribute('right_support', {
        support_type: params.right,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
    document.getElementById('left_support').setAttribute('left_support', {
        support_type: params.left,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
}


window.update_applied_displacement = function(click, percent) {
    percent = (percent * 0.5).toFixed(4);
    params.displacement.y = percent;
    console.log(percent)

    document.getElementById('beam').setAttribute('beam', {
        applied_displacement: params.displacement.y,
    });

}

window.update_load_position = function(click, percent) {
    percent = ((percent * (params.length - 1)) + 1).toFixed(2);
    params.load_position = percent;
    console.log(percent)

    document.getElementById('beam').setAttribute('beam', {
        load_position: params.load_position,
    });

}

window.update_color = function(value) {
    params.colour_by = value;
    document.getElementById('beam').setAttribute('beam', {
        length: params.length,
        color_by: params.colour_by
    });

}

window.update_left = function(value) {
    params.left = value;
    document.getElementById('left_support').setAttribute('left_support', {
        support_type: params.left,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
}

window.update_right = function(value) {
    params.right = value;
    document.getElementById('right_support').setAttribute('right_support', {
        support_type: params.right,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
}
window.update_visible_right = function(value) {
    console.log('updating visibility', value);
    document.getElementById('right_support').setAttribute('visible', value);
}

window.update_visible_left = function(value) {
    document.getElementById('left_support').setAttribute('visible', value);
}



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