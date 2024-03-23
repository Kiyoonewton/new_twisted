import React, { FC } from "react";
import { ArticleDetailPageProps } from "./types";
import { GPT_AD_UNITS } from "@/config";
import LayoutArticle from "./components/LayoutArticle";
const ArticleDetailPage: FC<ArticleDetailPageProps> = (articleData) => {
  const props = articleData?.props;
  //   console.log("valent===>", articleData?.props);
  const {
    sidebar: { right: adProps },
  } = GPT_AD_UNITS;

  return (
    <LayoutArticle
      page={{
        identifier: "article-details",
        path: `/articles${props.data.page_content.slug}`,
        canonical: `/articles${props.data.page_content.canonical}`,
      }}
      meta={{
        title: props.data.page_content.meta.meta_tags
          ? props.data.page_content.meta_tags.title
          : "",
        description: props.data.page_content.meta.meta_tags
          ? props.data.page_content.meta_tags.description
          : "",
        image: props.data.page_content.meta.meta_tags
          ? props.data.page_content.meta_tags.image
          : "",
      }}
      facebook={{
        title: props.data.page_content.meta.facebook_tags
          ? props.data.page_content.facebook_tags.title
          : "",
        description: props.data.page_content.meta.facebook_tags
          ? props.data.page_content.facebook_tags.description
          : "",
        image: props.data.page_content.meta.facebook_tags
          ? props.data.page_content.facebook_tags.image
          : "",
      }}
      twitter={{
        title: props.data.page_content.meta.twitter_tags
          ? props.data.page_content.twitter_tags.title
          : "",
        description: props.data.page_content.meta.twitter_tags
          ? props.data.page_content.twitter_tags.description
          : "",
        image: props.data.page_content.meta.twitter_tags
          ? props.data.page_content.twitter_tags.image
          : "",
      }}
      article={{
        image:
          props.data.page_content.hero_images.original ??
          "/image-twisted-placeholder.svg",
        title: props.data.page_content.title,
        published_at: props.data.page_content.post_date,
        slug: props.data.page_content.slug,
        author: props.data.page_content?.author
          ? props.data.page_content?.author.name
          : "",
        content: props.data.page_content.content,
      }}
    >
      <h1 style={{ color: "black" }}>going out</h1>
    </LayoutArticle>
  );
};

export default ArticleDetailPage;
