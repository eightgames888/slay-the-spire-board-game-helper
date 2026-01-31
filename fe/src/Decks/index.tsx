import { useState } from "react";
import { useDecks, type IDeckId } from "./useDecks";
import { useStateWithIdbAndImmer } from "../common/useStateWithIdbAndImmer";
import cardBack from "../static/imgs/card-back.png";
import mainIcon from "../static/imgs/main.png";
import discardIcon from "../static/imgs/discard.png";
import endOfBattleIcon from "../static/imgs/end-of-battle.png";
import peekIcon from "../static/imgs/peek.png";
import uploadIcon from "../static/imgs/upload.png";

import CardSelector from "./CardSelector";

export const Decks = () => {
  const {
    decks,
    resetAllToMain,
    shuffleMainDeck,
    addToHand,
    deleteCard,
    moveCard,
    discardAll,
    drawXCards,
  } = useDecks();

  const [mainVisible, setMainVisible] = useState(false);
  const [defaultDrawNumber, setDefaultDrawNumber] = useState(5);
  const [flippedCards, setFlippedCards] = useStateWithIdbAndImmer("flippedCards", [] as string[]);
  const [cardNote, setCardNote] = useStateWithIdbAndImmer(
    "cardNote",
    {} as { [key: string]: string | undefined },
  );
  const [cardSelectorVisible, setCardSelectorVisible] = useState(false);

  const handleCardSelect = (filePaths: string[]) => {
    const fileNames = filePaths.map((path) =>
      path.replace("/static/slay-the-spire-mod-unpack/", ""),
    );
    addToHand(fileNames);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.9375rem",
      }}
    >
      {Object.entries(decks).map((entry) => {
        const deckId = entry[0] as IDeckId;
        const cards = entry[1];
        if (!cards.length && !["hand", "main"].includes(deckId)) {
          return null;
        }
        const header = (
          <div
            style={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "0.9375rem",
              color: "oldlace",
            }}
          >
            <span>{`${deckId.toUpperCase()}: ${cards.length}`}</span>
            {deckId === "main" &&
              (cards.length ? (
                <img
                  src={peekIcon}
                  style={{ width: "2.1875rem" }}
                  onClick={() => {
                    setMainVisible((v) => !v);
                  }}
                />
              ) : null)}
            {deckId === "hand" && (
              <>
                <img
                  src={mainIcon}
                  style={{ width: "3rem" }}
                  onClick={() => {
                    const x = window.prompt(
                      `Draw ? cards\n(You can just input '?' to change then default amount instead of ${defaultDrawNumber})`,
                      `${defaultDrawNumber}`,
                    );
                    if (x === "?") {
                      const newDefaultDrawNumber = Number(
                        window.prompt("Please input default amount of drawing cards"),
                      );
                      if (newDefaultDrawNumber) {
                        setDefaultDrawNumber(newDefaultDrawNumber);
                      }
                    } else if (x) {
                      drawXCards(Number(x));
                    }
                  }}
                />
                {cards.length ? (
                  <img
                    src={discardIcon}
                    style={{ width: "3rem" }}
                    onClick={() => {
                      discardAll();
                    }}
                  />
                ) : null}
              </>
            )}
          </div>
        );
        const renderedCards = (
          <div
            style={{
              display: deckId === "main" && !mainVisible ? "none" : "grid",
              gridTemplateColumns:
                deckId === "relic"
                  ? "repeat(auto-fill, minmax(6.25rem, 1fr))"
                  : "repeat(auto-fill, minmax(9.375rem, 1fr))",
              gap: "0.3125rem",
            }}
          >
            {cards.map((card, index) => (
              <div
                key={card.uuid}
                style={{
                  position: "relative",
                  transform: flippedCards.includes(card.uuid) ? "rotate(180deg)" : undefined,
                }}
                onClick={() => {
                  const action = window.prompt(
                    `Please input action:
(r)elic (a)bility (h)and (m)ain (d)iscard (e)xhaust
(x)delete (v)view (f)lip (n)ote`,
                    "d",
                  );
                  if (action === null) {
                    return;
                  } else if (action === "x" && window.confirm("Delte this card?")) {
                    deleteCard(deckId, index);
                  } else if (action === "v") {
                    alert(card.src);
                  } else if (action === "f") {
                    setFlippedCards((v) =>
                      v.includes(card.uuid)
                        ? [...v].filter((i) => i !== card.uuid)
                        : [...v, card.uuid],
                    );
                  } else if (action === "n") {
                    const note = window.prompt(
                      "Please input the note:\n(You can input just a space to clear the note)",
                    );
                    if (note === " ") {
                      setCardNote((v) => {
                        v[card.uuid] = undefined;
                      });
                    } else if (note) {
                      setCardNote((v) => {
                        v[card.uuid] = note;
                      });
                    }
                  } else if (["r", "a", "h", "m", "d", "e"].includes(action)) {
                    moveCard(
                      deckId,
                      index,
                      // @ts-ignore
                      {
                        r: "relic",
                        a: "ability",
                        h: "hand",
                        m: "main",
                        d: "discard",
                        e: "exhaust",
                      }[action],
                    );
                  }
                }}
              >
                <img
                  src={card.src}
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    borderRadius: "3%",
                  }}
                />
                {cardNote[card.uuid] && (
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontSize: "3.625rem",
                    }}
                  >
                    {cardNote[card.uuid]}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
        return (
          <div
            key={deckId}
            style={{
              border: "0.0625rem solid",
              backgroundColor: "rgb(38, 71, 84, 0.8)",
            }}
          >
            {header}
            {renderedCards}
            {deckId === "main" && !mainVisible && cards.length ? (
              <img
                src={cardBack}
                style={{
                  display: "block",
                  width: "9.375rem",
                  borderRadius: "3%",
                }}
                onClick={() => {
                  shuffleMainDeck();
                  alert("Deck shuffled successfully!");
                }}
              />
            ) : null}
          </div>
        );
      })}
      <div
        onClick={resetAllToMain}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "fit-content",
        }}
      >
        <img
          src={endOfBattleIcon}
          style={{
            display: "block",
            width: "12.5rem",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "0.9375rem",
            color: "lime",
            fontSize: "x-large",
            fontWeight: "bolder",
          }}
        >
          End of Battle
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img
          src={uploadIcon}
          style={{
            width: "9.375rem",
            borderRadius: "3%",
          }}
          onClick={() => {
            setCardSelectorVisible(true);
          }}
        />
        <span style={{ color: "white", marginTop: "0.25rem" }}>Browse Cards</span>
      </div>

      <CardSelector
        isOpen={cardSelectorVisible}
        onClose={() => setCardSelectorVisible(false)}
        onSelect={handleCardSelect}
      />
    </div>
  );
};
