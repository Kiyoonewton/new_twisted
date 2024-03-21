import { getContentAndHeaders } from "../fetchData/fetchData";

export const getCollectionDataWithHeaders = async (
  query: string,
  categories = []
) => {
  let data;

  data = await getContentAndHeaders(query).then((result: any) => {
    let items = result && result !== null ? [...result.data] : [];

    if (items.length > 0) {
      items = items.map((item) => ({
        ...item,
        tags: categories?.filter(
          (tag: { id: string }) =>
            item && item.acf.tags && item.acf.tags.includes(tag.id)
        ),
      }));
    }

    return {
      data: items,
      headers: result && result !== null ? result.headers : {},
    };
  });

  return data;
};
