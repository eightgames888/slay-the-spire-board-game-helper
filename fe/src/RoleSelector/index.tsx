import type { IRole } from "../player/usePlayer";
import { type FC, useState } from "react";
import roleButtonRed from "./img/role-button/ironclad.png";
import roleButtonGreen from "./img/role-button/silent.png";
import roleButtonBlue from "./img/role-button/defect.png";
import roleButtonPurple from "./img/role-button/watcher.png";
import logo from "./img/logo.jpg";
import roleBackgroundIronclad from "./img/role-background/ironcladPortrait.jpg";
import roleBackgroundDefect from "./img/role-background/defectPortrait.jpg";
import roleBackgroundSilent from "./img/role-background/silentPortrait.jpg";
import roleBackgroundWatcher from "./img/role-background/watcherPortrait.jpg";
import { ConfirmButton } from "./confirm-button";

export const backgroundMap = {
  ironclad: roleBackgroundIronclad,
  defect: roleBackgroundDefect,
  silent: roleBackgroundSilent,
  watcher: roleBackgroundWatcher,
} as const;

export const RoleSelector: FC<{
  confirmRole: (r: IRole) => void;
}> = ({ confirmRole }) => {
  const [role, setRole] = useState<IRole>();

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative", overflow: "hidden" }}>
      {role ? (
        <img
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
          src={backgroundMap[role]}
        />
      ) : (
        <img style={{ position: "absolute", width: "100%", zIndex: -1 }} src={logo} />
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem",
          position: "absolute",
          bottom: "4rem",
          width: "100%",
        }}
      >
        <img
          style={{ width: "6rem", height: "6rem" }}
          src={roleButtonRed}
          onClick={() => {
            setRole("ironclad");
          }}
        />
        <img
          style={{ width: "6rem", height: "6rem" }}
          src={roleButtonBlue}
          onClick={() => {
            setRole("defect");
          }}
        />
        <img
          style={{ width: "6rem", height: "6rem" }}
          src={roleButtonGreen}
          onClick={() => {
            setRole("silent");
          }}
        />
        <img
          style={{ width: "6rem", height: "6rem" }}
          src={roleButtonPurple}
          onClick={() => {
            setRole("watcher");
          }}
        />
      </div>

      {role ? (
        <div style={{ position: "absolute", bottom: "14rem", right: 0 }}>
          <ConfirmButton
            onConfirm={() => {
              confirmRole(role);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
