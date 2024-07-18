export const fetchDogAPI = async () => {
  const urls = [
    "https://random.dog/woof.json",
    "https://random.dog/woof.json",
    "https://random.dog/woof.json",
    "https://random.dog/woof.json",
    "https://random.dog/woof.json",
    "https://random.dog/woof.json",
  ];
  try {
    const res = await Promise.all(urls.map((e) => fetch(e)));
    const rawJson = await Promise.all(res.map((e) => e.json()));
    const resJson = rawJson.map((e) => e.url);
    return resJson;
  } catch (err) {
    console.error(err);
  }
};
