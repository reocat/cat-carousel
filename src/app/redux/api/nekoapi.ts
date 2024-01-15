
type Data  = {
  url:string
}
export const fetchNekoAPI = async (count:number) => {
  const imagePromises = [];
  for (let i = 0; i < count; i++) {
    const imagePromise = fetch("https://nekos.life/api/v2/img/neko")
      .then((response) => response.json())
      .then((data:Data) => data.url);
    imagePromises.push(imagePromise);
  }
  return await Promise.all(imagePromises);
};
