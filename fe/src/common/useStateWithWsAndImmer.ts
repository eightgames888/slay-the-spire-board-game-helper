import { useEffect, useCallback, useRef, useState } from "react";
import { produce } from "immer";

import { PORT } from "shared";

const WS_URL = `ws://localhost:${PORT}`;

export function useStateWithWsAndImmer<T>() {
  const [state, _setState] = useState<T | undefined>(undefined);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const websocket = new WebSocket(WS_URL);

    websocket.onopen = () => {
      console.log("WebSocket connected");
    };

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data) as { type: string; value: T };
      if (message.type === "sync") {
        _setState(message.value);
      }
    };

    websocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    wsRef.current = websocket;

    return () => {
      websocket.close();
    };
  }, []);

  const setState = useCallback(
    (updater: ((draft: T) => void) | T | ((oldState: T) => T)) => {
      let nextState: T;
      if (typeof updater === "function") {
        if (state === undefined) return;
        if (updater.length === 0) {
          nextState = produce(state, updater as (draft: T) => void);
        } else {
          nextState = (updater as (oldState: T) => T)(state);
        }
      } else {
        nextState = updater;
      }
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: "update", value: nextState }));
      }
    },
    [state],
  );

  return [state, setState] as const;
}
