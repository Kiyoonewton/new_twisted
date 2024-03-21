import { getCollectionDataWithHeaders } from "@/helpers/utilities/formData";

export const useGetArticles = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setNoData: React.Dispatch<React.SetStateAction<boolean>>,
  setAllArticles: React.Dispatch<React.SetStateAction<Record<string, any>[]>>,
  setMaxPages: React.Dispatch<React.SetStateAction<number>>,
  setQueryParam: React.Dispatch<React.SetStateAction<string>>
) => {
  return async (
    props: Record<string, any>,
    categories: any,
    selectedFilters: { id: string }[],
    readTime: any[],
    currentPage: number,
    perPage: number
  ) => {
    setLoading(true);
    let type =
      props.data.category &&
      props.data.category.slug &&
      props.data.category.slug !== "latest"
        ? categories.find((item: { slug: string }) => {
            return item.slug === props.data.category.slug;
          })
          ? categories.find((item: { slug: string }) => {
              return item.slug === props.data.category.slug;
            }).id
          : ""
        : selectedFilters.length > 0
        ? selectedFilters
            .map((item) => {
              return item.id;
            })
            .join(",")
        : "";

    let query: string = "";
    if (type !== "") {
      if (readTime.length > 0) {
        query = `posts?per_page=${perPage}&page=${currentPage}&categories=${type}&time=${readTime}&_fields=id,title,slug,acf,categories`;
      } else {
        query = `posts?per_page=${perPage}&page=${currentPage}&categories=${type}&_fields=id,title,slug,acf,categories`;
      }
      setNoData(false);
    } else {
      if (
        !props.data.category ||
        (props.data.category.slug && props.data.category.slug === "latest")
      ) {
        if (readTime.length > 0) {
          query = `posts?per_page=${perPage}&page=${currentPage}&time=${readTime}&_fields=id,title,slug,acf,categories`;
        } else {
          query = `posts?per_page=${perPage}&page=${currentPage}&_fields=id,title,slug,acf,categories`;
        }
        setNoData(false);
      } else {
        setNoData(true);
      }
    }

    await getCollectionDataWithHeaders(query, categories).then(
      (res: { data: Record<string, any>[]; headers: Record<string, any> }) => {
        setAllArticles(res ? res.data : []);
        setMaxPages(parseInt(res ? res.headers["x-wp-totalpages"] : 0));
        setLoading(false);
      }
    );

    if (type !== "") {
      setQueryParam(type);
    }
    setLoading(false);
  };
};
