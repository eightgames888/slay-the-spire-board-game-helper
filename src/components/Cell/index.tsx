import { ImgCell } from "./ImgCell";
import React, { FC } from "react";
import { IPropKey } from "@/player/usePlayer";
import { PlayerContainer } from "@/player/usePlayer/PlayerContainer";
import { getImgByPropKey } from "../img/getImgByPropKey";
import { useSheet } from "../Sheet";

interface ICellProps {
  propKey: IPropKey;
}

export const Cell: FC<ICellProps> = ({ propKey }) => {
  const { openSheet, sheet } = useSheet(propKey);
  const { player } = PlayerContainer.useContainer();
  const getText = () => {
    const propValue = player[propKey];
    if (propKey === "energy") {
      return `${propValue}/${player.maxEnergy}`;
    } else if (propKey === "hp") {
      return `${propValue}/${player.maxHp}`;
    }
    return propValue;
  };
  return (
    <>
      <ImgCell
        text={getText()}
        onClick={() => {
          openSheet();
        }}
        src={getImgByPropKey(propKey, player)}
      />
      {sheet}
    </>
  );
};
