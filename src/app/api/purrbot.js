export const fetchPurrBotApiImages = async () => {
  try {
    const numImages = 10; // Number of images to fetch per request
    const endpoints = [
      "smile",
      "slap",
      "pout",
      "poke",
      "pat",
      "neko",
      "lick",
      "lay",
      "kiss",
    ];
    const type = "gif";
    const plushie = endpoints[Math.floor(Math.random() * endpoints.length)];
    const apiUrl =
      "https://purrbot.sunflowers-warp.workers.dev/sfw/" + plushie + "/" + type;
    const images = [];

    for (let i = 0; i < numImages; i++) {
      const response = await fetch(apiUrl);
      const data = await response.json();
      images.push(data.link);
    }

    return images;
  } catch (error) {
    console.error("Error fetching neko images:", error);
    throw error;
  }
};
