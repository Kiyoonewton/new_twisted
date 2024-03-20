import { gqlGetBlogCategory } from "../gql/articles";

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

export const useGetBlogArticles = async (page, first:string, search:string, filter = []) => {
    try {
        const response = await gqlGetBlogArticles(page, first, search, [
            ...filter,
            {
                column: "status",
                operator: "=",
                value: "1",
            },
        ]);
        return response.data.getBlogPostsByBlogUuid.data.map((articleData) =>
            formatArticleData(articleData),
        );
    } catch (e) {
        return [];
    }
};