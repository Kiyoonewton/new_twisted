export const allowedRecipeCategories = [
  "latest",
  "breakfast",
  "sandwiches",
  "chicken",
  "vegetarian",
  "spicy",
  "pasta",
  "dessert",
  "winter-warmers",
  "twisted-green",
  "cocktails",
];
export const allowedArticleCategories = [
  "trending",
  "features",
  "opinion",
  "interviews",
  "news",
  "interview",
];
export const allowedShowsCategories = [
  "hangin-with",
  "bake-in",
  "shelf-life",
  "food-palace",
  "sandwich-goals",
  "corner-shop-challenge",
  "chefs-making-snacks",
  "alphabetti",
  "twisted-tv",
];

export const getValidCategory = (
  categories: { id: string; slug: string }[],
  pageCategories: string[],
  type: string
) => {
  const allowedCategories =
    type === "shows"
      ? allowedShowsCategories
      : type === "recipes"
      ? allowedRecipeCategories
      : allowedArticleCategories;
  let all: Record<string, any>[] = [];
  pageCategories.map((item) => {
    const test = categories.filter(
      (category) => category.id == item || category.slug == item
    );
    if (
      test[0] &&
      (allowedCategories.includes(test[0].slug) ||
        allowedCategories.includes(test[0].slug?.slice(1)))
    ) {
      all = [...all, ...test];
    }
  });
  return all;
};

export const formatMetaData = (inputData: Record<string, any>) => {
  const metaTags = ((seo_cards) => {
    if (seo_cards) {
      return {
        title:
          seo_cards["seo:title"] ?? seo_cards["seo_title"] ?? inputData?.title,
        description:
          seo_cards["seo:description"] ??
          seo_cards["seo_description"] ??
          inputData?.description,
        image: removeCroppingTransform(
          parseRecursive(seo_cards["seo:image"] ?? seo_cards["seo_image"])?.src
        ),
      };
    }
  })(inputData?.seo_cards);

  const facebookTags = ((open_graph) => {
    if (open_graph) {
      return {
        title: open_graph["og:title"] ?? "",
        description: open_graph["og:description"] ?? "",
        image: removeCroppingTransform(
          parseRecursive(open_graph["og:image"])?.src
        ),
      };
    }
  })(inputData.open_graph);

  const twitterTags = ((twitter_cards) => {
    if (twitter_cards) {
      return {
        title: twitter_cards["twitter:title"] ?? "",
        description: twitter_cards["twitter:description"] ?? "",
        image: removeCroppingTransform(
          parseRecursive(twitter_cards["twitter:image"])?.src
        ),
      };
    }
  })(inputData?.twitter_cards);

  const defaultMeta = {
    title: "",
    image: "",
    description: "",
  };

  return {
    meta_tags: metaTags ?? defaultMeta,
    facebook_tags: facebookTags ?? defaultMeta,
    twitter_tags: twitterTags ?? defaultMeta,
  };
};

export function parseRecursiveHelper(data: string) {
  if (typeof data !== "string" || data === "") return data;
  try {
    const parsedData = JSON.parse(data);
    if (typeof parsedData === "string") {
      return parseRecursiveHelper(parsedData);
    }
    return parsedData;
  } catch (error) {
    return { src: data };
  }
}

export const parseRecursive = (data: string) => {
  let parsedData = parseRecursiveHelper(data);
  const defaults = {
    alternative_text: "",
    description: "",
    name: "",
    coordinates: "",
    screenType: "",
    width: 400,
    height: 400,
    original: "",
    src: "",
  };

  try {
    const temp = JSON.parse(parsedData?.src);
    return { ...defaults, ...temp };
  } catch (e) {
    return { ...defaults, ...parsedData };
  }
};

