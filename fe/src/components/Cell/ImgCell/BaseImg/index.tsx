import type { ReactNode } from "react";
import type { FC } from "react";

export const BaseImg: FC<{
  src: ReactNode;
  onClick?: () => void;
}> = ({ src: imgSrc, onClick }) => {
  return <img src={imgSrc as string} style={{ width: "7rem", height: "7rem" }} onClick={onClick} />;
};
