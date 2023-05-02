window.onload = function() {
	var duration = '0.5s';
	var animation = 'animate__tada';
	var btnDeathMode = document.querySelector('.btn-container');
	btnDeathMode.addEventListener('click', function() {
		btnDeathMode.classList.add(animation);
		btnDeathMode.style.animationDuration = duration;
		setTimeout(function() {
			btnDeathMode.classList.remove(animation);
		}, 550);




	});
	document.querySelector('.btn-container').addEventListener('click', function() {
		document.querySelector('body').classList.toggle('narc-bg');
		document.querySelector('.musicOn').classList.toggle('show');
		document.querySelector('h1').classList.toggle('nn');

	});

	var toExport;
	var buttonRefresh = document.querySelector('.btn-refr');
	console.log(buttonRefresh);
	buttonRefresh.addEventListener('click', function() {
		var list = document.querySelectorAll('img');
		for (var i = 0; i < list.length; i++) {

			//list[i].src = list[i].src + '%20';
                        fetchCatImages();
		}
		console.log(list);
	});
}

// Select all slides
const slides = document.querySelectorAll(".slide");

// loop through slides and set each slides translateX
slides.forEach((slide, indx) => {
	slide.style.transform = `translateX(${indx * 100}%)`;
});

// select next slide button
const nextSlide = document.querySelector(".btn-next");

// current slide counter
let curSlide = 0;
// maximum number of slides
let maxSlide = slides.length - 1;

// add event listener and navigation functionality
nextSlide.addEventListener("click", function() {
	// check if current slide is the last and reset current slide
	if (curSlide === maxSlide) {
		document.querySelector(".btn-refr").click();
		curSlide = 0;

	} else {
		curSlide++;
	}

	//   move slide by -100%
	slides.forEach((slide, indx) => {
		slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
	});
});

// select next slide button
const prevSlide = document.querySelector(".btn-prev");

// add event listener and navigation functionality
prevSlide.addEventListener("click", function() {
	// check if current slide is the first and reset current slide to last
	if (curSlide === 0) {
		curSlide = maxSlide;
	} else {
		curSlide--;
	}

	//   move slide by 100%
	slides.forEach((slide, indx) => {
		slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
	});
});
//URL param check
if (window.location.search.includes('free=1')) {
   if (confirm("Don`t forgive to use VPN") == true) {
     window.location.href = 'https://free.navalny.com';
   }
}
async function fetchCatImages() {
  fetch('https://api.thecatapi.com/v1/images/search?limit=10')
    .then(response => response.json())
    .then(data => {
      // Extract the URLs from the response JSON
      const urls = data.map(image => image.url);
      // Set the URLs as the src attribute of the image elements
      document.getElementById('slide1').src = urls[0];
      document.getElementById('slide2').src = urls[1];
      document.getElementById('slide3').src = urls[2];
    })
    .catch(error => console.error(error));
}
