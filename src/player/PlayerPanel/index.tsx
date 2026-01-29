import { type FC, useState } from "react";
import { Cell } from "@/components/Cell";
import styles from "./index.module.scss";
import { PlayerContainer } from "@/player/usePlayer/PlayerContainer";
import moreIcon from "@/components/img/plus.png";
import lessIcon from "@/components/img/minus.png";
import deleteIcon from "@/static/imgs/delete.png";
import { ImgCell } from "@/components/Cell/ImgCell";
import type { IPropKey } from "../usePlayer";
import { clear } from "idb-keyval";

export const PlayerPanel: FC = () => {
  const { player } = PlayerContainer.useContainer();
  const [advanced, setAdvanced] = useState(false);
  // @ts-ignore
  const list: IPropKey[] = advanced
    ? [
        "weak",
        "strength",
        "vulnerable",
        "lightning",
        "ice",
        "dark",
        "state",
        "miracle",
        "knife",
        "gold",
      ]
    : {
        ironclad: ["weak", "strength", "vulnerable"],
        defect: ["lightning", "ice", "dark", "weak", "vulnerable"],
        silent: ["weak", "strength", "knife", "vulnerable"],
        watcher: ["state", "miracle", "weak", "strength", "vulnerable"],
      }[player.role];
  return (
    <div className={styles["container"]}>
      {/* <div style={{ fontSize: 16 }}>1</div> */}
      {/* <div style={{ fontSize: "1rem" }}>1</div> */}
      <div className={styles["grid"]}>
        <Cell propKey={"energy"} />
        <Cell propKey={"defence"} />
        <Cell propKey={"hp"} />
        {list.map((propKey) => (
          <Cell propKey={propKey} key={propKey} />
        ))}
        <ImgCell
          onClick={() => {
            setAdvanced((v) => !v);
          }}
          src={advanced ? lessIcon : moreIcon}
        />
        {advanced ? (
          <ImgCell
            onClick={async () => {
              if (
                window.confirm(
                  "Are you sure to abandon the current game? All progress will be lost.",
                )
              ) {
                await clear();
                window.location.reload();
              }
            }}
            src={deleteIcon}
          />
        ) : null}
      </div>
    </div>
  );
};
