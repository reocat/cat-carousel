"use strict";!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Cookies=t():e.Cookies=t()}(self,(()=>(self.webpackChunkCookies=self.webpackChunkCookies||[]).push([[30,712],{647:(e,t,o)=>{function n(e){let t="";return document.cookie.split(";").forEach((o=>{let[n,c]=o.split("=");n=n.trim(),console.log(n,c),n===e&&(t=c)})),t}o.r(t),o.d(t,{getCookie:()=>n})},17:(e,t,o)=>{o.r(t);var n=o(647);const c=(0,n.getCookie)("color");c&&(document.body.style.backgroundColor=c);const s=document.querySelector(".btn-container"),i=document.querySelector(".btn-refr"),a=document.querySelectorAll(".slide"),r=document.querySelector(".btn-next"),l=document.querySelector(".btn-prev"),d="animate__tada";let u=0;const m=a.length-1;async function f(){let e=(0,n.getCookie)("CurAPI");e||(document.cookie="CurAPI=catapi",e="catapi"),"catapi"===e?await async function(){const e=await fetch("https://api.thecatapi.com/v1/images/search?limit=10"),t=(await e.json()).map((e=>e.url));document.getElementById("slide1").src=t[0],document.getElementById("slide2").src=t[1],document.getElementById("slide3").src=t[2]}():"shibe"===e?await async function(){fetch("https://shibe.online/api/cats?count=3").then((e=>e.json())).then((e=>{document.getElementById("slide1").src=e[0],document.getElementById("slide2").src=e[1],document.getElementById("slide3").src=e[2]}))}():"animality"===e&&await async function(){try{const e=await fetch("https://api.animality.xyz/img/cat"),t=(await e.json()).image;document.getElementById("slide1").setAttribute("src",t),document.getElementById("slide2").setAttribute("src",t+"?2"),document.getElementById("slide3").setAttribute("src",t+"?3")}catch(e){console.error(e)}}()}s.addEventListener("click",(function(){s.classList.add(d),s.style.animationDuration="0.5s",setTimeout((function(){s.classList.remove(d)}),550),document.querySelector("body").classList.toggle("narc-bg"),document.querySelector(".musicOn").classList.toggle("show"),document.querySelector("h1").classList.toggle("nn")})),i.addEventListener("click",f),a.forEach(((e,t)=>{e.style.transform=`translateX(${100*t}%)`})),r.addEventListener("click",(function(){u===m?(f(),u=0):u++,a.forEach(((e,t)=>{e.style.transform=`translateX(${100*(t-u)}%)`}))})),l.addEventListener("click",(function(){0===u?u=m:u--,a.forEach(((e,t)=>{e.style.transform=`translateX(${100*(t-u)}%)`}))})),window.location.search.includes("free=1")&&1==confirm("Don't forget to use VPN")&&(window.location.href="https://free.navalny.com"),f()}},e=>{var t;return t=17,e(e.s=t)}])));