import type { Draft } from "immer";
import { useStateWithIdbAndImmer } from "../common/useStateWithIdbAndImmer";
import { uuid } from "../common/uuid";

const _deleteCard = (draft: Draft<typeof INIT_DECK>, deckId: IDeckId, index: number) => {
  draft[deckId] = draft[deckId].filter((_, i) => i !== index);
};

const _shuffleDeck = (draft: Draft<typeof INIT_DECK>, deckId: IDeckId) => {
  const newFiles = [...draft[deckId]];
  for (let i = newFiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newFiles[i], newFiles[j]] = [newFiles[j], newFiles[i]];
  }
  draft[deckId] = newFiles;
};

const _shuffleMainDeck = (draft: Draft<typeof INIT_DECK>) => {
  _shuffleDeck(draft, "main");
};

const _moveCard = (
  draft: Draft<typeof INIT_DECK>,
  fromDeck: IDeckId,
  fromIndex: number,
  toDeck: IDeckId,
) => {
  if (fromDeck === toDeck) return;
  const card = draft[fromDeck][fromIndex];
  _deleteCard(draft, fromDeck, fromIndex);
  draft[toDeck].push(card);
};

const _moveAllCards = (draft: Draft<typeof INIT_DECK>, fromDeck: IDeckId, toDeck: IDeckId) => {
  if (fromDeck === toDeck) return;
  draft[toDeck].push(...draft[fromDeck]);
  draft[fromDeck] = [];
};

const _resetToMain = (draft: Draft<typeof INIT_DECK>, fromDeck: IDeckId) => {
  _moveAllCards(draft, fromDeck, "main");
  _shuffleMainDeck(draft);
};

const _resetDiscardToMain = (draft: Draft<typeof INIT_DECK>) => {
  _resetToMain(draft, "discard");
};

const _drawToHand = (draft: Draft<typeof INIT_DECK>, fromDeck: IDeckId, fromIndex: number) => {
  _moveCard(draft, fromDeck, fromIndex, "hand");
};

const _drawOneCardWhenCould = (draft: Draft<typeof INIT_DECK>) => {
  if (!draft.main.length) {
    return;
  }
  _drawToHand(draft, "main", draft.main.length - 1);
};

const _drawOneCard = (draft: Draft<typeof INIT_DECK>) => {
  if (!draft.main.length) {
    _resetDiscardToMain(draft);
  }
  _drawOneCardWhenCould(draft);
};

const _drawXCards = (draft: Draft<typeof INIT_DECK>, x: number) => {
  for (let i = 0; i < x; i++) {
    _drawOneCard(draft);
  }
};

interface ICard {
  uuid: string;
  src: string;
}

const INIT_DECK = {
  relic: [] as ICard[],
  ability: [] as ICard[],
  hand: [] as ICard[],
  main: [] as ICard[],
  discard: [] as ICard[],
  exhaust: [] as ICard[],
} as const;

export type IDeckId = keyof typeof INIT_DECK;

export const useDecks = () => {
  const [decks, setDecks] = useStateWithIdbAndImmer("decks", INIT_DECK);
  const addCards = (deckId: IDeckId, fileNames: string[]) => {
    if (!fileNames?.length) return;
    const cards = fileNames.map((fileName) => ({
      uuid: uuid(),
      src: `/static/slay-the-spire-mod-unpack/${fileName}`,
    }));
    setDecks((draft) => {
      draft[deckId].push(...cards);
    });
  };

  return {
    decks,
    addToHand: (fileNames: string[]) => {
      addCards("hand", fileNames);
    },
    deleteCard: (deckId: IDeckId, index: number) => {
      setDecks((draft) => {
        _deleteCard(draft, deckId, index);
      });
    },
    moveCard: (fromDeck: IDeckId, fromIndex: number, toDeck: IDeckId) => {
      setDecks((draft) => {
        _moveCard(draft, fromDeck, fromIndex, toDeck);
      });
    },
    discardAll: () => {
      setDecks((draft) => {
        _moveAllCards(draft, "hand", "discard");
      });
    },
    resetAllToMain: () => {
      setDecks((draft) => {
        (["ability", "hand", "discard", "exhaust"] as const).forEach((deckId) => {
          _resetToMain(draft, deckId);
        });
      });
    },
    shuffleMainDeck: () => {
      setDecks((draft) => {
        _shuffleDeck(draft, "main");
      });
    },
    drawXCards: (x: number) => {
      setDecks((draft) => {
        _drawXCards(draft, x);
      });
    },
  };
};
