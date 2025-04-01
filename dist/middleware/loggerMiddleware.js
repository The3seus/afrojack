"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loggerMiddleware = loggerMiddleware;
/**
 * loggerMiddleware.js
 * Logs old state, update, and new state for debugging.
 */

function loggerMiddleware(_ref) {
  var getState = _ref.getState;
  return function (next) {
    return function (update) {
      var prevState = getState();
      console.group('AfroJack Update');
      console.log('Prev State:', prevState);
      console.log('Update:', update);
      next(update);
      var nextState = getState();
      console.log('Next State:', nextState);
      console.groupEnd();
    };
  };
}