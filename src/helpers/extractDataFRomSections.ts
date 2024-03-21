export default function extractDataFromSections(sections: Record<string, any>) {
  const {
    metaTags: { data: meta_tags = {} } = { data: {} },
    facebookTags: {
      data: facebook_tags = { title: "", description: "", image: false },
    } = { data: { title: "", description: "", image: false } },
    twitterTags: {
      data: twitter_tags = { title: "", description: "", image: false },
    } = { data: { title: "", description: "", image: false } },
    shows: { data: { heading } = { heading: "" } } = { data: { heading: "" } },
    pageTitle: { data: { pageTitle } } = sections,
  } = sections;

  const extractedData = {
    meta_tags,
    facebook_tags,
    twitter_tags,
    shows: { heading },
    pageTitle: pageTitle,
  };

  return extractedData;
}
