import React, { FC } from "react";
import { ArticleDetailPageProps } from "./types";
import { GPT_AD_UNITS } from "@/config";
import LayoutArticle from "./components/LayoutArticle";
import style from "./styles.module.scss";
import { convertTimestampToDateString } from "@/helpers/functions";
import ArticleDetailsTitle from "./components/ArticleDetailsTitle";

const ArticleDetailPage: FC<ArticleDetailPageProps> = (articleData) => {
  const props = articleData?.props;
  const { author, tags: articleTags } = props.data.page_content;
  const {
    sidebar: { right: adProps },
  } = GPT_AD_UNITS;

  return (
    <LayoutArticle
      page={{
        identifier: "article-details",
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
      <div className={style["article-details__container"]}>
        <div className={style["article-details__inner"]}>
          {props.data.page_content && (
            <ArticleDetailsTitle
              text={{
                title: props.data.page_content.title,
                excerpt: props.data.page_content.excerpt,
              }}
              user={{
                name: author ? author.name : "",
                image: {
                  src:
                    author && author.profile_photo
                      ? author.profile_photo.sizes.thumbnail
                      : "/image-twisted-placeholder.svg",
                  blur:
                    author && author.profile_photo
                      ? author.profile_photo.sizes.thumbnail
                      : "/image-twisted-placeholder.svg",
                  alt:
                    author && author.profile_photo
                      ? author.profile_photo.alt
                      : "",
                },
                id: author?.id ?? "",
              }}
              hero_image={{ hero_images: props.data.page_content.hero_images }}
              details={{
                date:
                  convertTimestampToDateString(
                    props.data.page_content.post_date,
                  ) ?? "",
                time: props.data.page_content.reading_time ?? "",
              }}
              tags={articleTags}
              //   showSocialModal={() => setShowSocialModal(true)}
              id={props.data.page_content.id}
              //   children={
              //     <ArticleDetailsContent
              //       user={{
              //         name: author ? author.name : "",
              //         image: {
              //           src:
              //             author && author.profile_photo
              //               ? author.profile_photo.sizes.thumbnail
              //               : "/image-twisted-placeholder.svg",
              //           blur:
              //             author && author.profile_photo
              //               ? author.profile_photo.sizes.thumbnail
              //               : "/image-twisted-placeholder.svg",
              //           alt:
              //             author && author.profile_photo
              //               ? author.profile_photo.alt
              //               : "",
              //         },
              //         id: author ? author.id : "",
              //       }}
              //       content={props.data.page_content.content}
              //       //   contents={props.data.page_content.contents}
              //       //   showSocialModal={() => setShowSocialModal(true)}
              //       prevPost={props.data.previous_post}
              //       nextPost={props.data.next_post}
              //       article={{
              //         title: props.data.page_content.title,
              //         id: props.data.page_content.id,
              //       }}
              //       //   showAds={showAds}
              //       adProps={adProps}
              //     />
              //   }
            />
          )}
        </div>
      </div>
    </LayoutArticle>
  );
};

export default ArticleDetailPage;
