import React, { FC } from "react";
import { ArticleDetailPageProps } from "./types";
import { GPT_AD_UNITS } from "@/config";
import LayoutArticle from "./components/LayoutArticle";
import style from "./styles.module.scss";
import clx from "classnames";
import ArticleDetailsHero from "./components/ArticleDetailsHero";
import { CommissionerFlair } from "@/assets/fonts";
import AuthorAndOtherDetails from "./components/AuthorAndOtherDetails";
import ArticleDetailsContent from "./components/ArticleDetailsContent";
// import { ArticleDetailsRelated } from "./components/ArticleDetailsRelated";

const ArticleDetailPage: FC<ArticleDetailPageProps> = (articleData) => {
  const props = articleData?.props;
  const {
    sidebar: { right: adProps },
  } = GPT_AD_UNITS;

  return (
    <LayoutArticle >
      <div className={clx(style.page, style["article-details"])}>
        <div
          data-scroll-section
          className={style["article-details--container"]}
        >
          <div data-scroll-section className={style["article-details--inner"]}>
            {props.data.page_content && (
              <h1 className={clx(style.title, CommissionerFlair.className)}>
                {props.data.page_content.id}
              </h1>
            )}
            <AuthorAndOtherDetails props={props} hasDate={true} />
            <ArticleDetailsHero
              hero_images={props.data.page_content.hero_images}
            />
            <ArticleDetailsContent content={props.data.page_content.content} />
            <AuthorAndOtherDetails props={props} hasDate={false} />
          </div>
          <div className={style["sidebar-ads"]}>
            <div className={style["ads"]}>
              <p className={style.p}>Advert</p>
              <div className={style["sidebar-ads--item"]}></div>
            </div>
          </div>
        </div>
        {/* <ArticleDetailsRelated props={props.data.page_content}/> */}
      </div>
    </LayoutArticle>
  );
};

export default ArticleDetailPage;
