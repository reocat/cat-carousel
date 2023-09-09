export const fetchAnimalityApiImages = async () => {
    try {
      const numImages = 10; // Number of images to fetch per request
      const apiUrl = 'https://neko.sunflowers-warp.workers.dev/img/cat'; // Proxy for Animality, original link blocked by browser policies
      const images = [];
  
      for (let i = 0; i < numImages; i++) {
        const response = await fetch(apiUrl);
        const data = await response.json();
        images.push(data.link);
      }
  
      return images;
    } catch (error) {
      console.error('Error fetching neko images:', error);
      throw error;
    }
  };
  