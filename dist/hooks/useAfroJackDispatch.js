"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAfroJackDispatch = useAfroJackDispatch;
/**
 * useAfroJackDispatch.js
 * A custom hook that returns a dispatcher function for your store.
 */

function useAfroJackDispatch(storeRef) {
  var store = storeRef.current;

  // Example approach: pass an action object with a "type" property
  return function (action) {
    switch (action.type) {
      case 'SET_USER':
        store.setState({
          user: action.payload
        });
        break;
      case 'TOGGLE_THEME':
        store.setState(function (state) {
          return {
            theme: state.theme === 'dark' ? 'light' : 'dark'
          };
        });
        break;
      default:
        console.warn('Unrecognized action type:', action.type);
    }
  };
}