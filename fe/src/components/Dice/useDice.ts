import { PlayerContainer } from "@/player/usePlayer/PlayerContainer";
import type { IDbData } from "shared";

export const useDice = (dbData: IDbData | undefined, setDbData: (fn: (draft: IDbData) => void) => void) => {
  const { player } = PlayerContainer.useContainer();
  const diceValue = dbData?.dice || 1;

  const rollDice = () => {
    const userInput = window.prompt(
      "Roll dice? (y to roll, or enter a number 1-6)",
      "y"
    );
    
    if (userInput === null) {
      return; // 用户取消
    }
    
    if (userInput.toLowerCase() === "y" || userInput === "") {
      // 随机掷骰子
      const newValue = Math.floor(Math.random() * 6) + 1;
      setDbData((draft) => {
        draft.dice = newValue;
      });
    } else {
      // 用户输入了数字
      const numberInput = parseInt(userInput);
      if (numberInput >= 1 && numberInput <= 6) {
        setDbData((draft) => {
          draft.dice = numberInput;
        });
      } else {
        alert("Please enter a number between 1 and 6");
      }
    }
  };

  return {
    diceValue,
    rollDice,
  };
};