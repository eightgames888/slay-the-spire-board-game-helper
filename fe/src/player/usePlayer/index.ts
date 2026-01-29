import { useStateWithIdbAndImmer } from "@/common/useStateWithIdbAndImmer";

export type IRole = "ironclad" | "defect" | "silent" | "watcher";
export const IPeace = -1 as const;
export const IEmpty = 0 as const;
export const IAngry = 1 as const;
export type IState = typeof IPeace | typeof IEmpty | typeof IAngry;

export interface IPlayer {
  role: IRole;
  energy: number;
  maxEnergy: number;
  defence: number;
  hp: number;
  maxHp: number;
  strength: number;
  weak: number;
  vulnerable: number;
  gold: number;
  state: IState;
  miracle: number;
  knife: number;
  lightning: number;
  ice: number;
  dark: number;
}

export type IPropKey = keyof IPlayer;

const generatePlayer = (role: IRole): IPlayer => {
  const ret: IPlayer = {} as IPlayer;
  ret.role = role;
  ret.maxEnergy = 3;
  ret.gold = 0;
  if (ret.role === "ironclad") {
    ret.maxHp = 10;
  } else {
    ret.maxHp = 9;
  }

  const startOfTurn = () => {
    ret.energy = ret.maxEnergy;
    ret.defence = 0;
  };

  const startOfBattle = () => {
    startOfTurn();
    ret.strength = 0;
    ret.weak = 0;
    ret.vulnerable = 0;
    ret.state = IEmpty;
    ret.knife = 0;
    if (ret.role === "watcher") {
      ret.miracle = 1;
    } else {
      ret.miracle = 0;
    }
    if (ret.role === "defect") {
      ret.lightning = 1;
    } else {
      ret.lightning = 0;
    }
    ret.ice = 0;
    ret.dark = 0;
  };
  const startOfAct = () => {
    ret.hp = ret.maxHp;
    startOfBattle();
  };
  startOfAct();
  return ret;
};

export const usePlayer = (role: IRole) => {
  const [player, setPlayer] = useStateWithIdbAndImmer(
    role as string,
    generatePlayer(role)
  );
  return [player, setPlayer] as const;
};
