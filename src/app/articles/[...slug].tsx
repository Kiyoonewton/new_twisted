import { getAllCategories } from "@/helpers/fetchData/actions/hooks/articles";
import {
  isArticleCategoryPage,
  getCategoryPageData as getArticleCategoryPageData,
  getPageData as getArticlePageData,
} from "@/helpers/render/renderArticlePage";

export async function getStaticProps({
  params,
  ...context
}: {
  params: { slug: string; context: Record<string, any> };
}) {
  const pageSlug = params.slug;
  let categories = await getAllCategories();

  const { isCategory, category } = isArticleCategoryPage(categories, pageSlug);

  if (isCategory && category) {
    const categoryPageData = await getArticleCategoryPageData(
      categories,
      category,
      pageSlug
    );
    return categoryPageData;
  }

  return getArticlePageData(context, pageSlug ? true : false)
    .then((articlePageData: Record<string, any>) => {
      return { props: { ...articlePageData.props }, revalidate: 3600 };
    })
    .catch((error: Record<string, any>) => {
      console.error(error);
      return { props: { data: null } };
    });
}

// export default Article;
