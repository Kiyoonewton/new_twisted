import ComponentLazyImage from "@/components/Base-component/LazyImageComponent";
import ComponentSection from "../ComponentSection";
import { FC } from "react";

const ArticleDetailsHero: FC<{ image: { src: string; alt: string; blur:string } }> = (
  props
) => {
  return (
    <ComponentSection identifier={"hero"}>
      <div className={"image"}>
        <ComponentLazyImage
          src={props.image.src}
          alt={props.image.alt}
          width={1270}
          height={550}
          // blur={props.image.blur}
        />
      </div>
    </ComponentSection>
  );
};

export default ArticleDetailsHero;
