import { useEffect, useCallback } from "react";
import { useImmer } from "use-immer";
import { produce } from "immer";
import { get, set } from "idb-keyval";

export function useStateWithIdbAndImmer<T>(dbKey: string, initState: T) {
  const [state, _setState] = useImmer<T>(initState);
  const restoreData = useCallback(async () => {
    const res = await get(dbKey);
    if (res) _setState(res);
  }, [dbKey]);
  useEffect(() => {
    void restoreData();
  }, [restoreData]);
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
        void set(dbKey, nextState);
        return nextState;
      });
    },
    [dbKey, _setState],
  );
  return [state, setState] as const;
}
