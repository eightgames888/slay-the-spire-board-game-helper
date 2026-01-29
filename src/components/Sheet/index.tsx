import { useState } from "react";
import { promptNumber } from "@/common/isRealNumber";
import { BottomSheet } from "@/common/BottomSheet";
import { PlayerContainer } from "@/player/usePlayer/PlayerContainer";
import type { IPropKey } from "@/player/usePlayer";

export const useSheet = (propKey: IPropKey) => {
  const [visible, setVisible] = useState(false);
  const openSheet = () => {
    setVisible(true);
  };
  const closeSheet = () => {
    setVisible(false);
  };
  const { player, setPlayer } = PlayerContainer.useContainer();
  const theProp = player[propKey];
  const setProp = (newProp: number) => {
    setPlayer((p) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      p[propKey] = newProp;
    });
    closeSheet();
  };
  const deltaProp = (delta: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newProp = theProp + delta;
    setProp(newProp);
  };
  return {
    openSheet,
    sheet: (
      <BottomSheet
        isOpen={visible}
        onClose={() => {
          setVisible(false);
        }}
        height={"80vh"}
      >
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
              onClick={() => {
                deltaProp(Number(delta));
              }}
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
              promptNumber((X) => {
                deltaProp(-X);
              });
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
              promptNumber((X) => {
                deltaProp(X);
              });
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
            onClick={() => {
              setProp(0);
            }}
          >
            C
          </div>
          {["energy", "hp"].includes(propKey) ? (
            <>
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
                  if (propKey === "energy") {
                    setProp(player.maxEnergy);
                  } else if (propKey === "hp") {
                    setProp(player.maxHp);
                  }
                }}
              >
                MAX
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
                  if (propKey === "energy") {
                    setPlayer((p) => {
                      p.maxEnergy--;
                    });
                  } else if (propKey === "hp") {
                    setPlayer((p) => {
                      p.maxHp--;
                    });
                  }
                  closeSheet();
                }}
              >
                MAX-1
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
                  if (propKey === "energy") {
                    setPlayer((p) => {
                      p.maxEnergy++;
                    });
                  } else if (propKey === "hp") {
                    setPlayer((p) => {
                      p.maxHp++;
                    });
                  }
                  closeSheet();
                }}
              >
                MAX+1
              </div>
            </>
          ) : (
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
                promptNumber((X) => {
                  setProp(X);
                });
              }}
            >
              X
            </div>
          )}
        </div>
      </BottomSheet>
    ),
  };
};
