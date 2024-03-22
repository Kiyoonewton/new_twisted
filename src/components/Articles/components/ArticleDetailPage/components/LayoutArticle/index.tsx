import { useRef } from "react";
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
import { useRouter } from "next/router";
import { LayoutArticleProps } from "@/components/types";
import HeadTags from "@/components/Head-tags";
// import { ArticleSchema } from "../../helpers/schema/articleSchema";
// import FreeRecipeList from "../default-popup-modals/free-recipe-list";

function LayoutArticle(props: LayoutArticleProps) {
  // States
  const page = {
    ...props.page,
    identifier: props.page.identifier ?? "Default",
    name: "TwistedFood",
  };

  const articleHistory = Cookies.get("articleHistory");
  const parsedArticleHistory = articleHistory
    ? JSON.parse(articleHistory)
    : null;
  const hasVisitedTwoArticles =
    parsedArticleHistory && parsedArticleHistory.length == 2;
  const contentAds = SNACKBAR_DESKTOP_AD_UNIT_CONTENT;
  const router = useRouter();
  const path = router.asPath.split("/").slice(-1)[0];
  //   const [showPopup, setShowPopup] = useState(false);
  //   const [footerSize, setFooterSize] = useState(0);

  // Refs
  const containerRef = useRef(null);

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
    <div className={"layout layout--article"}>
      {/* SEO */}
      <HeadTags
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
      >
        {/* <ArticleSchema article={props?.article} /> */}
        <meta property="ia:markup_url" content={`${SITE_URL}/ia${page.path}`} />
        <link rel="preload" href={`${TIKTOK_URL}/embed.js`} as="script" />
        <link rel="preload" href={`${INSTAGRAM_URL}/embed.js`} as="script" />
        <link
          rel="preload"
          href={`${TWITTER_PLATFORM_URL}/widgets.js`}
          as="script"
        />
      </HeadTags>
      {/* ./SEO */}

      {/* Page HTML */}
      <main
        data-scroll-container
        ref={containerRef}
        style={{ position: "relative" }}
      >
        <div data-scroll-section>
          {/* Header */}
          <div
            data-scroll
            data-scroll-sticky
            data-scroll-target={"#page"}
            style={{
              position: "sticky",
              top: 0,
              zIndex: 999,
            }}
          >
            {/* <SharedHeader
              isTransparent={
                props.headerTransparent ? props.headerTransparent : false
              }
            /> */}
          </div>
          {/* ./Header */}

          {/* Page */}
          {/* <div id={"page"} className={`page page--${page.identifier}`}>
            {props.children}
          </div> */}
          {/* ./Page */}
          <div>
            {/* <SharedFooter
              smallFooter={props.smallFooter ? props.smallFooter : false}
            >
              {props.footerContent && props.footerContent}
            </SharedFooter> */}
          </div>
          {/* ./Footer */}
        </div>
        {/* {showPopup && <FreeRecipeList closeModal={() => setShowPopup(false)} />} */}
      </main>

      {/* Page HTML */}
    </div>
  );
}

export default LayoutArticle;
