import React from "react";

const TwittedCards = (twitter_cards: { [key: string]: string }) => (
  <>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={twitter_cards["twitter:title"]} />
    <meta name="twitter:image" content={twitter_cards["twitter:image"]} />
    <meta
      name="twitter:description"
      content={twitter_cards["twitter:description"]}
    />
  </>
);

const OpenGraph = (open_graph: { [key: string]: string }) => (
  <>
    <meta property="og:locale" content={open_graph["og:locale"]} />
    <meta property="og:type" content={open_graph["og:type"]} />
    <meta property="og:title" content={open_graph["og:title"]} />
    <meta property="og:image" content={open_graph["og:image"]} />
    <meta property="og:description" content={open_graph["og:description"]} />
    <meta property="og:url" content={open_graph["og:url"]} />
    <meta property="og:image:height" content={open_graph["og:image:height"]} />
    <meta property="og:image:width" content={open_graph["og:image:width"]} />
    <meta property="og:site_name" content={open_graph["og:site_name"]} />
    <meta
      property="article:publisher"
      content={open_graph["article:publisher"]}
    />
    <meta property="article:section" content={open_graph["article:section"]} />
    <meta
      property="article:published_time"
      content={open_graph["article:published_time"]}
    />
  </>
);

const Meta = (props: { [key: string]: any }) => {
  const { open_graph, twitter_cards } = props;

  return (
    <>
      {open_graph && <OpenGraph {...open_graph} />}
      {twitter_cards && <TwittedCards {...twitter_cards} />}
    </>
  );
};

export default Meta;
