export function getDevice(){
    if (navigator.userAgent.indexOf("OculusBrowser") !== -1) {
        console.log("OculusBrowser")
      return "OculusBrowser"
    }
    else if(navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)){
        console.log("Mobile")
      return "Mobile"
    }
    else {
        console.log("Desktop")
      return "Desktop"
    }
  }
  
  
  export function isPhone() {
    let phone = navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
    if (phone == null){
        phone = false
    }
    console.log(phone)
    return phone;
  }