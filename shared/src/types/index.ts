export interface IMonster {
  src: string;
  uuid: string;
  hp: number;
  weak: number;
  vulnerable: number;
  strength: number;
  defence: number;
  posions: number;
  player: "all" | "ironclad" | "defect" | "silent" | "watcher";
  redPoint: {
    left: number;
    top: number;
  };
}

export interface IDbData {
  monsters: IMonster[];
  dice: number;
}
