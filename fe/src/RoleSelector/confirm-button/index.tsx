import type { FC } from "react";
import base from "./img/proceedButtonShadow.png";
import middle from "./img/proceedButtonOutline.png";
import top from "./img/proceedButton.png";

export const ConfirmButton: FC<{ onConfirm: () => void }> = ({ onConfirm }) => {
  return (
    <div style={{ position: "relative" }} onClick={onConfirm}>
      <img
        src={base}
        style={{ position: "absolute", top: 0, right: 0, width: "15rem", height: "15rem" }}
      />
      <img
        src={middle}
        style={{ position: "absolute", top: 0, right: 0, width: "15rem", height: "15rem" }}
      />
      <img
        src={top}
        style={{ position: "absolute", top: 0, right: 0, width: "15rem", height: "15rem" }}
      />
    </div>
  );
};
