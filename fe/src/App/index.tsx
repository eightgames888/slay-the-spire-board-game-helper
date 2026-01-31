import { Decks } from "../Decks";
import type { IRole } from "@/player/usePlayer";
import { backgroundMap, RoleSelector } from "@/RoleSelector";
import { useStateWithIdbAndImmer } from "@/common/useStateWithIdbAndImmer";
import { useStateWithWsAndImmer } from "@/common/useStateWithWsAndImmer";
import { PlayerContainer } from "@/player/usePlayer/PlayerContainer";
import { PlayerPanel } from "@/player/PlayerPanel";
import { Monsters } from "@/components/Monsters";
import { Dice } from "@/components/Dice";
import type { IDbData } from "shared";

function App() {
  console.log("app render"); // react bug?
  // @ts-ignore
  const [role, setRole] = useStateWithIdbAndImmer<IRole>("role", null);
  const [dbData, setDbData] = useStateWithWsAndImmer<IDbData>();

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
          // padding: "0.3125rem",
          // backgroundColor: "#3C93C9",
        }}
      >
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
        <div
          style={{
            flex: "1",
            overflowY: "auto",
            overflowX: "hidden",
            paddingRight: "0.625rem",
          }}
        >
          <Dice dbData={dbData} setDbData={setDbData} />
          <Monsters dbData={dbData} setDbData={setDbData} />
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
