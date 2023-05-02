// Declare constants with const
const duration = '0.5s';
const animation = 'animate__tada';
const btnDeathMode = document.querySelector('.btn-container');
const buttonRefresh = document.querySelector('.btn-refr');
const slides = document.querySelectorAll('.slide');
const nextSlide = document.querySelector('.btn-next');
const prevSlide = document.querySelector('.btn-prev');
const btnContainer = document.querySelector('.btn-container');
const body = document.querySelector('body');
const musicOn = document.querySelector('.musicOn');
const h1 = document.querySelector('h1');

// Add event listeners
btnDeathMode.addEventListener('click', function() {
  btnDeathMode.classList.add(animation);
  btnDeathMode.style.animationDuration = duration;
  setTimeout(function() {
    btnDeathMode.classList.remove(animation);
  }, 550);
});

btnContainer.addEventListener('click', function() {
  body.classList.toggle('narc-bg');
  musicOn.classList.toggle('show');
  h1.classList.toggle('nn');
});


console.log(buttonRefresh);
buttonRefresh.addEventListener('click', function() {
var list = document.querySelectorAll('img');
for (var i = 0; i < list.length; i++) {
    list[i].src = list[i].src + ' ';
    fetchCatImages();
}
});

nextSlide.addEventListener('click', () => changeSlide(1));
prevSlide.addEventListener('click', () => changeSlide(-1));

// Initialize slide positions
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

let curSlide = 0;
const maxSlide = slides.length - 1;

function changeSlide(delta) {
  curSlide = (curSlide + delta + slides.length) % slides.length;
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
}

async function fetchCatImages() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
    const data = await response.json();
    const [url1, url2, url3] = data.map(image => image.url);
    document.getElementById('slide1').src = url1;
    document.getElementById('slide2').src = url2;
    document.getElementById('slide3').src = url3;
  } catch (error) {
    console.error(error);
  }
}

// Check URL parameters
if (window.location.search.includes('free=1')) {
  if (confirm('Don\'t forget to use VPN')) {
    window.location.href = 'https://free.navalny.com';
  }
}

// Call fetchCatImages on page load
fetchCatImages();
