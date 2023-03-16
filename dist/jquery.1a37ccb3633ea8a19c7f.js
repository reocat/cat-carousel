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

eval("func =function(){ $.getJSON('https://aws.random.cat/meow')\n  .done(function(data){\n    console.log(data);\n    $('#cat_pic').attr('src',data.file)\n});}\n\n$(document).ready(function() {\n\n  $('#selection').on('change', function() {\n    change($(this).val());\n  });\n\n});\n\n\nfunction change(sourceUrl) {\n  var audio = document.getElementById(\"player\");\n  var source = document.getElementById(\"mp3_src\");\n\n  audio.pause();\n\n  if (sourceUrl) {\n    source.src = sourceUrl;\n    audio.load();\n    audio.play();\n  }\n}\n\n//# sourceURL=webpack:///./src/js/jq.js?");

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