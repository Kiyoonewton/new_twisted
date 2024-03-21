import { gql } from "@apollo/client";

export const GET_RECIPE_BY_SITE_UUID_AND_SLUG = gql`
    query GqlGetRecipeBySlug($site_uuid: ID!, $slug: String!) {
        getRecipeBySiteUuidAndSlug(site_uuid: $site_uuid, slug: $slug) {
            id
            uuid
            title
            description
            excerpt
            slug
            status
            ingredient_lists
            method
            cover_image
            serves
            cooking_time
            author_uuid
            author {
                id
                name
                uuid
                avatar
            }
            published_at
            video_link
            site_uuid
            measurement
            created_at
            updated_at
            tags {
                uuid
                name
                site_uuid
            }
            category {
                uuid
                name
                site_uuid
                slug
            }
            categories {
                uuid
                name
                slug
                site_uuid
                description
            }
            config {
                is_in_sitemap
                is_feature_recipe
                schema
                social_preview_config
                has_related_recipes
                related_recipes_config
            }
        }
    }
`;