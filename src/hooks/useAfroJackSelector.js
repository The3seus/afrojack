import { useState, useEffect, useRef } from 'react';
import shallowEqual from 'shallowequal'; // or implement your own equality check

/**
 * useAfroJackSelector
 * A custom hook that subscribes to a slice of the store state
 * and triggers re-renders only when that slice changes.
 *
 * @param {function} storeRef - reference to your AfroJack store
 * @param {function} selector - function to pick part of the state
 */
export function useAfroJackSelector(storeRef, selector) {
  const store = storeRef.current; // assume storeRef is a useRef to the store
  const [selectedState, setSelectedState] = useState(() => selector(store.getState()));
  const lastSelectedState = useRef(selectedState);

  useEffect(() => {
    const unsubscribe = store.subscribe((currentState) => {
      const newSelected = selector(currentState);
      if (!shallowEqual(newSelected, lastSelectedState.current)) {
        lastSelectedState.current = newSelected;
        setSelectedState(newSelected);
      }
    });
    return unsubscribe;
  }, [store, selector]);

  return selectedState;
}
