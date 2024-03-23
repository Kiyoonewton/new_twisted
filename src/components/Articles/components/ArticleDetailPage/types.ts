import { Metas_tagProps } from "@/components/types";

export type PageContentProps = {
  uuid: string;
  status: number;
  author: AuthorProps;
  content: string;
  title: string;
  slug: string;
  excerpt: string;
  hero_images: HeroImagesProps;
  canonical?: string;
  meta: MetasProps;
  tags: string[];
  category: ArticleCategorieProps;
  post_date: string;
  posted_time_ago: string;
  reading_time: string;
  categories: Partial<ArticleCategorieProps> & { subCategories: any };
  related_posts: any;
  meta_tags: Metas_tagProps;
  facebook_tags: Metas_tagProps;
  twitter_tags: Metas_tagProps;
  id: string;
};

export type AuthorProps = {
  name: string;
  slug: string;
  profile_photo: Profile_photoProps;
  id: string;
};

export type Profile_photoProps = {
  sizes: { thumbnail: string };
  alt: string;
};

export type HeroImagesProps = {
  small: string;
  medium: string;
  large: string;
  original: string;
  alt: string;
};

export type MetasProps = {
  meta_tags: Metas_tagProps;
  facebook_tags: Metas_tagProps;
  twitter_tags: Metas_tagProps;
};

export type ArticleCategorieProps = {
  __typename: string;
  uuid: string;
  name: string;
  description: string | null;
  post_count: number;
  slug: string;
  id: string;
};

export type ArticleDetailPageProps = {
  props: {
    data: {
      page_content: PageContentProps;
      type: string;
      categories: ArticleCategorieProps[];
      next_post: string;
      previous_post: string;
    };
  };
};
