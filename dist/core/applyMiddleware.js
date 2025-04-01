"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyMiddleware = applyMiddleware;
/**
 * applyMiddleware.js
 * Composes multiple middleware into an array for easier consumption
 * in createStore.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }
  // Just return them as an array for now.
  return middlewares;
}