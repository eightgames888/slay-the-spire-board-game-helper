import type { IDbData } from "shared";
import { useStateWithWsAndImmer } from "../../common/useStateWithWsAndImmer";
import { PlayerContainer } from "@/player/usePlayer/PlayerContainer";
import { uuid } from "@/common/uuid";
import { useRef, type FC } from "react";
import { useDragRect } from "./useDraggble";

const useMonsters = () => {
  const [dbData, setDbData] = useStateWithWsAndImmer<IDbData>();
  const monsters = dbData?.monsters || [];
  const setMonsters = (fn: (draft: IDbData['monsters']) => void) => {
    setDbData(draft => {
      fn(draft.monsters)
    })
  }
  const setMonster = (uuid: string, fn: (draft: IDbData['monsters'][0]) => void) => {
    setMonsters(monsters => {
      monsters.forEach(monster => {
        if (monster.uuid === uuid) {
          fn(monster)
        }
      })
    })
  }
  return {
    monsters,
    setMonsters,
    setMonster
  }
}

export const Monster: FC<{ monster: IDbData['monsters'][0], setMonster: (uuid: string, fn: (draft: IDbData['monsters'][0]) => void) => void }> = ({ monster, setMonster }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { dragItemProps } = useDragRect({
    initPositoin: monster.redPoint,
    containerRef, width: 9.2, onDrop: (position) => {
      setMonster(monster.uuid, draft => {
        draft.redPoint = position;
      })
    }
  });
  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div
        {...dragItemProps}
        style={{
          ...dragItemProps.style,
          backgroundColor: 'red',
        }} />
      <img
        src={monster.src}
        style={{
          maxWidth: "100%",
          borderRadius: "3%",
        }}
      />
    </div>
  )
}

export const Monsters: FC = () => {
  const { player } = PlayerContainer.useContainer();
  const {
    monsters,
    setMonsters,
    setMonster
  } = useMonsters()
  return (
    <div
      style={{
        backgroundColor: "rgb(38, 71, 84)"
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
            const src = window.prompt("src", '/static/imgs/first-monster-1.png');
            if (!src) {
              return;
            }
            setMonsters((v) => {
              v.push({
                src,
                hp: 100,
                maxHp: 100,
                weak: 0,
                vulnerable: 0,
                strength: 0,
                defence: 0,
                posions: 0,
                player: player.role,
                redPoint: {
                  left: 0,
                  top: 0
                },
                uuid: uuid(),
              })
            });
          }}
        >
          Add a monster
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
          return (
            <Monster key={monster.uuid} monster={monster} setMonster={setMonster} />
          );
        })}
      </div>
    </div>
  );
}
