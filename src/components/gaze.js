// import {getDevice} from './camera'


// window.addEventListener("load", () => {
//     let cursor = document.querySelector('a-cursor')
//     let rangeButtons = document.querySelectorAll(".rangeButton");

//     rangeButtons.forEach((rangeButton) => {
//       if (getDevice() === "Mobile") {
//         rangeButton.addEventListener("mouseenter", () => {
//             console.log("gaze started")
//             setTimeout(()=>{
//                 cursor.components.cursor.intersectedEl = entity;
//                 cursor.components.cursor.intersectedEl.components['raycaster'].intersectedEls.push(entity);
//                 cursor.emit('click');
//             },1000)
        
//         });
//         rangeButton.addEventListener("mouseleave", ()=>{
//             console.log("gaze ended")
//             setTimeout(() => {
//                 rangeButton.dispatchEvent(new Event('mouseup'));
//               }, 1000);

//         })
//       } 
   
//     });
    

//   });
  