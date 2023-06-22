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
  try {
    const response = await fetch("https://api.animality.xyz/img/cat");
    const data = await response.json();
    const imageUrl = data.link;
    document.getElementById("slide1").setAttribute("src", imageUrl);
    document.getElementById("slide2").setAttribute("src", imageUrl + "?2");
    document.getElementById("slide3").setAttribute("src", imageUrl + "?3");
  } catch (error) {
    console.error(error);
  }
}