export interface IMonster {
  src: string;
  hp: number;
  maxHp: number;
  weak: number;
  vulnerable: number;
  strength: number;
  defence: number;
  posions: number;
  player: "ironclad" | "defect" | "silent" | "watcher";
}
