export const fetchPurrbotApi = async(selectedApi:string) => {
  const link = selectedApi
    const urls = [`${link}`,`${link}`,`${link}`,`${link}`,`${link}`,`${link}`,`${link}`]
      try{
        const res = await Promise.all(urls.map(e => fetch(e)))
        const rawJson = await Promise.all(res.map(e => e.json()))
        const resJson = rawJson.map(e => e.url);
        console.log(resJson);
        
        return resJson
      }catch(err) {
        console.error(err);
      }
    }