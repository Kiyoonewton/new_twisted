import ComponentSection from "../ComponentSection";
import { ArticleDetailsTitleProps } from "./types";
import style from "./styles.module.scss";
import { CommissionerFlair } from "@/assets/fonts";
import clx from "classnames";

function ArticleDetailsTitle(props: ArticleDetailsTitleProps) {
  return (
    <ComponentSection identifier={"title"}>
      <div>
        <h1 className={clx(style.title, CommissionerFlair.className)}>
          {props.text.title}
        </h1>
      </div>
    </ComponentSection>
  );
}

export default ArticleDetailsTitle;
