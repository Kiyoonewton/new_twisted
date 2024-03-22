import { SITE_URL } from "../config";

export const getPropertyOrDefault = (
  object: { [key: string]: any },
  seoObject: { [key: string]: any },
  propertyName: string,
  fallback: string
) => {
  return Boolean(object?.[`${propertyName}`])
    ? object[`${propertyName}`]
    : Boolean(seoObject?.[`${propertyName}`])
    ? seoObject[`${propertyName}`]
    : fallback;
};

export const getOpengraphMetaData = (
  data: { [key: string]: any },
  seoMeta = {}
) => {
  const { title, description, image } = getMetadataDetails(data, seoMeta);

  return {
    "og:title": title,
    "og:description": description,
    "og:image": image,
    "og:type": "website",
    "og:url": `${SITE_URL}${data.path}`,
    "og:site_name": data.name,
    "og:locale": "en_gb",
  };
};

export const getTwitterMetaData = (
  twitterData: { [key: string]: any },
  seoMeta: { [key: string]: any }
) => {
  const { title, description, image } = getMetadataDetails(
    twitterData,
    seoMeta
  );

  return {
    "twitter:title": title,
    "twitter:card": "summary_large_image",
    "twitter:image": image,
    "twitter:description": description,
  };
};

export const getMetadataDetails = (
  data: { [key: string]: any },
  seoMeta: { [key: string]: any }
) => {
  const title = getPropertyOrDefault(data, seoMeta, "title", "Twisted");
  const description = getPropertyOrDefault(
    data,
    seoMeta,
    "description",
    "Unserious food tastes seriously good."
  );
  const image = getPropertyOrDefault(
    data,
    seoMeta,
    "image",
    `${SITE_URL}/image-twisted-placeholder.svg`
  );

  return {
    title,
    image,
    description,
  };
};
