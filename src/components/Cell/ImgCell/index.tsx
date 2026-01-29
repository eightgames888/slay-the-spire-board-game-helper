import { type ReactNode } from "react";
import type { FC } from "react";
import { BaseImg } from "./BaseImg";

export const ImgCell: FC<{
  text?: number | string;
  src: ReactNode;
  onClick?: () => void;
}> = ({ text, src: imgSrc, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        userSelect: "none",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BaseImg src={imgSrc as string} />
      {text?.toString()?.length ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bolder",
            textShadow:
              "0.3rem 0.3rem 0.15rem #888, 0.0625rem 0.0625rem 0.125rem black, 0 0 0.3125rem red",
            fontSize: text.toString().length > 3 ? "2.5rem" : "3.5rem",
          }}
        >
          {text}
        </div>
      ) : null}
    </div>
  );
};
