import React, { FC, useContext } from "react";
import { ArticleDetailPageProps } from "./types";
import { UserSavedContentContext } from "@/context/userSavedContent";
import { GPT_AD_UNITS } from "@/config";
const ArticleDetailPage: FC<ArticleDetailPageProps> = (articleData) => {
  console.log("valent===>", articleData?.props?.data?.page_content?.author);
  const userSavedContentContext: { [key: string]: any } = useContext(
    UserSavedContentContext
  );
  const {
    sidebar: { right: adProps },
  } = GPT_AD_UNITS;

  //   const [showAds, setShowAds] = useState(false);
  //   const [pageUrl, setPageUrl] = useState([]);
  //   const [showSocialModal, setShowSocialModal] = useState(false);
  //   const [relatedPosts, setRelatedPosts] = useState([]);

  //   const [savedContent, setSavedContent] = useState(false);
  //   const [showUnfollow, setShowUnfollow] = useState(false);
  //   const [savedUserContent, setSavedUserContent] = useState(
  //     userSavedContentContext.contents
  //   );

  //   const [followItemTitle, setFollowItemTitle] = useState("");
  //   const [unfollowItemTitle, setUnfollowItemTitle] = useState("");
  //   const [unfollowItemID, setUnfollowItemID] = useState("");
  //   const [unfollowItemType, setUnfollowItemType] = useState({
  //     singular: "",
  //     plural: "",
  //   });

  console.log(userSavedContentContext);

  return <></>;
};

export default ArticleDetailPage;
