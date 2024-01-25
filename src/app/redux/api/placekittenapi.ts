
export const fetchPlaceKittenApi = async() => {
  const getRandomNumber = (min:number, max:number) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Generate an array of 900 numbers within the range of 890 to 950
  const randomNumberArray = Array.from({ length: 900 }, () => getRandomNumber(890, 950));
  
  // Use the generated numbers to create URLs
  const urls = randomNumberArray.map((number) => `https://placekitten.com/${number}/600`);
      try{
    // const res = await Promise.all(urls.map(e => fetch(e)))
    // const rawJson = await Promise.all(res.map(e => e.json()))
    // console.log(rawJson);
    
    // const resJson = rawJson.map(e => e.url);

    return urls
  }catch(err) {
    console.error(err);
  }
}