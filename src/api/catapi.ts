export const fetchCatApiImages = async () => {
  try {
    const apiUrl = "https://api.thecatapi.com/v1/images/search?limit=10";
    const response = await fetch(apiUrl);
    const data = await response.json();
    const imageUrls = data.map((image) => image.url);
    return imageUrls;
  } catch (error) {
    console.error("Error fetching cat images:", error);
    throw error;
  }
};
