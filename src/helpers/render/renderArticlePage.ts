import { portalApolloClient } from "../apolloClient";
import { allowedArticleCategories, getValidCategory } from "../category";
import extractDataFromSections from "../extractDataFRomSections";
import {
  useGetAllCategories,
  useGetArticle,
} from "../fetchData/actions/hooks/articles";
import {
  getArticlesSliderOne,
  getArticlesSliderTwo,
  getHeaderArticlesCarousel,
} from "../fetchData/article-page";
import { getArticlesFeed } from "../fetchData/shows-page";
import { FETCHCONFIG } from "../graphql/queries";

export const getPageData = async (
  pageSlug: Record<string, any>,
  isPreview = false
) => {
  let slug;
  if (pageSlug.length === 1) {
    slug = `/${pageSlug[0]}`;
  } else {
    slug = `/${pageSlug[0]}/${pageSlug[1]}`;
  }
  const allCategories = await useGetAllCategories();

  let articleData: Record<string, any> | any = await useGetArticle(slug);
  let validCategory = getValidCategory(
    allCategories,
    articleData.categories.map((item: { id: string }) => item.id),
    "articles"
  )[0];
  articleData.category = validCategory ?? { uuid: null };

  // Create a variable to stogqlre the data
  let data: Record<string, any> = {};
  const showArticle = articleData?.status ? articleData.status : isPreview;

  // Check if we got any data
  if (articleData && showArticle) {
    data.page_content = {
      ...articleData,
    };

    data.type = "article";
    data.categories = allCategories;
    data.next_post = articleData.next ? articleData.next : "";
    data.previous_post = articleData.previous ? articleData.previous : "";

    // Return the required data
    return {
      props: {
        data,
      },
      revalidate: 3600,
    };
  }
  // Redirect the page if no data is found
  return {
    notFound: true,
  };
};

export const isArticleCategoryPage = (
  categories: { slug: string; name: string }[],
  pageSlug: string
) => {
  let slug = "/" + pageSlug.slice(-1)[0];
  let category = categories.filter((item) => item.slug == slug);

  if (slug === "/articles") {
    category = [{ name: "lifestyle", slug: "lifestyle" }];
  }

  if (category.length > 0) {
    return { isCategory: true, category };
  } else {
    return { isCategory: false, category: null };
  }
};

export const getCategoryPageData = async (
  categories: any,
  category: { slug: string; name: string }[],
  pageSlug: string
) => {
  if (!allowedArticleCategories.includes(category[0].slug.slice(1))) {
    return {
      notFound: true,
    };
  }
  const pageRoute = `lifestyle/${pageSlug[0]}`;
  const pageConfig = await portalApolloClient().query({
    query: FETCHCONFIG,
    variables: { route: pageRoute, site: "twistedfood" },
    context: {
      fetchOptions: {
        next: {
          revalidate: 3600,
        },
      },
    },
  });

  const {
    data: { getConfig: pageContent },
  } = pageConfig;

  const {
    config: {
      [pageRoute]: { content: sections },
    },
  } = JSON.parse(pageContent);

  const pageSections = JSON.parse(sections);

  const headerData = pageSections.heroSection.sections.header.data;
  const rawHeaderCarouselData =
    pageSections.headerCarousel.sections.carousel.data;
  const headerCarouselData = await getHeaderArticlesCarousel(pageSections);
  const rawCategoryFeed = pageSections.categoriesFeed.sections.article.data;
  const categoryFeed = await getArticlesFeed(pageSections, categories);
  const articleSliderOne = await getArticlesSliderOne(pageSections);
  const rawArticleSliderOneData = pageSections.sliderOne.sections.carousel.data;
  const articleSliderTwo = await getArticlesSliderTwo(pageSections);
  const rawArticleSliderTwoData = pageSections.sliderTwo.sections.carousel.data;
  const pageData = extractDataFromSections(pageSections.SEO.sections);
  const { meta_tags, facebook_tags, twitter_tags, pageTitle } = pageData;

  let data: { [key: string]: any } = {};

  if (pageSections) {
    data.page_content = {
      meta_tags,
      facebook_tags,
      twitter_tags,
      title: pageTitle,
      rawArticleSliderOneData,
      articleSliderOne,
      rawArticleSliderTwoData,
      articleSliderTwo,
      headerData,
      rawHeaderCarouselData,
      headerCarouselData,
      categoryFeed,
      rawCategoryFeed,
      pageSections,
    };
    data.categories = categories;
    data.type = "articles";
    data.category = category[0];
    data.slug = `/articles/${pageSlug[0]}`;
    data.canonical = `/articles/${pageSlug[0]}`;
  }

  return {
    props: {
      data,
    },
  };
};
