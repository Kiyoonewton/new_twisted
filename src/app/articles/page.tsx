import { DocumentNode } from "@apollo/client";
import { portalApolloClient } from "@/helpers/apolloClient";
import { FETCHCONFIG } from "@/helpers/graphql/queries";
import { getAllCategories } from "@/helpers/fetchData/actions/hooks/articles";
import { getAllContent } from "@/helpers/fetchData/fetchData";
import { getCategoryArticlesData } from "@/helpers/fetchData/article-page";
import extractDataFromSections from "@/helpers/extractDataFRomSections";

const getProps = async (query?: DocumentNode) => {
  // export async function getStaticProps(query: DocumentNode) {
  const pageConfig = await portalApolloClient().query({
    query: FETCHCONFIG,
    variables: { route: "lifestyle/overview", site: "twistedfood" },
    context: {
      fetchOptions: {
        next: { revalidate: 10 },
      },
    },
  });

  const {
    data: { getConfig: pageContent },
  } = pageConfig;

  const {
    config: {
      "lifestyle/overview": { content: sections },
    },
  } = JSON.parse(pageContent);

  const pageSections = JSON.parse(sections);

  let data: { [key: string]: any } = {};

  if (pageSections) {
    let categories = await getAllCategories();
    let wpCategories = await getAllContent(
      `categories?_fields=name,id,parent,slug`
    );
    let tags = await getAllContent(`tags?_fields=id,name,slug`);
    const headerData = pageSections.heroSection.sections.header.data;
    // const headerCarousel = await getHeaderArticlesCarousel(pageSections);
    const rawHeaderCarouselData =
      pageSections.headerCarousel.sections.carousel.data;
    const rawArticleCategoriesData =
      pageSections.categories.sections.recipeCategories.data;
    const articleCategoryData = await getCategoryArticlesData(
      pageSections,
      categories
    );
    // const featuredArticleCarousel = await getFeaturedArticles(pageSections);
    const rawFeaturedArticleCarouselData =
      pageSections.featuredCarousel.sections.carousel.data;
    const rawShowsSliderData = pageSections.bottomSlider.sections.carousel.data;
    // const showsSliderData = await getFeaturedEpisodesData(
    //   pageSections,
    //   wpCategories
    // );
    const pageData = extractDataFromSections(pageSections.SEO.sections);
    const { meta_tags, facebook_tags, twitter_tags, pageTitle } = pageData;

    data.page_content = {
      meta_tags,
      facebook_tags,
      twitter_tags,
      title: pageTitle,
      lifestyle: [],
      rawShowsSliderData,
      //   shows: showsSliderData,
      headerData,
      //   headerCarousel,
      rawHeaderCarouselData,
      rawArticleCategoriesData,
      //   featuredArticleCarousel,
      rawFeaturedArticleCarouselData,
      pageSections,
      articleCategoryData,
    };
    // data.categories = categories;
    // data.type = "articles";
    // data.page_number = query?.page ? parseInt(query.page) : null;
    // data.tags = tags;
    // data.wpCategories = wpCategories;

    return {
      props: {
        data,
      },
    };
  }

  return {
    notFound: true,
  };
};

export default async function ArticlesList() {
  const data = await getProps();
  const props = data?.props;

  //   return props?.data?.slug ? (
  //     <ArticlesPageV2 {...props} />
  //   ) : (
  //     <ArticlesIndexPage {...props} />
  //   );
}
