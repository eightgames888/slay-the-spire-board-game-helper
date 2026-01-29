import defence from "./defence.png";
import knife from "./knife.png";
import weak from "./weak.png";
import vulnerable from "./vulnerable.png";
import gold from "./gold.png";
import hp from "./hp.png";
import strength from "./strength.png";
import energyRed from "./energy/red.png";
import energyBlue from "./energy/blue.png";
import energyGreen from "./energy/green.png";
import energyPurple from "./energy/purple.png";
import lightning from "./ball/lightning.png";
import ice from "./ball/ice.png";
import dark from "./ball/dark.png";
import angry from "./state/angry.png";
import empty from "./state/empty.png";
import peace from "./state/peace.png";
import miracle from "./miracle.png";
import {
  IAngry,
  IEmpty,
  IPeace,
  IPlayer,
  IPropKey,
} from "../../player/usePlayer";

const theImgMap = {
  hp,
  defence,
  gold,
  strength,
  energy: {
    ironclad: energyRed,
    defect: energyBlue,
    silent: energyGreen,
    watcher: energyPurple,
  },
  knife,
  weak,
  vulnerable,
  miracle,
  lightning,
  ice,
  dark,
  state: {
    [IPeace]: peace,
    [IEmpty]: empty,
    [IAngry]: angry,
  },
} as const;

export const getImgByPropKey = (propKey: IPropKey, player: IPlayer) => {
  const theImg = theImgMap[propKey];
  if (propKey === "energy") {
    return theImg[player.role];
  } else if (propKey === "state") {
    return theImg[player.state];
  }
  return theImg || defence;
};
