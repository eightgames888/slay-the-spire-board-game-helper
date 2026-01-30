interface IMonster {
  src: string;
  uuid: string;
  hp: number;
  maxHp: number;
  weak: number;
  vulnerable: number;
  strength: number;
  defence: number;
  posions: number;
  player: "ironclad" | "defect" | "silent" | "watcher";
  redPoint: {
    left: number;
    top: number;
  }
}

export interface IDbData {
  monsters: IMonster[]
}