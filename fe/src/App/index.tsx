import { Decks } from "../Decks";
import type { IRole } from "@/player/usePlayer";
import { RoleSelector } from "@/RoleSelector";
import { useStateWithIdbAndImmer } from "@/common/useStateWithIdbAndImmer";
import { PlayerContainer } from "@/player/usePlayer/PlayerContainer";
import { PlayerPanel } from "@/player/PlayerPanel";
import { HelloWorld } from "@/components/HelloWorld";

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
    <PlayerContainer.Provider initialState={role}>
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
        <div
          style={{
            flex: "1",
            overflowY: "auto",
            overflowX: "hidden",
            paddingRight: "0.625rem",
          }}
        >
          <HelloWorld />
          <div style={{ height: "1rem" }} />
          <Decks />
        </div>
        <div style={{ width: "8.3rem", overflowY: "auto", overflowX: "hidden" }}>
          <PlayerPanel />
        </div>
      </div>
    </PlayerContainer.Provider>
  );
}

export default App;
