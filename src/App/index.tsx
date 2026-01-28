import { useState } from "react";
import { Decks } from "../Decks";
import { PlayerMain } from "../player/PlayerMain";
import styles from "./index.module.scss";
import type { IRole } from "@/player/usePlayer";
import { RoleSelector } from "@/RoleSelector";

function App() {
  const [role, setRole] = useState<IRole>();
  if (!role) {
    return (
      <div className={styles["app-root"]}>
        <RoleSelector role={role} setRole={setRole} />
      </div>
    );
  }
  return (
    <div className={styles["app-root"]} style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "80%", height: "100%", overflowY: "auto" }}>
        <Decks />
      </div>
      <div style={{ width: "20%", height: "100%", overflowY: "auto" }}>
        <PlayerMain role={role} />
      </div>
    </div>
  );
}

export default App;
