import { type FC } from "react";
import { PlayerPanel } from "../PlayerPanel";
import { PlayerContainer } from "../usePlayer/PlayerContainer";
import type { IRole } from "../usePlayer";

export const PlayerMain: FC<{ role: IRole }> = ({ role }) => {
  return (
    <PlayerContainer.Provider initialState={role}>
      <PlayerPanel />
    </PlayerContainer.Provider>
  );
};
