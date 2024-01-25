
type Data  = {
  url:string
}
export const fetchDuckApi = async () => {
  const count = 8;
  const imagePromises = [];
  for (let i = 0; i < count; i++) {
    const imagePromise = fetch("https://random-d.uk/api/v2/random")
      .then((response) => response.json())       
      .then((data:Data) => data.url).then((data)=>{imagePromises.push(data);});
    imagePromises.push(imagePromise);
    console.log(imagePromises);
  }
  return await Promise.all(imagePromises);
};
