"use client";
import React, { FC } from "react";
import Image from "next/legacy/image";
import clx from "classnames";
import style from "./styles.module.scss";
import { commonProps } from "./types";

const dolos_url = "img.wazobia.tech";

const hasImageServiceUrl = (src = "") => {
  if (
    src.includes("img.wazobia.tech") ||
    src.includes("images.twistedfood.co.uk")
  ) {
    return true;
  }
  return false;
};

const dolosLoader = (
  {
    src,
    quality = 75,
    width,
    height,
  }: { src: string; quality: number; width: number; height: number },
  dWidth = 1200,
  dHeight = 1200
) => {
  const w = dWidth > 1 ? Math.min(dWidth, width * quality) : width * dWidth;
  const h = dWidth > 1 ? Math.min(dWidth, height * quality) : height * dHeight;

  if (src.includes(dolos_url) || src?.includes("images.twistedfood.co.uk")) {
    return `${src.replace(/(\?|&)tr=.*?(&|$)/, `$1tr=w-${w}$2`)}`;
  }

  let imageUrl = "";
  if (src.includes("unsplash")) {
    const indexOfQuestionMark = src.indexOf("?");
    if (indexOfQuestionMark !== -1) {
      imageUrl = src.substring(0, indexOfQuestionMark);
    }
  }

  const dolosUrl =
    hasImageServiceUrl(imageUrl) || src.includes("unsplash")
      ? `${imageUrl}${imageUrl?.includes("?") ? "&tr" : "?tr"}=w-${w}`
      : `https://${dolos_url}/${src}?tr=w-${w}`;

  return dolosUrl;
};

const ComponentLazyImage: FC<{
  alt: string;
  width: number;
  height?: number;
  fit?: "ObjectFit | undefined";
  priority?: boolean;
  src: string;
  position?: string;
  quality?: number;
  ratio?: number;
  click?: () => void;
}> = (props) => {
  const renderImage = () => {
    const commonProps: commonProps = {
      alt: props.alt
        ? props.alt
        : "Twisted: Unserious food tastes seriously good.",
      layout: props.width && props.height ? "fixed" : "fill",
      width: props.width,
      height: props.height,
    //   objectFit: props.fit && "ObjectFit",
      priority: props.priority,
      onError: (e: any) => {
        e.currentTarget.onError = null;
        e.currentTarget.srcset = "/image-twisted-placeholder.svg";
        e.currentTarget.src = "/image-twisted-placeholder.svg";
      },
    };

    if (props.src?.slice(-3) === "svg") {
      return <Image src={props.src} {...commonProps} />;
    } else {
      return (
        <Image
          {...commonProps}
          loader={(value: any) => dolosLoader(value, props.width)}
          src={props.src}
          quality={props.quality}
          priority={props.priority}
        />
      );
    }
  };

  return (
    <div
      className={clx(
        style["lazy-image"],
        props?.position && style["lazy-image--" + props.position]
      )}
      onClick={() => {
        if (props.click) {
          props.click();
        }
      }}
    >
      {renderImage()}
    </div>
  );
};

export default ComponentLazyImage;
