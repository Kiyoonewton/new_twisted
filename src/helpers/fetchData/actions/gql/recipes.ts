import { portalApolloClient } from "@/helpers/apolloClient";
import { GET_RECIPE_BY_SITE_UUID_AND_SLUG } from "@/helpers/graphql/recipes/recipes.query";

export const gqlGetRecipe = async (slug: string) =>
  await portalApolloClient().query({
    query: GET_RECIPE_BY_SITE_UUID_AND_SLUG,
    variables: {
      site_uuid: process.env.NEXT_PUBLIC_SITE_UUID,
      slug,
    },
    fetchPolicy: "network-only",
  });
