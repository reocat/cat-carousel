export const fetchMultipleImages = async (count)=>{
  const imageUrls = [];
  for (let i=0; i<count; i++){
    const response = await fetch('https://nekos.life/api/v2/img/neko');
    const data = response.json();
    imageUrls.push(data);
  }
  return imageUrls
}