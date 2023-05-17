module.exports = "Common";
async function getCookie(name) { // function to get the value of a cookie
  let cookieValue = "";
  const cookies = document.cookie.split(";"); // split all cookies into an array

  cookies.forEach((cookie) => { // loop through each cookie
    let [cookieName, cookieVal] = cookie.split("="); // get cookie's name and value
    cookieName = cookieName.trim(); // remove leading/trailing whitespaces

    if (cookieName === name) { // if cookie's name is the required one
      cookieValue = cookieVal; // save its value
    }
  });

  return cookieValue; // return cookie's value
}