export const formatArticleData = (data: Record<string, any>) => {
  const social_config = JSON.parse(
    data.postConfig.social_preview_config ?? "{}"
  );
  const featured_image = parseRecursive(data.featured_image)?.src;
  const formattedMetaData = formatMetaData(social_config);

  return {
    id: data.id,
    uuid: data.uuid,
    slug: data.slug,
    date: data.published_at,
    title: {
      rendered: data.title,
    },
    categories: data.categories,
    acf: {
      meta_tags: {
        title: data.title,
        description: data.excerpt,
        slug: data.slug,
        image: formattedMetaData.meta_tags.image,
        cdn_image: "",
      },
      facebook_tags: {
        ...formattedMetaData.facebook_tags,
        title: data.title,
      },
      twitter_tags: {
        ...formattedMetaData.twitter_tags,
        title: data.title,
      },
      is_private: !data.postConfig.is_in_sitemap,
      hero: {
        image: {
          original: featured_image,
        },
        new_image: {
          url: featured_image,
          sizes: {
            large: featured_image,
          },
        },
        badge: {
          badge_text_image: false,
          badge_icon_image: false,
          badge_background_colour: "Light Blue",
        },
      },
      contents: data.content,
      details: {
        reading_time: "05m",
      },
    },
  };
};

export const removeCroppingTransform = (url = "", width = 1200) => {
  // Check if the string contains the query parameter "tr="
  if (url.indexOf("tr=") !== -1) {
    // If present, remove it using replace
    return url.replace(/(\?|&)tr=.*?(&|$)/, `$1tr=w-${width}$2`);
  } else {
    // If not present, return the original string
    return url;
  }
};

export const formatRecipeData = (data: { [key: string]: any }) => {
  const cover_image = parseRecursive(data.cover_image);
  const method = ((method) => {
    if (!method) {
      return [];
    }
    const liRegex = /<li>([\s\S]*?)<\/li>/g;
    const matches = method.match(liRegex);

    if (matches) {
      return matches.map((match: string) => ({
        description: match.slice(4, -5),
      }));
    } else {
      return [];
    }
  })(data.method);

  const meta_tags = JSON.parse(data?.config?.social_preview_config ?? "{}");
  const formattedMetaData = formatMetaData(meta_tags);

  return {
    id: data.id,
    uuid: data.uuid,
    slug: data.slug,
    date: data.published_at,
    title: {
      rendered: data.title,
    },
    category: data.category,
    categories: data.categories,
    tags: data.tags,
    modified: data.updated_at,
    modified_gmt: data.updated_at,
    status: data.status,
    type: "recipes",
    acf: {
      meta_tags: {
        ...formattedMetaData.meta_tags,
        slug: data.slug,
        image: cover_image?.src ?? "",
        cdn_image: "",
      },
      facebook_tags: {
        ...formattedMetaData.facebook_tags,
        image: cover_image?.src ?? "",
      },
      twitter_tags: {
        ...formattedMetaData.twitter_tags,
        image: cover_image?.src ?? "",
      },
      is_private: !data.config.is_in_sitemap,
      //   is_private: false,
      short_description: data.excerpt,
      full_description: data.description,
      time: formatCookingTime(data.cooking_time),
      serves: data.serves ? data.serves.toString() : "",
      video_link: data.video_link ?? "",
      author_uuid: data.author_uuid,
      nutritional_details: false,
      ingredient_lists: JSON.parse(data.ingredient_lists),
      method,
      cover_image: {
        alt: "",
        original: cover_image?.src ?? "",
        large: cover_image?.src ?? "",
        medium: "",
        small: "",
      },
      new_cover_image: false,
      related_recipes: [],
      author: data.author,
      tags: data.tags,
    },
  };
};

export const formatCookingTime = (data = "") => {
  const duration = data.split("//")?.[0];
  const time = data.split("//").join("");
  if (time.includes("Minute(s)")) {
    if (duration && parseFloat(duration.trim()) == 1) {
      return time.replace("Minute(s)", "minute").toLowerCase();
    }
    return time.replace("Minute(s)", "minutes").toLowerCase();
  }
  if (time.includes("Hour(s)")) {
    if (duration && parseFloat(duration.trim()) == 1) {
      return time.replace("Hour(s)", "hour").toLowerCase();
    }
    return time.replace("Hour(s)", "hours").toLowerCase();
  }

  return time?.toLowerCase() ?? "";
};
