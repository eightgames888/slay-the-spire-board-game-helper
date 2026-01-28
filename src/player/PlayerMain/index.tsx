import { useState, type FC } from "react";
import { PlayerPanel } from "../PlayerPanel";
import styles from "./index.module.scss";
import { RoleSelector } from "../../RoleSelector";
import { PlayerContainer } from "../usePlayer/PlayerContainer";
import type { IRole } from "../usePlayer";

export const PlayerMain: FC = () => {
  const [role, setRole] = useState<IRole>();
  // const [role, setRole] = useState<IRole>("ironclad");
  // const [role, setRole] = useState<IRole>("defect");
  // const [role, setRole] = useState<IRole>("silent");
  // const [role, setRole] = useState<IRole>("watcher");
  const roleSelector = <RoleSelector role={role} setRole={setRole} />;
  return (
    <div className={styles["root"]}>
      {role ? (
        <PlayerContainer.Provider initialState={role}>
          <PlayerPanel />
        </PlayerContainer.Provider>
      ) : (
        roleSelector
      )}
    </div>
  );
};
