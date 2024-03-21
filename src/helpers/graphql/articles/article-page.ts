import { gql } from "@apollo/client";

export const CORE_POST_CONFIG_FIELDS = gql`
    fragment CorePostConfigFields on BlogPostConfig {
        permalink
        is_comments_enabled
        is_in_sitemap
        is_feature_article
        schema
        social_preview_config
        has_related_posts
        related_posts_config
    }
`;

export const EXTENDED_POST_FIELDS = gql`
    ${CORE_POST_CONFIG_FIELDS}
    fragment ExtendedPostFields on BlogPost {
        id
        uuid
        content
        excerpt
        title
        featured_image
        visibility
        uuid
        slug
        status
        category {
            name
            uuid
        }
        author {
            name
            uuid
            avatar
        }
        tags {
            uuid
            name
            id
        }
        published_at
        updated_at
        categories {
            name
            uuid
            slug
            id
            subCategories {
                name
                uuid
                slug
            }
        }
        postConfig {
            ...CorePostConfigFields
        }
    }
`;

export const GET_BLOG_POSTS_BY_BLOG_UUID = gql`
    ${EXTENDED_POST_FIELDS}
    query GqlGetBlogPosts(
        $blog_uuid: ID!
        $first: Int
        $page: Int
        $search: String
        $sort: [SortInput]
        $filter: [FilterInput]
    ) {
        getBlogPostsByBlogUuid(
            input: {
                blog_uuid: $blog_uuid
                first: $first
                page: $page
                search: $search
                sort: $sort
                filter: $filter
            }
        ) {
            data {
                ...ExtendedPostFields
            }
            paginatorInfo {
                currentPage
                lastPage
            }
        }
    }
`;
