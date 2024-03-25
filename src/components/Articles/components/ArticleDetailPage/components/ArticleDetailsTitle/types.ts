import { HeroImagesProps } from "../../types";

export type ArticleDetailsTitleProps = {
  text: { title: string; excerpt: string };
  user: {
    name: string;
    image: { src: string; blur: string; alt: string };
    id: string;
  };
  // hero_image: { hero_images: HeroImagesProps };
  details: { date: string; time: string };
  id: string;
  tags: any;
};
