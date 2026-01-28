import React, { ReactNode } from "react";
import { FC } from "react";
import styles from "./index.module.scss";

export const BaseImg: FC<{
  src: ReactNode;
  onClick?: () => void;
}> = ({ src: imgSrc, onClick }) => {
  return (
    <img src={imgSrc as string} className={styles["img"]} onClick={onClick} />
  );
};
