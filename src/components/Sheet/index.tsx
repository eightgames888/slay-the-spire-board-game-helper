import { useState } from "react";
import styles from "./index.module.scss";
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
        // className={styles["sidesheet"]}
        isOpen={visible}
        onClose={() => {
          setVisible(false);
        }}
        // title={ <img src={getImgByPropKey(propKey)} className={styles["title"]} /> }
        // className={styles["sheet"]}
        height={"80vh"}
      >
        <div className={styles["container"]}>
          {["-1", "+1", "-2", "+2", "-3", "+3"].map((delta) => (
            <div
              className={styles["grid-item"]}
              key={delta}
              onClick={() => {
                deltaProp(Number(delta));
              }}
            >
              {delta}
            </div>
          ))}
          <div
            className={styles["grid-item"]}
            onClick={() => {
              promptNumber((X) => {
                deltaProp(-X);
              });
            }}
          >
            -X
          </div>
          <div
            className={styles["grid-item"]}
            onClick={() => {
              promptNumber((X) => {
                deltaProp(X);
              });
            }}
          >
            +X
          </div>
          <div
            className={styles["grid-item"]}
            onClick={() => {
              setProp(0);
            }}
          >
            C
          </div>
          {["energy", "hp"].includes(propKey) ? (
            <>
              <div
                className={styles["grid-item"]}
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
                className={styles["grid-item"]}
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
                className={styles["grid-item"]}
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
              className={styles["grid-item"]}
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
