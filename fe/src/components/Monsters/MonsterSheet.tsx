import { type FC, useState } from "react";
import { BottomSheet } from "@/common/BottomSheet";
import type { IMonster } from "shared";

interface MonsterSheetProps {
  monster: IMonster;
  propKey: keyof IMonster;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (uuid: string, fn: (draft: IMonster) => void) => void;
}

export const MonsterSheet: FC<MonsterSheetProps> = ({
  monster,
  propKey,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const deltaProp = (delta: number) => {
    onUpdate(monster.uuid, (draft) => {
      const currentValue = draft[propKey] as number;
      draft[propKey] = Math.max(0, currentValue + delta);
    });
    onClose();
  };

  const setProp = (value: number) => {
    onUpdate(monster.uuid, (draft) => {
      draft[propKey] = Math.max(0, value);
    });
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} height="80vh">
      <div
        style={{
          height: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          paddingTop: "0.5rem",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          paddingBottom: "3rem",
        }}
      >
        {["-1", "+1", "-2", "+2", "-3", "+3"].map((delta) => (
          <div
            style={{
              border: "0.2rem solid",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
            key={delta}
            onClick={() => deltaProp(Number(delta))}
          >
            {delta}
          </div>
        ))}
        <div
          style={{
            border: "0.2rem solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
          onClick={() => {
            const X = Number(window.prompt("Enter value:", "0"));
            if (!isNaN(X)) deltaProp(-X);
          }}
        >
          -X
        </div>
        <div
          style={{
            border: "0.2rem solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
          onClick={() => {
            const X = Number(window.prompt("Enter value:", "0"));
            if (!isNaN(X)) deltaProp(X);
          }}
        >
          +X
        </div>
        <div
          style={{
            border: "0.2rem solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
          onClick={() => setProp(0)}
        >
          C
        </div>
        <div
          style={{
            border: "0.2rem solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
          onClick={() => {
            const X = Number(window.prompt("Enter value:", "0"));
            if (!isNaN(X)) setProp(X);
          }}
        >
          X
        </div>
      </div>
    </BottomSheet>
  );
};
