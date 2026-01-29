import type { FC } from "react";
import base from "./img/proceedButtonShadow.png";
import middle from "./img/proceedButtonOutline.png";
import top from "./img/proceedButton.png";
import styles from "./index.module.scss";

export const ConfirmButton: FC<{ onConfirm: () => void }> = ({ onConfirm }) => {
  return (
    <div className={styles["container"]} onClick={onConfirm}>
      <img src={base} className={styles["layer"]} />
      <img src={middle} className={styles["layer"]} />
      <img src={top} className={styles["layer"]} />
    </div>
  );
};
