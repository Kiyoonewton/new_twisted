import axios from "axios";

export const getAllContent = (
  endpointTemp: string,
  params: string | undefined = ""
) => {
  return new Promise(async (resolve) => {
    let data: any[] = [];
    let page = 1;
    let searching = true;
    while (searching) {
      try {
        let endpoint = "";
        if (endpointTemp.indexOf("?") > -1) {
          endpoint = `${endpointTemp}&per_page=100&page=${page}${
            params ? `&` + params : ""
          }`;
        } else {
          endpoint = `${endpointTemp}?per_page=100&page=${page}`;
        }
        let content = await axios.get(`${process.env.WP_API_URL}${endpoint}`);
        if (content.data.length === 0) {
          searching = false;
        }
        data = [...data, ...content.data];
        page += 1;
      } catch (error) {
        searching = false;
      }
    }
    resolve(data);
  });
};

export const getContentAndHeaders = async (endpoint: string) => {
  let data = null;
  await axios
    .get(`${process.env.WP_API_URL}${endpoint}`)
    .then((res) => {
      data = {
        data: res.data,
        headers: res.headers,
      };
    })
    .catch((err) => {
      console.error(err);
      return {};
    });
  return data;
};
