export const fetchFoxApiImages = async (limit = 10) => {
    try {
      const apiUrl = "https://randomfox.ca/floof/";
      const imageUrls = [];
  
      // Fetch images in a loop for the specified limit
      for (let i = 0; i < limit; i++) {
        const response = await fetch(apiUrl);
        const data = await response.json();
        imageUrls.push(data.image); // The 'image' field in the response contains the image URL
      }
  
      return imageUrls;
    } catch (error) {
      console.error("Error fetching fox images:", error);
      throw error;
    }
  };
  