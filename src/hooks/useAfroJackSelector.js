import { useState, useEffect, useRef } from 'react';

/**
 * shallowEqual
 * A tiny utility to compare two objects shallowly.
 * Returns true if all keys and their values are strictly equal.
 * Avoids unnecessary re-renders by checking if selected state has changed.
 */
function shallowEqual(objA, objB) {
  if (Object.is(objA, objB)) return true;

  if (
    typeof objA !== 'object' || objA === null ||
    typeof objB !== 'object' || objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key) ||
        !Object.is(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}

/**
 * useAfroJackSelector
 * A custom hook that subscribes to a slice of the store state
 * and triggers re-renders only when that slice changes.
 *
 * @param {object} storeRef - A React ref pointing to your AfroJack store instance
 * @param {function} selector - Function to select a slice of the state
 * @returns {*} The selected slice of state that updates reactively
 *
 * Example:
 * const theme = useAfroJackSelector(storeRef, state => state.theme);
 */
export function useAfroJackSelector(storeRef, selector) {
  const store = storeRef.current; // Assume storeRef is a useRef to the store
  const [selectedState, setSelectedState] = useState(() => selector(store.getState()));
  const lastSelectedState = useRef(selectedState);

  useEffect(() => {
    // Subscribe to store changes
    const unsubscribe = store.subscribe((currentState) => {
      const newSelected = selector(currentState);
      // Only update if selected slice has changed
      if (!shallowEqual(newSelected, lastSelectedState.current)) {
        lastSelectedState.current = newSelected;
        setSelectedState(newSelected);
      }
    });

    // Clean up subscription on unmount
    return unsubscribe;
  }, [store, selector]);

  return selectedState;
}
