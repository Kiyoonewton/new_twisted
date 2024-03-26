import ComponentLazyImage from "@/components/Base-component/LazyImageComponent";
import ComponentSection from "../ComponentSection";
import { FC } from "react";
import { HeroImagesProps } from "../../types";

const ArticleDetailsHero: FC<{ [key: string]: any }> = (hero_images) => {
  const image = {
    src: hero_images.hero_images.original ?? "/image-twisted-placeholder.svg",
    alt: hero_images.hero_images.alt ?? "",
    blur: hero_images.hero_images.original ?? "",
  };

  return (
    <ComponentSection identifier={"hero"}>
      <div className={"image"}>
        <ComponentLazyImage
          src={image.src}
          alt={image.alt}
          width={1270}
          height={550}
          // blur={props.image.blur}
        />
      </div>
    </ComponentSection>
  );
};

export default ArticleDetailsHero;
