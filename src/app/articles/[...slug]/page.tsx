import ArticleDetailPage from "@/components/Articles/components/ArticleDetailPage";
import { getAllCategories } from "@/helpers/fetchData/actions/hooks/articles";
import {
  isArticleCategoryPage,
  getCategoryPageData as getArticleCategoryPageData,
  getPageData as getArticlePageData,
} from "@/helpers/render/renderArticlePage";
import { Metadata } from "next";
import { title } from "process";
import { PageContentProps } from "../../../components/Articles/components/ArticleDetailPage/types";
import { FB_APP_ID, FB_PAGE_ID, SITE_URL } from "@/config";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
// export const metadata: Metadata = {
//   title: "gooddays2",
//   description: "better",
// };

export const generateMetadata = async ({ params, ...context }: Props) => {
  const data = await getProps({ params, ...context?.searchParams });
  //   console.log(data.props.data);
  const page_content = data.props.data.page_content;

  return {
    title: page_content.meta_tags.title,
    description: page_content.meta_tags.description,
    metadataBase: new URL(`${SITE_URL}`),
    openGraph: {
      images: [page_content.meta_tags.image],
      locale: "en_gb",
      type: "website",
      url: `/articles${page_content.slug}`,
      siteName: "TwistedFood",
      title: page_content.meta_tags.title,
      description: page_content.meta_tags.description,
    },
    other: {
      ["fb:app_id"]: FB_APP_ID,
      ["fb:pages"]: FB_PAGE_ID,
    },
    alternates: {
      canonical: `/articles${
        page_content.canonical ? page_content.canonical : page_content.slug
      }`,
    },
  };
};

const Article = async ({ params, ...context }: Props) => {
  const data = await getProps({ params, ...context?.searchParams });
  // console.log("technok", data);

  // switch (props?.data?.type) {
  //     case "article":
  return (
    <>
      <ArticleDetailPage props={data?.props} />
    </>
  );
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
      pageSlug,
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
