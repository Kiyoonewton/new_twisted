import {
  formatArticleData,
  parseRecursive,
  removeCroppingTransform,
  formatMetaData,
} from "@/helpers/category";
import {
  gqlGetArticle,
  gqlGetBlogArticles,
  gqlGetBlogCategory,
} from "../gql/articles";
import { timeSince } from "@/helpers/formatDatetime";

export const getAllCategories = async () => {
  let categoriesData;

  try {
    const data = await gqlGetBlogCategory();
    categoriesData = data?.data?.getBlogCategoriesByBlogUuid.data;
    return categoriesData;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const useGetArticle = async (slug: string) => {
  try {
    const data = await gqlGetArticle(slug);
    const articleData = data?.data?.getBlogPostByBlogUuidAndSlug;
    if (!articleData) {
      throw new Error("Article not found");
    }
    const imageData = parseRecursive(articleData?.featured_image);
    const authorName = articleData?.author?.name;
    const related_posts = JSON.parse(
      articleData?.postConfig?.related_posts_config ?? "[]"
    );
    const meta_tags = JSON.parse(
      articleData?.postConfig?.social_preview_config ?? "{}"
    );

    return {
      uuid: articleData.uuid,
      status: articleData.status,
      author: {
        name: authorName,
        slug: authorName?.split(" ")?.[0]?.toLowerCase(),
        profile_photo: {
          sizes: {
            thumbnail:
              parseRecursive(articleData.author?.avatar)?.src ??
              "/image-twisted-placeholder.svg",
          },
        },
      },
      title: articleData?.title,
      excerpt: articleData?.excerpt,
      slug: articleData?.slug,
      hero_images: {
        small: removeCroppingTransform(imageData.src),
        medium: removeCroppingTransform(imageData.src),
        large: removeCroppingTransform(imageData.src),
        original: removeCroppingTransform(imageData.src),
        alt: imageData.alternative_text ?? "",
      },
      content: articleData?.content,
      meta: {
        ...formatMetaData(meta_tags),
      },
      tags: articleData.tags,
      category: {
        name: articleData?.categories?.[0]?.name,
        slug: articleData?.categories?.[0]?.slug,
        uuid: articleData?.categories?.[0]?.uuid,
      },
      post_date: articleData?.published_at,
      posted_time_ago: timeSince(articleData?.published_at),
      reading_time: "05m",
      categories: articleData?.categories ?? [],
      related_posts: related_posts ?? [],
      ...formatMetaData(meta_tags),
    };
  } catch (error) {
    console.error("Error fetching article:", slug, error);
  }
};

export const getBlogArticles = async (
  page: number,
  first: number,
  search: string,
  filter: Record<string, any>[] = []
) => {
  try {
    const response = await gqlGetBlogArticles(page, first, search, [
      ...filter,
      {
        column: "status",
        operator: "=",
        value: "1",
      },
    ]);
    return response.data.getBlogPostsByBlogUuid.data.map(
      (articleData: Record<string, any>) => formatArticleData(articleData)
    );
  } catch (e) {
    return [];
  }
};

export const useGetAllCategories = async () => {
  let categoriesData;

  try {
    const data = await gqlGetBlogCategory();
    categoriesData = data?.data?.getBlogCategoriesByBlogUuid.data;
    return categoriesData;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const useGetArticleWithFormatting = async (slug: string) => {
  try {
    const data = await gqlGetArticle(slug);
    const articleData = data?.data?.getBlogPostByBlogUuidAndSlug;
    if (!articleData) {
      throw new Error("Article not found");
    }

    return formatArticleData(articleData);
  } catch (error) {
    console.error("Error fetching article:", slug, error);
  }
};
