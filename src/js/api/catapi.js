async function CatAPI() {
       let apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=10';
       const response = await fetch(apiUrl);
       const data = await response.json();
       const urls = data.map(image => image.url);
       document.getElementById('slide1').src = urls[0];
       document.getElementById('slide2').src = urls[1];
       document.getElementById('slide3').src = urls[2];
}

