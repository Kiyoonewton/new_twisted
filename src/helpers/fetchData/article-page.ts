export const getCategoryArticlesData = async (
  pageSections: { [key: string]: any },
  categories: { [key: string]: any }
) => {
  const articlesCategories =
    categories &&
    categories.filter((value:{name:string}) => {
      const requiredCategories =
        pageSections.categories.sections.recipeCategories.data
          .map((value:{categoryUrl:string}) => value.categoryUrl)
          .map((item:string) => {
            const category = item.split("/")[2];

            return category.toLowerCase().replace("-", " ");
          });
      return requiredCategories.includes(value.name.toLowerCase());
    });
  const categoryUuids = articlesCategories.map((cat: { id: string }) => cat.id);

  let resData = await Promise.all(
    categoryUuids.map(async (value: string) => {
      const query = useGetBlogArticles(1, 6, "", [
        {
          column: "category_id",
          operator: "=",
          value: value,
        },
        {
          column: "status",
          operator: "=",
          value: "1",
        },
      ]);

      const result = await query;
      return { data: result };
    })
  );
  resData = [].concat.apply([], resData);

  const articlesCollection = resData.map((res) => res.data);

  return articlesCollection;
};
