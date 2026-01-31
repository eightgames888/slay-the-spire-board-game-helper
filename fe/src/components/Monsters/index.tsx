import type { IDbData, IMonster } from "shared";
import { useStateWithWsAndImmer } from "../../common/useStateWithWsAndImmer";
import { PlayerContainer } from "@/player/usePlayer/PlayerContainer";
import { uuid } from "@/common/uuid";
import { useRef, type FC } from "react";
import { useDragRect } from "@/common/useDragRect";
import { MonsterPropertyCell } from "./MonsterPropertyCell";
import hpImg from "@/components/img/hp.png";
import weakImg from "@/components/img/weak.png";
import vulnerableImg from "@/components/img/vulnerable.png";
import strengthImg from "@/components/img/strength.png";
import defenceImg from "@/components/img/defence.png";
import poisonImg from "@/static/imgs/poison.png";

const useMonsters = () => {
  const { player } = PlayerContainer.useContainer();
  const [dbData, setDbData] = useStateWithWsAndImmer<IDbData>();
  const monsters = dbData?.monsters || [];
  const boss = monsters.filter((monster) => monster.player === "all");
  const myMonsters = monsters.filter((monster) => monster.player === player.role);
  const othersMonsters = monsters.filter(
    (monster) => monster.player !== "all" && monster.player !== player.role,
  );
  const sortedMonster = [...boss, ...myMonsters, ...othersMonsters];
  const setMonsters = (fn: (draft: IDbData["monsters"]) => void) => {
    setDbData((draft) => {
      fn(draft.monsters);
    });
  };
  const deleteAllMonster = () => {
    if (confirm("Delete all monsters?")) {
      setDbData((draft) => {
        draft.monsters = [];
      });
    }
  };
  const setMonster = (uuid: string, fn: (draft: IDbData["monsters"][0]) => void) => {
    setMonsters((monsters) => {
      monsters.forEach((monster) => {
        if (monster.uuid === uuid) {
          fn(monster);
        }
      });
    });
  };
  return {
    monsters: sortedMonster,
    setMonsters,
    setMonster,
    deleteAllMonster,
  };
};

export const Monster: FC<{
  monster: IMonster;
  setMonster: (uuid: string, fn: (draft: IMonster) => void) => void;
}> = ({ monster, setMonster }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { dragItemProps } = useDragRect({
    initPositoin: monster.redPoint,
    containerRef,
    width: 9.2,
    onDrop: (position) => {
      setMonster(monster.uuid, (draft) => {
        draft.redPoint = position;
      });
    },
  });
  const role = monster.player;

  return (
    <div
      style={{
        backgroundColor: {
          all: "gold",
          ironclad: "red",
          defect: "blue",
          silent: "green",
          watcher: "purple",
        }[role],
        borderRadius: "0.5rem",
        padding: "0.5rem",
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: "relative",
        }}
      >
        <div
          {...dragItemProps}
          style={{
            ...dragItemProps.style,
            backgroundColor: "red",
          }}
        />

        <img
          src={monster.src}
          style={{
            width: "100%",
            borderRadius: "3%",
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.25rem",
          padding: "0.25rem",
        }}
      >
        <MonsterPropertyCell
          monster={monster}
          setMonster={setMonster}
          propKey="hp"
          imgSrc={hpImg}
          text={monster.hp > 0 ? monster.hp.toString() : ""}
        />
        <MonsterPropertyCell
          monster={monster}
          setMonster={setMonster}
          propKey="weak"
          imgSrc={weakImg}
          text={monster.weak > 0 ? monster.weak.toString() : ""}
        />
        <MonsterPropertyCell
          monster={monster}
          setMonster={setMonster}
          propKey="vulnerable"
          imgSrc={vulnerableImg}
          text={monster.vulnerable > 0 ? monster.vulnerable.toString() : ""}
        />
        <MonsterPropertyCell
          monster={monster}
          setMonster={setMonster}
          propKey="strength"
          imgSrc={strengthImg}
          text={monster.strength > 0 ? monster.strength.toString() : ""}
        />
        <MonsterPropertyCell
          monster={monster}
          setMonster={setMonster}
          propKey="defence"
          imgSrc={defenceImg}
          text={monster.defence > 0 ? monster.defence.toString() : ""}
        />
        <MonsterPropertyCell
          monster={monster}
          setMonster={setMonster}
          propKey="posions"
          imgSrc={poisonImg}
          text={monster.posions > 0 ? monster.posions.toString() : ""}
        />
      </div>
    </div>
  );
};

export const Monsters: FC = () => {
  const { player } = PlayerContainer.useContainer();
  const { monsters, setMonsters, setMonster, deleteAllMonster } = useMonsters();
  return (
    <div
      style={{
        backgroundColor: "rgb(38, 71, 84, 0.8)",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "0.9375rem",
          color: "oldlace",
        }}
      >
        <span>MONSTERS</span>
        <button
          onClick={() => {
            const src = window.prompt("src", "/static/imgs/first-monster-1.png");
            if (!src) {
              return;
            }
            setMonsters((v) => {
              v.push({
                src,
                hp: 0,
                weak: 0,
                vulnerable: 0,
                strength: 0,
                defence: 0,
                posions: 0,
                player: src.includes("boss") ? "all" : player.role,
                redPoint: {
                  left: 50,
                  top: 50,
                },
                uuid: uuid(),
              });
            });
          }}
        >
          Add Monster
        </button>
        <button
          onClick={() => {
            deleteAllMonster();
          }}
        >
          Delete All Monsters
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
          gap: "0.3125rem",
        }}
      >
        {monsters.map((monster) => {
          return <Monster key={monster.uuid} monster={monster} setMonster={setMonster} />;
        })}
      </div>
    </div>
  );
};
