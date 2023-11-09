export const fetchPurrBotApiImages = async (plushie, type) => {
    try {
      const numImages = 10; // Number of images to fetch per request
      const apiUrl = 'https://purrbot.sunflowers-warp.workers.dev/sfw/' + plushie +'/' + type;
      const images = [];
  
      for (let i = 0; i < numImages; i++) {
        const response = await fetch(apiUrl);
        const data = await response.json();
        images.push(data.image);
      }
  
      return images;
    } catch (error) {
      console.error('Error fetching neko images:', error);
      throw error;
    }
  };
  