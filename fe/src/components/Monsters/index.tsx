import type { IDbData } from "shared";
import { useStateWithWsAndImmer } from "../../common/useStateWithWsAndImmer";
import { PlayerContainer } from "@/player/usePlayer/PlayerContainer";
import { uuid } from "@/common/uuid";
import type { FC } from "react";

const useMonsters = () => {
  const [dbData, setDbData] = useStateWithWsAndImmer<IDbData>();
  const monsters = dbData?.monsters || [];
  const setMonsters = (fn: (arg: IDbData['monsters']) => IDbData['monsters']) => {
    setDbData(vv => {
      vv.monsters = fn(vv.monsters)
    })
  }
  return [monsters, setMonsters] as const;
}

export const Monsters: FC = () => {
  const { player } = PlayerContainer.useContainer();
  const [monsters, setMonsters] = useMonsters()
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        backgroundColor: "rgb(38, 71, 84)",
        boxShadow: "inset 0 -0.25rem 0.25rem rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "0.9375rem",
          color: "oldlace",
          fontFamily: "fantasy",
        }}
      >
        <span>MONSTERS</span>
        <button
          onClick={() => {
            const src = window.prompt("src");
            if (!src) {
              return;
            }
            setMonsters((v) => [
              ...v,
              {
                src,
                hp: 100,
                maxHp: 100,
                weak: 0,
                vulnerable: 0,
                strength: 0,
                defence: 0,
                posions: 0,
                player: player.role,
                uuid: uuid(),
              },
            ]);
          }}
        >
          Add a monster
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(9.375rem, 1fr))",
          gap: "0.3125rem",
        }}
      >
        {monsters.map((monster) => {
          return (
            <div
              key={monster.uuid}
              onClick={() => {
                if (window.confirm("Delete this monster?")) {
                  setMonsters((v) => v.filter((i) => i.uuid !== monster.uuid));
                }
              }}
            >
              <img
                src={monster.src}
                style={{
                  maxWidth: "100%",
                  borderRadius: "3%",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
