import localFont from "next/font/local";

export const CommissionerFlair = localFont({
  src: [
    {
      path: "../../public/fonts/CommissionerFlair-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/CommissionerFlair-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/CommissionerFlair-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
});

export const TradeGothicLT = localFont({
  src: [
    {
      path: "../../public/fonts/TradeGothicLT.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/TradeGothicLTBold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const MadeGentle = localFont({
  src: [
    {
      path: "../../public/fonts/made-gentle.woff",
      weight: "400",
      style: "normal",
    },
  ],
});
