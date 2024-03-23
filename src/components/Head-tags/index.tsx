import React from "react";
import Head from "next/head";
import { FB_APP_ID, FB_PAGE_ID, SITE_URL } from "../../config";

import { LayoutArticleProps } from "../types";

import {
  getMetadataDetails,
  getOpengraphMetaData,
  getTwitterMetaData,
} from "@/helpers/seo";
import Meta from "./Meta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "gooddays",
  description: "better",
};

const HeadTags = (props: LayoutArticleProps) => {
  const meta = getMetadataDetails({ ...props.page }, props.meta);
  const facebookMetaData = getOpengraphMetaData(
    { ...props.facebook, ...props.page },
    props.meta,
  );
  const twitterMetaData = getTwitterMetaData(
    { ...props.twitter, ...props.page },
    props.meta,
  );
  return (
    <Head>
      {/* Title */}
      <title>{meta.title}</title>

      {/* Description */}
      <meta name={"description"} content={meta.description} />
      <meta
        name="google-site-verification"
        content="-pzdb"
      />
      <link rel="canonical" href={`${SITE_URL}${props.page.path}`} />

      {/* Favicon */}
      <link rel={"icon"} href={"/favicon.ico"} />

      {/* Property Tags */}
      <meta property="fb:pages" content={FB_PAGE_ID} />
      <meta property="fb:app_id" content={FB_APP_ID} />
      <Meta open_graph={facebookMetaData} twitter_cards={twitterMetaData} />

      {/* Preconnet to origins */}
      <link rel={"preconnect"} href={process.env.WP_API_URL} />
      {props.children}
    </Head>
  );
};

export default HeadTags;
