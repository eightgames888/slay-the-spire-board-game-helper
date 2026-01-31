import { type FC } from "react";
import type { IDbData } from "shared";
import { useDice } from "./useDice";

// 骰子数字对应的emoji
const diceEmojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

interface DiceProps {
  dbData: IDbData | undefined;
  setDbData: (fn: (draft: IDbData) => void) => void;
}

export const Dice: FC<DiceProps> = ({ dbData, setDbData }) => {
  const { diceValue, rollDice } = useDice(dbData, setDbData);

  return (
    <div
      style={{
        cursor: "pointer",
        fontSize: "2rem",
        backgroundColor: "rgba(38, 71, 84, 0.8)",
        borderRadius: "8px",
        padding: "0.5rem",
        border: "2px solid #fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "3rem",
        height: "3rem",
        userSelect: "none",
        marginBottom: "1rem",
      }}
      onClick={rollDice}
      title="Click to roll dice (or enter a number 1-6)"
    >
      {diceEmojis[diceValue - 1] || diceEmojis[0]}
    </div>
  );
};
