import ComponentSection from "../ComponentSection";
import { ArticleDetailsTitleProps } from "./types";
import style from "./styles.module.scss";
import { CommissionerFlair } from "@/assets/fonts";
import clx from "classnames";
import AuthorDisplayDetails from "./components/AuthorAndOtherDetails";

function ArticleDetailsTitle(props: ArticleDetailsTitleProps) {
  return (
    <ComponentSection identifier={"title"}>
      <h1 className={clx(style.title, CommissionerFlair.className, style.h1)}>
        {props.text.title}
      </h1>
      <AuthorDisplayDetails props={props} hasDate={true}/>
    </ComponentSection>
  );
}

export default ArticleDetailsTitle;
