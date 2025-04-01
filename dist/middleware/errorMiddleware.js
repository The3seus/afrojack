"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorMiddleware = errorMiddleware;
/**
 * errorMiddleware.js
 * Catches and logs errors that occur during state updates.
 */

function errorMiddleware(_ref) {
  var getState = _ref.getState;
  return function (next) {
    return function (update) {
      try {
        next(update);
      } catch (error) {
        console.error('AfroJack state update error:', error);
        // Optionally, you could set an error slice in the state:
        // next({ error: error.toString() });
      }
    };
  };
}