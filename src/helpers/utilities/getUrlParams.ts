const GetUrlParams = () => {
  if (typeof window === "undefined") {
    return {};
  }

  const { search } = window.location;
  const urlParams: { [key: string]: any } = {};

  search
    .replace("?", " ")
    .replace("&", " ")
    .split(" ")
    .filter((p) => p)
    .forEach((p) => {
      const [key, value] = p.split("=");
      urlParams[key] = value;
    });

  return urlParams;
};

export default GetUrlParams;
