import { type FC, useState } from "react";
import type { IMonster } from "shared";
import { MonsterSheet } from "./MonsterSheet";

interface MonsterPropertyCellProps {
  monster: IMonster;
  setMonster: (uuid: string, fn: (draft: IMonster) => void) => void;
  propKey: keyof IMonster;
  imgSrc: string;
  text: string;
}

export const MonsterPropertyCell: FC<MonsterPropertyCellProps> = ({
  monster,
  setMonster,
  propKey,
  imgSrc,
  text,
}) => {
  const [visible, setVisible] = useState(false);

  const openSheet = () => setVisible(true);
  const closeSheet = () => setVisible(false);

  return (
    <>
      <div
        onClick={openSheet}
        style={{
          position: "relative",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <img
          src={imgSrc}
          style={{
            maxWidth: "100%",
          }}
        />
        {text && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bolder",
              textShadow:
                "0.05rem 0.05rem 0.05rem #888, 0.0625rem 0.0625rem 0.125rem black, 0 0 0.3125rem red",
              fontSize: text.length > 3 ? "1.25rem" : "1.75rem",
            }}
          >
            {text}
          </div>
        )}
      </div>

      <MonsterSheet
        monster={monster}
        propKey={propKey}
        isOpen={visible}
        onClose={closeSheet}
        onUpdate={setMonster}
      />
    </>
  );
};
