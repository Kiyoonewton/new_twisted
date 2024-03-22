import ArticleDetailPage from "@/components/Articles/components/ArticleDetailPage";
import { getAllCategories } from "@/helpers/fetchData/actions/hooks/articles";
import {
  isArticleCategoryPage,
  getCategoryPageData as getArticleCategoryPageData,
  getPageData as getArticlePageData,
} from "@/helpers/render/renderArticlePage";

const Article = async ({ params, ...context }: any) => {
  const data = await getProps({ params, ...context?.searchParams });
  // console.log("technok", data);

  // switch (props?.data?.type) {
  //     case "article":
  return <ArticleDetailPage props={data?.props} />;
  //     case "articles":
  //         return <ArticlesPageV2 {...props} />;
  //     default:
  //         return <PageNotFound />;
  // }
};

async function getProps(props: { [key: string]: any }) {
  const pageSlug = props.params.slug;
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

  return getArticlePageData(pageSlug, false)
    .then((articlePageData: Record<string, any>) => {
      return { props: { ...articlePageData.props } };
    })
    .catch((error: Record<string, any>) => {
      console.error(error);
      return { props: { data: null } };
    });
}

export default Article;
