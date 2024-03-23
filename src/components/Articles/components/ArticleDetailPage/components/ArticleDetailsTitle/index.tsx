import ComponentSection from "../ComponentSection";
import { ArticleDetailsTitleProps } from "./types";
import style from "./styles.module.scss";

function ArticleDetailsTitle(props: ArticleDetailsTitleProps) {
  return (
    <ComponentSection identifier={"title"}>
      <div>
        <h1 className={style.title}>{props.text.title}</h1>
      </div>
    </ComponentSection>
  );
}

export default ArticleDetailsTitle;
