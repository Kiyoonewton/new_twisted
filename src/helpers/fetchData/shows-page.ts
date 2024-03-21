import { getCollectionDataWithHeaders } from "../utilities/formData";

export const getArticlesFeed = async (
  pageSections: Record<string, any>,
  categories : any
) => {
  const articles = await Promise.all(
    pageSections.categoriesFeed.sections.article.data.map(
      async (item: { url: string }) => {
        const feed = await getCollectionDataWithHeaders(
          `posts?slug=${
            item.url.split("/").slice(-1)[0]
          }&_fields=id,title,slug,acf,categories`,
          categories
        );
        return feed ?? null;
      }
    )
  );

  return articles;
};
