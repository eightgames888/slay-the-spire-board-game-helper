import { useState } from "react";
import { useDecks, type IDeckId } from "./useDecks";
import { FileImage } from "../common/FileImage";
import { useStateWithIdbAndImmer } from "../common/useStateWithIdbAndImmer";
import cardBack from "../static/imgs/card-back.png";
import mainIcon from "../static/imgs/main.png";
import discardIcon from "../static/imgs/discard.png";
import endOfBattleIcon from "../static/imgs/end-of-battle.png";
import peekIcon from "../static/imgs/peek.png";

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 15,
        padding: 5,
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
              paddingTop: 5,
              paddingBottom: 5,
              display: "flex",
              alignItems: "center",
              gap: 15,
              paddingLeft: 5,
              color: "oldlace",
              fontFamily: "fantasy",
            }}
          >
            <span>{`${deckId.toUpperCase()}: ${cards.length}`}</span>
            {deckId === "main" &&
              (cards.length ? (
                <img
                  src={peekIcon}
                  width={35}
                  onClick={() => {
                    setMainVisible((v) => !v);
                  }}
                />
              ) : null)}
            {deckId === "hand" && (
              <>
                <img
                  src={mainIcon}
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
                  ? "repeat(auto-fill, minmax(100px, 1fr))"
                  : "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 5,
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
                    alert(card.file.name);
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
                <FileImage
                  file={card.file}
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
                      fontSize: 58,
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
            style={{
              border: "1px solid",
              backgroundColor: "rgb(38, 71, 84)",
            }}
          >
            {header}
            {renderedCards}
            {deckId === "main" && !mainVisible && cards.length ? (
              <img
                src={cardBack}
                width={150}
                style={{ display: "block" }}
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
            width: 200,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 15,
            color: "lime",
            fontSize: "x-large",
            fontWeight: "bolder",
            fontFamily: "fantasy",
          }}
        >
          End of Battle
        </div>
      </div>
      <input
        type="file"
        multiple
        accept="image/png"
        onChange={(event) => {
          const files = event.target?.files;
          if (files) addToHand(files);
        }}
        style={{ display: "block" }}
      />
    </div>
  );
};
