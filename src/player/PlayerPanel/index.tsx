import { type FC, useState } from "react";
import { Cell } from "@/components/Cell";
import styles from "./index.module.scss";
import { PlayerContainer } from "@/player/usePlayer/PlayerContainer";
import moreIcon from "@/components/img/plus.png";
import lessIcon from "@/components/img/minus.png";
import { ImgCell } from "@/components/Cell/ImgCell";

export const PlayerPanel: FC = () => {
  const { player } = PlayerContainer.useContainer();
  const [advanced, setAdvanced] = useState(false);
  const energy = <Cell propKey={"energy"} />;
  const defence = <Cell propKey={"defence"} />;
  const hp = <Cell propKey={"hp"} />;
  const weak = <Cell propKey={"weak"} />;
  const strength = <Cell propKey={"strength"} />;
  const balls = (
    <>
      <Cell propKey={"lightning"} />
      <Cell propKey={"ice"} />
      <Cell propKey={"dark"} />
    </>
  );
  return (
    <div className={styles["container"]}>
      {/* <div style={{ fontSize: 16 }}>1</div> */}
      {/* <div style={{ fontSize: "1rem" }}>1</div> */}
      <div className={styles["grid"]}>
        {energy}
        {defence}
        {hp}
        {weak}
        {player.role === "ironclad" || advanced ? strength : null}
        {player.role === "defect" || advanced ? balls : null}
        {player.role === "silent" || advanced ? <Cell propKey={"knife"} /> : null}
        {player.role === "watcher" || advanced ? (
          <>
            <Cell propKey={"state"} />
            <Cell propKey={"miracle"} />
          </>
        ) : null}
        {advanced && (
          <>
            <Cell propKey={"gold"} />
            <Cell propKey={"vulnerable"} />
          </>
        )}

        <ImgCell
          onClick={() => {
            setAdvanced((v) => !v);
          }}
          src={advanced ? lessIcon : moreIcon}
        />
      </div>
    </div>
  );
};
