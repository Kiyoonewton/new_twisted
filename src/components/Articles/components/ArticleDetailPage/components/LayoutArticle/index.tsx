// import { useRef } from "react";
import {
  INSTAGRAM_URL,
  SITE_URL,
  SNACKBAR_DESKTOP_AD_UNIT_CONTENT,
  TIKTOK_URL,
  TWITTER_PLATFORM_URL,
} from "@/config";
// import SharedHeader from "./../sections/shared/header";
// import SharedFooter from "./../sections/shared/footer";
import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
import { LayoutArticleProps } from "@/components/types";
import HeadTags from "@/components/Head-tags";
import style from "./style.module.scss";
import clx from "classnames";
import { Metadata } from "next";
// import { ArticleSchema } from "../../helpers/schema/articleSchema";
// import FreeRecipeList from "../default-popup-modals/free-recipe-list";

function LayoutArticle(props: LayoutArticleProps) {
  const page = {
    identifier: props.page.identifier ?? "Default",
  };

  const articleHistory = Cookies.get("articleHistory");
  const parsedArticleHistory = articleHistory
    ? JSON.parse(articleHistory)
    : null;
  const hasVisitedTwoArticles =
    parsedArticleHistory && parsedArticleHistory.length == 2;
  const contentAds = SNACKBAR_DESKTOP_AD_UNIT_CONTENT;
  //   const router = useRouter();
  //   const path = router.asPath.split("/").slice(-1)[0];
  //   const [showPopup, setShowPopup] = useState(false);
  //   const [footerSize, setFooterSize] = useState(0);

  // Refs
  //   const containerRef = useRef(null);

  //   useEffect(() => {
  //     setTimeout(() => {
  //       if (hasVisitedTwoArticles) {
  //         setShowPopup(true);
  //         Cookies.set(
  //           "articleHistory",
  //           JSON.stringify([...parsedArticleHistory, "met"]),
  //           {
  //             expires: 365,
  //           }
  //         );
  //       }
  //     }, 1000);
  //   }, [hasVisitedTwoArticles, parsedArticleHistory]);

  //   useEffect(() => {
  //     setFooterSize(document.getElementById("footer").offsetHeight);
  //     window.addEventListener(
  //       "resize",
  //       setFooterSize(document.getElementById("footer").offsetHeight)
  //     );

  //     return () => {
  //       window.removeEventListener(
  //         "resize",
  //         setFooterSize(document.getElementById("footer").offsetHeight)
  //       );
  //     };
  //   }, [parsedArticleHistory]);

  return (
    <section>
      {/* <HeadTags
        page={page}
        twitter={props.twitter}
        facebook={{
          ...props.facebook,
          image:
            typeof props.facebook?.image === "number"
              ? props.twitter?.image
              : props.facebook?.image,
        }}
        meta={props.meta}
      > */}
      {/* <ArticleSchema article={props?.article} /> */}
      {/* <meta property="ia:markup_url" content={`${SITE_URL}/ia${page.path}`} />
      <link rel="preload" href={`${TIKTOK_URL}/embed.js`} as="script" />
      <link rel="preload" href={`${INSTAGRAM_URL}/embed.js`} as="script" />
      <link
        rel="preload"
        href={`${TWITTER_PLATFORM_URL}/widgets.js`}
        as="script"
      /> */}
      {/* </HeadTags> */}
      <main data-scroll-container style={{ position: "relative" }}>
        <article data-scroll-section>
          <div data-scroll-section>{props.children}</div>
        </article>
      </main>
    </section>
  );
}

export default LayoutArticle;
