import {
  getCookie
} from './shared.js'


document.getElementById("save-btn").addEventListener("click", () => {
  setCookie();
});

// Get the value of the "color" cookie
const colorValue = getCookie('color');


// Apply the color value as the background color globally
if (colorValue) {
  document.body.style.backgroundColor = colorValue;
}

function popup() {
  alert(`Configuration applied, nya! Your cookies: ${getCookie('color')},${getCookie('CurAPI')}`);
  window.location.href = window.location = '/';
}

function setCookie() {
  var apiSelect = document.getElementById("api-select");
  var apiValue = apiSelect.options[apiSelect.selectedIndex].value;

  var colorSelect = document.getElementById("color-select");
  var colorValue = colorSelect.value;

  if (apiValue === "catapi") {
    document.cookie = "CurAPI=catapi";
    document.cookie = "color=" + colorValue;
    console.log(colorValue);
    popup();
  } else if (apiValue === "shibe") {
    document.cookie = "CurAPI=shibe";
    document.cookie = "color=" + colorValue;
    console.log(colorValue);
    popup();
  } else if (apiValue === "animality") {
    document.cookie = "CurAPI=animality";
    document.cookie = "color=" + colorValue;
    console.log(colorValue);
    popup();
  }
}

// Set the default value of the dropdown list based on the "CurAPI" cookie
function setDefaultAPIValue() {
  var apiSelect = document.getElementById("api-select");
  var curAPI = getCookie("CurAPI");

  if (curAPI) {
    for (var i = 0; i < apiSelect.options.length; i++) {
      if (apiSelect.options[i].value === curAPI) {
        apiSelect.selectedIndex = i;
        break;
      }
    }
  }
}

// Call the setDefaultAPIValue function when the page loads
window.onload = setDefaultAPIValue;

