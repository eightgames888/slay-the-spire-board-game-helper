import React, { ReactNode } from "react";
import { FC } from "react";
import styles from "./index.module.scss";
import { BaseImg } from "./BaseImg";

export const ImgCell: FC<{
  text?: number | string;
  src: ReactNode;
  onClick?: () => void;
}> = ({ text: text, src: imgSrc, onClick }) => {
  return (
    <div onClick={onClick} className={styles["cell"]}>
      <BaseImg src={imgSrc as string} />
      {text?.toString()?.length ? (
        <div
          className={styles["text"]}
          style={{ fontSize: text.toString().length > 3 ? "5rem" : "7rem" }}
        >
          {text}
        </div>
      ) : null}
    </div>
  );
};
