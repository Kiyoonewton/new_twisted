// import React, { useRef, useEffect } from "react";
// import ArticleDetailsNavigation from "./navigation";
// import ComponentSection from "./../../base-components/section";
// import waitForObjectProperty from "../../../helpers/wait/waitForObjectProperty";
// import {
//   embedClassIntoReadMore,
//   updateEmbeds,
//   updateImagesAndCaptions,
//   updateListItemStyle,
// } from "../../../helpers/html";
// import addScriptTag from "../../../helpers/addScriptTag";
// import {
//   FACEBOOKCONNECT_URL,
//   INSTAGRAM_URL,
//   TIKTOK_URL,
//   TWITTER_PLATFORM_URL,
// } from "../../../config";
"use client";
import { FC } from "react";
import ComponentSection from "../ComponentSection";
import style from "./styles.module.scss";
import clx from "classnames";

const ArticleDetailsContent: FC<{ content: string }> = (props) => {
  // // Refs
  // const contents = useRef(null);

  // useEffect(() => {
  //     updateImagesAndCaptions(contents);
  //     updateListItemStyle(contents);
  //     updateEmbeds();
  //     return () => {};
  // }, []);

  // useEffect(() => {
  //     const renderEmbedDocuments = async () => {
  //         await waitForObjectProperty(window.instgrm);
  //         window.instgrm.Embeds.process();
  //     };

  //     embedClassIntoReadMore();
  //     addScriptTag({ src: `${TIKTOK_URL}/embed.js` });
  //     renderEmbedDocuments();
  // }, []);

  // useEffect(() => {
  //     addScriptTag({ src: `${INSTAGRAM_URL}/embed.js` });
  //     addScriptTag({ src: `${TWITTER_PLATFORM_URL}/widgets.js` });
  //     addScriptTag({
  //         src: `${FACEBOOKCONNECT_URL}/en_US/sdk.js#xfbml=1&version=v14.0`,
  //         tag: "body",
  //     });
  // }, []);
  // console.log(props.content);

  return (
    <>
      <ComponentSection identifier={"content"}>
        {/* <div className={style["contents"]}> */}
        <div
          className={clx(style.contents__item, style.text)}
          // ref={contents}
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></div>

        {/* <ArticleDetailsNavigation
            prevPost={props.prevPost}
            nextPost={props.nextPost}
          /> */}
        {/* </div> */}
      </ComponentSection>
    </>
  );
};

export default ArticleDetailsContent;
