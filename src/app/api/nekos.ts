 export const fetchNekoApiImages = async () => {
  try {
    const numImages = 10; // Number of images to fetch per request
    const apiUrl = "https://nekos.life/api/v2/img/neko";
    const images = [];

    for (let i = 0; i < numImages; i++) {
      const response = await fetch(apiUrl);
      const data = await response.json();
      images.push(data.url);
    }

    return images;
  } catch (error) {
    console.error("Error fetching neko images:", error);
    throw error;
  }
};
