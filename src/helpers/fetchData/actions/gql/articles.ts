import { portalApolloClient } from "@/helpers/apolloClient";
import { GET_CATEGORIES_BY_BLOG_UUID } from "./articles-category.query";
import { GET_BLOG_POSTS_BY_BLOG_UUID } from "@/helpers/graphql/articles/article-page";
import { GET_BLOG_POST_BY_BLOG_UUID_AND_SLUG } from "@/helpers/graphql/articles/articles.query";

export const gqlGetBlogCategory = async () =>
  await portalApolloClient().query({
    query: GET_CATEGORIES_BY_BLOG_UUID,
    variables: {
      blog_uuid: process.env.NEXT_PUBLIC_BLOG_UUID,
      all: true,
    },
    fetchPolicy: "network-only",
  });

export const gqlGetBlogArticles = async (
  page: number,
  first: number,
  search: string,
  filter: { [key: string]: string }[] = []
) =>
  await portalApolloClient().query({
    query: GET_BLOG_POSTS_BY_BLOG_UUID,
    variables: {
      blog_uuid: process.env.NEXT_PUBLIC_BLOG_UUID,
      page,
      first,
      search,
      filter,
    },
    fetchPolicy: "network-only",
  });

export const gqlGetArticle = async (slug: string) =>
  await portalApolloClient().query({
    query: GET_BLOG_POST_BY_BLOG_UUID_AND_SLUG,
    variables: {
      blog_uuid: process.env.NEXT_PUBLIC_BLOG_UUID,
      slug,
    },
    fetchPolicy: "network-only",
  });
