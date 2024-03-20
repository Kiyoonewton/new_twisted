import { gql } from "@apollo/client";

export const CORE_CATEGORY_FIELDS = gql`
  fragment CoreCategoryFields on BlogCategory {
    uuid
    name
    description
    post_count
    slug
    id
  }
`;

export const GET_CATEGORIES_BY_BLOG_UUID = gql`
  ${CORE_CATEGORY_FIELDS}
  query GqlGetBlogCategories(
    $blog_uuid: ID!
    $first: Int
    $page: Int
    $search: String
    $sort: [SortInput]
    $filter: [FilterInput]
    $all: Boolean
  ) {
    getBlogCategoriesByBlogUuid(
      input: {
        blog_uuid: $blog_uuid
        page: $page
        first: $first
        search: $search
        sort: $sort
        filter: $filter
        all: $all
      }
    ) {
      data {
        ...CoreCategoryFields
      }
      paginatorInfo {
        currentPage
        lastPage
      }
    }
  }
`;