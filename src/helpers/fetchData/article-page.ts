import {
  getBlogArticles,
  useGetArticleWithFormatting,
} from "./actions/hooks/articles";
import { useGetRecipe } from "./actions/hooks/recipes";

export const getCategoryArticlesData = async (
  pageSections: { [key: string]: any },
  categories: { [key: string]: any }
) => {
  const articlesCategories =
    categories &&
    categories.filter((value: { name: string }) => {
      const requiredCategories =
        pageSections.categories.sections.recipeCategories.data
          .map((value: { categoryUrl: string }) => value.categoryUrl)
          .map((item: string) => {
            const category = item.split("/")[2];

            return category.toLowerCase().replace("-", " ");
          });
      return requiredCategories.includes(value.name.toLowerCase());
    });
  const categoryUuids = articlesCategories.map((cat: { id: string }) => cat.id);

  let resData = await Promise.all(
    categoryUuids.map(async (value: string) => {
      const query = await getBlogArticles(1, 6, "", [
        {
          column: "category_id",
          operator: "=",
          value: value,
        },
        {
          column: "status",
          operator: "=",
          value: "1",
        },
      ]);

      const result = await query;
      return { data: result };
    })
  );
  resData = [].concat.apply([], resData);

  const articlesCollection = resData.map((res) => res.data);

  return articlesCollection;
};

export const getHeaderArticlesCarousel = async (pageSections: {
  [key: string]: any;
}) => {
  const headerArticles = await Promise.all(
    pageSections.headerCarousel.sections.carousel.data.map(
      async (item: { url: string }) => {
        const slug = item.url.substring(
          item.url.indexOf("/articles") + "/articles".length
        );
        if (slug) {
          const article = await useGetArticleWithFormatting(slug);
          return article ?? null;
        }
        return null;
      }
    )
  );
  return headerArticles.filter((item) => item !== null);
};

export const getArticlesSliderOne = async (
  pageSections: Record<string, any>
) => {
  const articles = await Promise.all(
    pageSections.sliderOne.sections.carousel.data.map(
      async (item: { url: string }) => {
        const slug = item.url.substring(
          item.url.indexOf("/recipes") + "/recipes".length
        );
        if (slug !== "") {
          const feed = await useGetRecipe(slug);
          return feed ?? null;
        }
        return null;
      }
    )
  );
  return articles.filter((item) => item !== null);
};

export const getArticlesSliderTwo = async (
  pageSections: Record<string, any>
) => {
  const articles = await Promise.all(
    pageSections.sliderTwo.sections.carousel.data.map(
      async (item: { url: string }) => {
        const slug = item.url.substring(
          item.url.indexOf("/recipes") + "/recipes".length
        );
        if (slug !== "") {
          const feed = await useGetRecipe(slug);
          return feed ?? null;
        }
        return null;
      }
    )
  );

  return articles.filter((item) => item !== null);
};
