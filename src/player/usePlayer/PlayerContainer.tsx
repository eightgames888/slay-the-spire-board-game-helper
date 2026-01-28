import { createContainer } from "unstated-next";
import { IRole, usePlayer } from "./";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const PlayerContainer = createContainer((role: IRole) => {
  const [player, setPlayer] = usePlayer(role);
  return {
    player,
    setPlayer,
  };
});
