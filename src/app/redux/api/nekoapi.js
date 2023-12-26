export const fetchNekoAPI = async (count) => {
  const imagePromises = [];
  for (let i = 0; i < count; i++) {
    const imagePromise = fetch("https://nekos.life/api/v2/img/neko")
      .then((response) => response.json())
      .then((data) => data.url);
    imagePromises.push(imagePromise);
  }
  const imageUrls = await Promise.all(imagePromises);
  console.log(imageUrls);
  return imageUrls;
};
