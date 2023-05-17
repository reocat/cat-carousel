var common = require("./common");
function popup() {
        alert("Configuration applied, nya!");
        window.location.href = "https://mimi.ddns.net";
 }

      function setCookie() {
        var apiSelect = document.getElementById("api-select");
        var apiValue = apiSelect.options[apiSelect.selectedIndex].value;
        
        var colorSelect = document.getElementById("color-select");
        var colorValue = colorSelect.value;

        if (apiValue === "catapi") {
          document.cookie = "shibe=0";
          document.cookie = "catapi=1";
          document.cookie = "color=" + encodeURIComponent(colorValue);
          popup();
        } else if (apiValue === "shibe") {
          document.cookie = "catapi=0";
          document.cookie = "shibe=1";
          document.cookie = "color=" + encodeURIComponent(colorValue);
          popup();
        }
      }

