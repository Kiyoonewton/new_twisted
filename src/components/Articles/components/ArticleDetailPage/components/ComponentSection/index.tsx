"use client";
import React, { FC, useRef } from "react";
import { ComponentSectionProps } from "./types";
import style from "./styles.module.scss";

const ComponentSection: FC<ComponentSectionProps> = (props) => {
  const sectionRef = useRef(null);

  return (
    <section
      className={style[`section--${props.identifier}`]}
      ref={sectionRef}
      id={props.id ? props.id : ""}
    >
      {props.children}
    </section>
  );
};

export default ComponentSection;
