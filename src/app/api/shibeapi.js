export const fetchShibeApiImages = async () => {
  try {
    const apiUrl = 'https://shibe.online/api/cats?count=10';
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching shibe images:', error);
    throw error;
  }
};
