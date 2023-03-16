/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/jq.js":
/*!**********************!*\
  !*** ./src/js/jq.js ***!
  \**********************/
/***/ (() => {

eval("func =function(){ $.getJSON('https://aws.random.cat/meow')\r\n  .done(function(data){\r\n    console.log(data);\r\n    $('#cat_pic').attr('src',data.file)\r\n});}\r\n\r\n$(document).ready(function() {\r\n\r\n  $('#selection').on('change', function() {\r\n    change($(this).val());\r\n  });\r\n\r\n});\r\n\r\n\r\nfunction change(sourceUrl) {\r\n  var audio = document.getElementById(\"player\");\r\n  var source = document.getElementById(\"mp3_src\");\r\n\r\n  audio.pause();\r\n\r\n  if (sourceUrl) {\r\n    source.src = sourceUrl;\r\n    audio.load();\r\n    audio.play();\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/js/jq.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/jq.js"]();
/******/ 	
/******/ })()
;