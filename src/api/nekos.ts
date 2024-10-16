export const fetchNekoAPI = async () => {
    const urls = [
      "https://nekos.life/api/v2/img/neko",
      "https://nekos.life/api/v2/img/neko",
      "https://nekos.life/api/v2/img/neko",
      "https://nekos.life/api/v2/img/neko",
      "https://nekos.life/api/v2/img/neko",
      "https://nekos.life/api/v2/img/neko",
      "https://nekos.life/api/v2/img/neko",
      "https://nekos.life/api/v2/img/neko",
      "https://nekos.life/api/v2/img/neko",
      "https://nekos.life/api/v2/img/neko",
    ];
    try {
      const res = await Promise.all(urls.map((e) => fetch(e)));
      const rawJson = await Promise.all(res.map((e) => e.json()));
      const resJson = rawJson.map((e) => e.url);
      console.log(resJson);
  
      return resJson;
    } catch (err) {
      console.error(err);
    }
  };