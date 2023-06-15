async function ShibeAPI() {
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
