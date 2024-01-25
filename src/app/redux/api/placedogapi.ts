
export const fetchPlaceDogAPI = async() => {
    const urls = ['https://place.dog/900/600','https://place.dog/900/600','https://place.dog/900/600','https://place.dog/900/600','https://place.dog/900/600','https://place.dog/900/600','https://place.dog/900/600','https://place.dog/900/600']
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