export function getDevice() {
    if (navigator.userAgent.indexOf("OculusBrowser") !== -1) {
        return "OculusBrowser"
    } else if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)) {
        return "Mobile"
    } else {
        return "Desktop"
    }
}


export function isPhone() {
    return (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
    );
}

window.update_position = function(position) {
    const camera = document.getElementById("camera");
    if (position == 'right') {
        camera.setAttribute("position", "15 7 -8");
        camera.setAttribute("rotation", "-30 90 0");
    }
    if (position == 'left') {
        camera.setAttribute("position", "-15 7 -8");
        camera.setAttribute("rotation", "-30 -90 0");
    }
    if (position == 'right') {
        camera.setAttribute("position", "0 6 0.3");
        camera.setAttribute("rotation", "0 0 0");
    }
}

window.addEventListener("load", (event) => {
    var camera = document.createElement("a-entity");
    camera.setAttribute("camera", "");
    camera.setAttribute("id", "camera");
    var device = getDevice();
    console.log('device is: ' + device);
    if (device == "Desktop") {
        const left_ball = document.getElementById("left_ball");
        left_ball.setAttribute("visible", false);
        left_ball.setAttribute("position", "-15 8 -15");
        const right_ball = document.getElementById("right_ball");
        right_ball.setAttribute("visible", false);
        right_ball.setAttribute("position", "15 8 -15");
        const main_ball = document.getElementById("main_ball");
        main_ball.setAttribute("visible", false);
    }
    if (device === "Desktop" || device === "Mobile") {
        camera.setAttribute("position", "0 6 0.3");
        camera.setAttribute("look-controls", "pointerLockEnabled: false;");
        camera.setAttribute("wasd-controls", "acceleration: 200");
        var cursorEntity = document.createElement("a-cursor");
        cursorEntity.setAttribute("cursor", "");
        cursorEntity.setAttribute("position", "0 0 -0.1");
        cursorEntity.setAttribute(
            "geometry",
            `primitive: sphere; radius: ${isPhone() ? "0.001" : "0.0006"}`
        );
        cursorEntity.setAttribute(
            "material",
            "color: #000; shader: flat; opacity: 0.6"
        );
        if (device == "Desktop") {
            cursorEntity.setAttribute("raycaster", "showLine: true");
        }
        camera.appendChild(cursorEntity);

    } else {
        camera.setAttribute("orbit-controls", "target: 0 1 -0.6; initialPosition: -0.5 1.4 0.3; minDistance: -0.01")
    }
    AFRAME.scenes[0].appendChild(camera);

});