import { getDevice } from "../GazeBasedSystem/DeviceCamera";


AFRAME.registerComponent('beam-variable-ui', {
    schema: {
        beam_upper: {
            type: "selector"
        },
        beam: {
            type: "selector"
        },
        beam_lower:{
            type: "selector"
        }
    },
    init: function() {
        if (this.data.beam_upper == null) {
            throw new Error("Beam Object not found!")
        }
        if (this.data.beam == null) {
            throw new Error("Beam Object not found!")
        }
        if (this.data.beam_lower == null) {
            throw new Error("Beam Object not found!")
        }
        this.beam = this.data.beam.components["beam"];
        if (this.beam == null) {
            throw new Error("Beam Component not found!")
        }
                
        this.setup()
    },
    setup: function() {
        var data = this.data;
        var el = this.el;
        // this.el.innerHTML = "";
        this.variables = this.beam.getVariables();

        const height = 0.30;
        const offset = Object.keys(this.variables).length * height / 2;

        let index = 0;
        for (let [variable, value] of Object.entries(this.variables)) {
            let slider = this.createSlider(variable, parseFloat(value), parseFloat(this.beam.data[variable+"Min"]), parseFloat(this.beam.data[variable+"Max"]));
            slider.setAttribute('position', `0 ${index * -height + offset} 0`)
            slider.addEventListener('change', (evt) => {
                var newvalue = evt.detail.value;
                let beamAttributes = {}
                beamAttributes[variable] = newvalue;
                this.data.beam_upper.setAttribute('beam_upper', beamAttributes)
                this.data.beam.setAttribute('beam', beamAttributes)
                this.data.beam_lower.setAttribute('beam_lower', beamAttributes)
            })
            let plus = document.createElement("a-entity")
            plus.setAttribute("gltf-model", "#plus")
            plus.setAttribute("scale", "0.0055 0.0055 0.0055")
            plus.setAttribute("rotation", "90 0 0")
            plus.setAttribute('position', `0.1 ${index * -height + offset + 0.03} 0`)
            let minus = document.createElement("a-entity")
            minus.setAttribute("gltf-model", "#minus")
            minus.setAttribute("scale", "0.0055 0.0055 0.0055")
            minus.setAttribute("rotation", "90 0 0")
            minus.setAttribute('position', `-0.45 ${index * -height + offset + 0.03} 0`)
            var interval = null
            if(getDevice() === "Mobile"){
                plus.addEventListener("mouseenter", () => {
                    if (interval) clearInterval(interval)
                    interval = this.gazeBasedChangeValue(slider, variable, "plus")
                })
                minus.addEventListener("mouseenter", () => {
                    if (interval) clearInterval(interval)
                    interval = this.gazeBasedChangeValue(slider, variable, "minus")
                })
            } else {
                plus.addEventListener("mousedown", () => {
                    if (interval) clearInterval(interval)
                    interval = this.gazeBasedChangeValue(slider, variable, "plus")
                })
                plus.addEventListener("mouseup", () => {
                    if (interval) clearInterval(interval)
                })
                minus.addEventListener("mousedown", () => {
                    if (interval) clearInterval(interval)
                    interval = this.gazeBasedChangeValue(slider, variable, "minus")
                })
                minus.addEventListener("mouseup", () => {
                    if (interval) clearInterval(interval)
                })
            }
            
            plus.addEventListener("mouseleave", () => {
                if (interval) clearInterval(interval)
            })
            minus.addEventListener("mouseleave", () => {
                if (interval) clearInterval(interval)
            })

            this.el.appendChild(slider)
            if(getDevice() === "Desktop" || getDevice() === "Mobile"){
                this.el.appendChild(plus)
                this.el.appendChild(minus)
            }

            index++;
        }
    },
})