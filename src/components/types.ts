import { ReactNode } from "react";

export type LayoutArticleProps = {
  page?: LayoutArticle_pageProps;
  article?: LayoutArticle_contentProps;
  children: ReactNode;
};

export type LayoutArticle_pageProps = {
  identifier: string;
};

export type LayoutArticle_contentProps = {
  image: string;
  title: string;
  published_at: string;
  slug: string;
  author: string;
  content: string;
};

export type Metas_tagProps = {
  title: string;
  description: string;
  image: string;
};
