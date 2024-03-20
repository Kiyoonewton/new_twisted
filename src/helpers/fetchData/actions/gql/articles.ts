import { portalApolloClient } from "@/helpers/apolloClient";
import { GET_CATEGORIES_BY_BLOG_UUID } from "./articles-category.query";

export const gqlGetBlogCategory = async () =>
    await portalApolloClient().query({
        query: GET_CATEGORIES_BY_BLOG_UUID,
        variables: {
            blog_uuid: process.env.NEXT_PUBLIC_BLOG_UUID,
            all: true,
        },
        fetchPolicy: "network-only",
    });
