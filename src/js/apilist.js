const Animality  = require('animality');

export async function ShibeAPI() {
        let apiUrl = 'https://shibe.online/api/cats?count=3';
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
           // Assuming element IDs for slides are: slide1, slide2, and slide3
           document.getElementById("slide1").src = data[0];
           document.getElementById("slide2").src = data[1];
           document.getElementById("slide3").src = data[2];
})
}
export async function CatAPI() {
       let apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=10';
       const response = await fetch(apiUrl);
       const data = await response.json();
       const urls = data.map(image => image.url);
       document.getElementById('slide1').src = urls[0];
       document.getElementById('slide2').src = urls[1];
       document.getElementById('slide3').src = urls[2];
}
export async function AnimalityAPI() {
  const animals = await Promise.all([
    Animality.getAsync('cat', 'API_KEY'),
    Animality.getAsync('dog', 'API_KEY'),
    Animality.getAsync('fox', 'API_KEY')
  ]);

  const slide1 = document.getElementById('slide1');
  slide1.src = animals[0].image;

  const slide2 = document.getElementById('slide2');
  slide2.src = animals[1].image;

  const slide3 = document.getElementById('slide3');
  slide3.src = animals[2].image;
}


