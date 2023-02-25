import { params } from "../../utils/params";

window.addEventListener("load", (event) => {

    const leftSupport = document.querySelector('#left_support');
    leftSupport.setAttribute('visible', params.visible);
   
    const rightSupport = document.querySelector('#right_support');
    rightSupport.setAttribute('visible', params.visible);

})