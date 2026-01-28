import { IRole } from "../player/usePlayer";
import React, { FC, useState } from "react";
import roleButtonRed from "./img/role-button/ironclad.png";
import roleButtonGreen from "./img/role-button/silent.png";
import roleButtonBlue from "./img/role-button/defect.png";
import roleButtonPurple from "./img/role-button/watcher.png";
import logo from "./img/logo.jpg";
import roleBackgroundIronclad from "./img/role-background/ironclad.png";
import roleBackgroundDefect from "./img/role-background/defect.png";
import roleBackgroundSilent from "./img/role-background/silent.png";
import roleBackgroundWatcher from "./img/role-background/watcher.png";
import styles from "./index.module.scss";
import { ConfirmButton } from "./confirm-button";

const backgroundMap = {
  ironclad: roleBackgroundIronclad,
  defect: roleBackgroundDefect,
  silent: roleBackgroundSilent,
  watcher: roleBackgroundWatcher,
} as const;

export const RoleSelector: FC<{
  role?: IRole;
  setRole: (r: IRole) => void;
}> = ({ role: _role, setRole: _setRole }) => {
  const [role, setRole] = useState<IRole>(_role);
  // const [role, setRole] = useState<IRole>("defect");
  // const [role, setRole] = useState<IRole>("silent");
  // const [role, setRole] = useState<IRole>("watcher");
  const onConfirm = () => {
    _setRole(role);
  };

  return (
    <div className={styles["page"]}>
      <img
        className={styles["background"]}
        src={role ? backgroundMap[role] : logo}
      />

      {role ? <ConfirmButton onConfirm={onConfirm} /> : null}

      <div className={styles["selector-container"]}>
        <img
          className={styles["role-button"]}
          src={roleButtonRed}
          onClick={() => {
            setRole("ironclad");
          }}
        />
        <img
          className={styles["role-button"]}
          src={roleButtonBlue}
          onClick={() => {
            setRole("defect");
          }}
        />
        <img
          className={styles["role-button"]}
          src={roleButtonGreen}
          onClick={() => {
            setRole("silent");
          }}
        />
        <img
          className={styles["role-button"]}
          src={roleButtonPurple}
          onClick={() => {
            setRole("watcher");
          }}
        />
      </div>
    </div>
  );
};
