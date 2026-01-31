import { useEffect, useCallback, useRef, useState } from "react";
import { produce } from "immer";
import { PORT } from "shared";

const WS_URL = import.meta.env.DEV ? `ws://localhost:${PORT}` : `ws://${window.location.host}`;

export function useStateWithWsAndImmer<T>() {
  const [state, _setState] = useState<T | undefined>(undefined);
  // const wsRef = useRef<WebSocket>(new WebSocket(WS_URL)); // do not write like this, component may unwantlly rerender.
  const wsRef = useRef<WebSocket>(null);

  useEffect(() => {
    if (wsRef.current) return;
    wsRef.current = new WebSocket(WS_URL);
    wsRef.current.onmessage = (event) => {
      const { type, value } = JSON.parse(event.data) as {
        type: string;
        value: T;
      };
      if (type === "sync") {
        _setState(value);
      }
    };
    return () => {
      if (!wsRef.current) return;
      if (
        wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING
      ) {
        wsRef.current.close();
      }
    };
  }, []);

  const setState = useCallback(
    (updater: ((draft: T) => void) | T | ((oldState: T) => T)) => {
      _setState((currentDraft) => {
        let nextState: T;
        if (typeof updater === "function") {
          // @ts-ignore
          nextState = produce(currentDraft, updater);
        } else {
          nextState = updater;
        }
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(
            JSON.stringify({ type: "update", value: nextState }),
          );
        }
        return nextState;
      });
    },
    [_setState],
  );

  return [state, setState] as const;
}
