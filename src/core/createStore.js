/**
 * createStore.js
 * The heart of AfroJack: a simple, pure JavaScript store
 * with subscribe, getState, setState (with optional partial updates),
 * and optional middleware support.
 */

export function createStore(initialState = {}, middlewares = []) {
    let state = initialState;
    const listeners = new Set();
  
    // Basic store API
    const getState = () => state;
  
    const coreSetState = (update) => {
      // If update is a function, pass current state to produce new partial state
      const nextState = typeof update === 'function' ? update(state) : update;
      // Merge new data into existing state
      state = { ...state, ...nextState };
      // Notify all subscribers
      listeners.forEach(listener => listener(state));
    };
  
    // If middlewares exist, wrap the "coreSetState" with each middleware
    const setState = middlewares
      .slice() // copy array
      .reverse() // reverse so they apply in correct order
      .reduce((next, mw) => mw({ getState, setState: next }), coreSetState);
  
    const subscribe = (callback) => {
      listeners.add(callback);
      return () => {
        listeners.delete(callback);
      };
    };
  
    // Return the store object
    return {
      getState,
      setState,
      subscribe,
    };
  }
  