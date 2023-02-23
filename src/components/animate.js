import { params, params_lower, params_upper } from '../utils/params'

function animate() {
    requestAnimationFrame(animate);
}

function update_all_functions() {
    update_beam_depth();
    update_beam_height();
    update_beam_length();
    update_applied_displacement();
    update_load_position();
}

window.update_beam_length = function(click, percent) {
    percent = ((percent * (50 - 5)) + 5).toFixed(1);
    params.load_position = params.load_position * percent / params.length;
    params_lower.load_position = params.load_position * percent / params.length;
    params_upper.load_position = params.load_position * percent / params.length;

    params.length = percent;
    params_upper.length = percent;
    params_lower.length = percent;

    console.log(percent)

    document.getElementById('beam_upper').setAttribute('beam_upper', {
        length: params_upper.length,
        height: params_upper.height,
        depth: params_upper.depth,
    });
    document.getElementById('beam').setAttribute('beam', {
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
    document.getElementById('beam_lower').setAttribute('beam_lower', {
        length: params_lower.length,
        height: params_lower.height,
        depth: params_lower.depth,
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

window.update_beam_depth = function(click, percent) {
    percent = percent.toFixed(2);
    params.depth = percent * 0.75;
    params_upper.depth = percent * 2;
    params_lower.depth = percent * 2;
    console.log(percent);

    document.getElementById('beam_upper').setAttribute('beam_upper', {
        length: params_upper.length,
        height: params_upper.height,
        depth: params_upper.depth
    });
    document.getElementById('beam').setAttribute('beam', {
        length: params.length,
        height: params.height,
        depth: params.depth
    });
    document.getElementById('beam_lower').setAttribute('beam_lower', {
        length: params_lower.length,
        height: params_lower.height,
        depth: params_lower.depth
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
    params.displacement.y = percent * 10;
    params_upper.displacement.y = percent * 4;
    params_lower.displacement.y = percent * 4;

    console.log(percent)

    document.getElementById('beam_upper').setAttribute('beam_upper', {
        applied_displacement: params_upper.displacement.y,
    });
    document.getElementById('beam').setAttribute('beam', {
        applied_displacement: params.displacement.y,
    });
    document.getElementById('beam_lower').setAttribute('beam_lower', {
        applied_displacement: params_lower.displacement.y,
    });


}

window.update_load_position = function(click, percent) {
    percent = ((percent * (params.length - 1)) + 1).toFixed(2);
    params.load_position = percent;
    params_lower.load_position = percent;
    params_upper.load_position = percent;

    console.log(percent)

    document.getElementById('beam_upper').setAttribute('beam_upper', {
        load_position: params_upper.load_position,
    });
    document.getElementById('beam').setAttribute('beam', {
        load_position: params.load_position,
    });
    document.getElementById('beam_lower').setAttribute('beam_lower', {
        load_position: params_lower.load_position,
    });

}

window.update_color = function(value) {
    params.colour_by = value;
    params_lower.colour_by = value;
    params_upper.colour_by = value;

    document.getElementById('beam_upper').setAttribute('beam_upper', {
        length: params_upper.length,
        color_by: params_upper.colour_by
    });
    document.getElementById('beam').setAttribute('beam', {
        length: params.length,
        color_by: params.colour_by
    });
    document.getElementById('beam_lower').setAttribute('beam_lower', {
        length: params_lower.length,
        color_by: params_lower.colour_by
    });

}

window.update_support = function(value) {
    params.left = value;
    document.getElementById('left_support').setAttribute('left_support', {
        support_type: params.left,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
    document.getElementById('right_support').setAttribute('right_support', {
        support_type: params.left,
        length: params.length,
        height: params.height,
        depth: params.depth,
    });
}

window.update_visible_support = function(value) {
    console.log('updating visibility', value);
    document.getElementById('right_support').setAttribute('visible', value);
    document.getElementById('left_support').setAttribute('visible', value);

}