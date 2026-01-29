import { Decks } from "../Decks";
import { PlayerMain } from "../player/PlayerMain";
import type { IRole } from "@/player/usePlayer";
import { RoleSelector } from "@/RoleSelector";
import { useStateWithIdbAndImmer } from "@/common/useStateWithIdbAndImmer";

function App() {
  // @ts-ignore
  const [role, setRole] = useStateWithIdbAndImmer<IRole>("role", null);
  if (!role) {
    return (
      <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
        <RoleSelector confirmRole={setRole} />
      </div>
    );
  }
  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
        display: "flex",
        width: "100vw",
        padding: "0.3125rem",
        backgroundColor: "#3C93C9",
      }}
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
