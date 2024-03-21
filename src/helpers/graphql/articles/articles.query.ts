import { gql } from "@apollo/client";
import { EXTENDED_POST_FIELDS } from "./article-page";

export const GET_BLOG_POST_BY_BLOG_UUID_AND_SLUG = gql`
    ${EXTENDED_POST_FIELDS}
    query GqlGetBlog($blog_uuid: ID, $slug: String) {
        getBlogPostByBlogUuidAndSlug(input: { blog_uuid: $blog_uuid, slug: $slug }) {
            ...ExtendedPostFields
        }
    }
`;
