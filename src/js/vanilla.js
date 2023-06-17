// Get the value of the "color" cookie
const colorValue = getCookie('color');

// Import functions
import * as APIList from './apilist.js';
import {getCookie} from './shared.js';
   

// Apply the color value as the background color globally
if (colorValue) {
  document.body.style.backgroundColor = colorValue;
}

// cache frequently used DOM elements
const btnDeathMode = document.querySelector('.btn-container');
const buttonRefresh = document.querySelector('.btn-refr');
const slides = document.querySelectorAll(".slide");
const nextSlide = document.querySelector(".btn-next");
const prevSlide = document.querySelector(".btn-prev");

// declare variables
const animation = 'animate__tada';
const duration = '0.5s';
let curSlide = 0;
const maxSlide = slides.length - 1;

// add event listener to toggle class and change css property
btnDeathMode.addEventListener('click', function() {
  btnDeathMode.classList.add(animation);
  btnDeathMode.style.animationDuration = duration;
  setTimeout(function() {
    btnDeathMode.classList.remove(animation);
  }, 550);
  document.querySelector('body').classList.toggle('narc-bg');
  document.querySelector('.musicOn').classList.toggle('show');
  document.querySelector('h1').classList.toggle('nn');
});

// add event listener to fetch cat images and refresh slides
buttonRefresh.addEventListener('click', fetchCatImages);

// loop through slides and set each slides translateX
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

// add event listener and navigation functionality for next slide button
nextSlide.addEventListener("click", function() {
  if (curSlide === maxSlide) {
    fetchCatImages();
    curSlide = 0;  
  } else {
    curSlide++;
  }
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

// add event listener and navigation functionality for previous slide button
prevSlide.addEventListener("click", function() {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;  
  }
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

// check if URL param 'free=1' is present and redirect
if (window.location.search.includes('free=1')) {
  if (confirm("Don't forget to use VPN") == true) {
    window.location.href = 'https://free.navalny.com';
  }
}

async function fetchCatImages() {
  // Get the value of the "CurAPI" cookie
  let curAPIValue = getCookie('CurAPI');
  // Check if the "CurAPI" cookie exists
  if (!curAPIValue) {
    // Create the "CurAPI" cookie with the default value "catapi"
    document.cookie = 'CurAPI=catapi';
    curAPIValue = 'catapi';
  }
  // Apply the corresponding API function based on the cookie value
  if (curAPIValue === 'catapi') {
    await APIList.CatAPI();
  } else if (curAPIValue === 'shibe') {
    await APIList.ShibeAPI();
  } else if (curAPIValue === 'animality') {
    await APIList.AnimalityAPI();
  }
}

fetchCatImages();

// Check if the "eruda=true" parameter exists in the URL
if (window.location.search.indexOf('eruda=true') !== -1) {

  // Create a new script element
  var script = document.createElement('script');

  // Set the source of the script to the CDN URL
  script.src = 'https://cdn.jsdelivr.net/npm/eruda';

  // Append the script element to the document head
  document.head.appendChild(script);
   
  let el = document.createElement('div');
  document.body.appendChild(el);

  eruda.init({
      container: el,
      tool: ['console', 'elements']
  });
  eruda.init();
}
