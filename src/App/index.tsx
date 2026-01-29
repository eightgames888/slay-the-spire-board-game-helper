import { Decks } from "../Decks";
import { PlayerMain } from "../player/PlayerMain";
import styles from "./index.module.scss";
import type { IRole } from "@/player/usePlayer";
import { RoleSelector } from "@/RoleSelector";
import { useStateWithIdbAndImmer } from "@/common/useStateWithIdbAndImmer";

function App() {
  // @ts-ignore
  const [role, setRole] = useStateWithIdbAndImmer<IRole>("role", null);
  if (!role) {
    return (
      <div className={styles["app-root"]}>
        <RoleSelector confirmRole={setRole} />
      </div>
    );
  }
  return (
    <div
      className={styles["app-root"]}
      style={{ display: "flex", width: "100%", padding: 5, backgroundColor: "#3C93C9" }}
    >
      <div style={{ flex: "1", overflowY: "auto" }}>
        <Decks />
      </div>
      <div style={{ width: "8.3rem", overflowY: "auto" }}>
        <PlayerMain role={role} />
      </div>
    </div>
  );
}

export default App;
