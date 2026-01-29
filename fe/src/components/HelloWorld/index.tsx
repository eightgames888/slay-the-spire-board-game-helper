import type { IMonster } from "shared";
import { useStateWithWsAndImmer } from "../../common/useStateWithWsAndImmer";
import { PlayerContainer } from "@/player/usePlayer/PlayerContainer";

export function HelloWorld() {
  const { player } = PlayerContainer.useContainer();
  const [monsters, setMonsters] = useStateWithWsAndImmer<IMonster[]>();

  const handleClick = () => {
    if (monsters) {
      setMonsters((v) => [
        ...v,
        {
          src: "src",
          hp: 100,
          maxHp: 100,
          weak: 0,
          vulnerable: 0,
          strength: 0,
          defence: 0,
          posions: 0,
          player: player.role,
        },
      ]);
    }
  };

  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        zIndex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <div>{JSON.stringify(monsters)}</div>
      <button onClick={handleClick}>Add a monster</button>
    </div>
  );
}
