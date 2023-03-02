import { getDevice } from "../GazeBasedSystem/DeviceCamera";


AFRAME.registerComponent('beam-variable-ui', {
    schema: {
        i_beam:{
            type: "selector"
        }
    },
    init: function() {
        if (this.data.i_beam == null) {
            throw new Error("I_Beam Object not found!")
        }
        this.i_beam = this.data.i_beam.components["i_beam"];
        if (this.i_beam == null) {
            throw new Error("i_beam Component not found!")
        }
                
        this.setup()
    },
    setup: function() {
        this.variables = this.i_beam.getVariables();

        const height = 0.30;
        const offset = Object.keys(this.variables).length * height / 2;

        let index = 0;
        for (let [variable, value] of Object.entries(this.variables)) {
            let slider = this.createSlider(variable, parseFloat(value), parseFloat(this.i_beam.data[variable+"Min"]), parseFloat(this.i_beam.data[variable+"Max"]));
            slider.setAttribute('position', `0 ${index * -height + offset} 0`)
            slider.addEventListener('change', (evt) => {
                var newvalue = evt.detail.value;
                let beamAttributes = {}
                beamAttributes[variable] = newvalue;
                this.data.beam.setAttribute('i_beam', beamAttributes)
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
    createSlider: function(variable, value, min, max) {
        if ((min == null || isNaN(min)) && (max == null || isNaN(max))) {
            min = value - 1
            max = value + 1
        } else if ((min == null || isNaN(min)) && (max != null && !isNaN(max))) {
            min = value - 1;
        } else if ((min != null && !isNaN(min)) && (max == null || isNaN(max))) {
            max = value + 1;
        }        
        const slider = document.createElement("a-entity");
        slider.setAttribute('my-slider', {
            title: `${variable}`,
            value,
            min,
            max
        })
        return slider;
    },
    gazeBasedChangeValue: function (slider, variable, mode) {
        let interval = setInterval(() => {
            let sliderAttributes = slider.getAttribute("my-slider")
            if ((mode === 'plus' && sliderAttributes.value < sliderAttributes.max) ||
            (mode === 'minus' && sliderAttributes.value > sliderAttributes.min)){
                let newvalue;
                newvalue = sliderAttributes.value + (mode === "plus" ? 0.01 : -0.01);      
                let beamAttributes = {}
   
                beamAttributes[variable] = newvalue.toFixed(2);

                this.data.i_beam.setAttribute('i_beam', beamAttributes)
                sliderAttributes["value"] = newvalue;
                slider.setAttribute('my-slider', sliderAttributes)
            }
        }, 25)
        return interval
    }
})