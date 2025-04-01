"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = createStore;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * createStore.js
 * The heart of AfroJack: a simple, pure JavaScript store
 * with subscribe, getState, setState (with optional partial updates),
 * and optional middleware support.
 */

function createStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var middlewares = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var state = initialState;
  var listeners = new Set();

  // Basic store API
  var getState = function getState() {
    return state;
  };
  var coreSetState = function coreSetState(update) {
    // If update is a function, pass current state to produce new partial state
    var nextState = typeof update === 'function' ? update(state) : update;
    // Merge new data into existing state
    state = _objectSpread(_objectSpread({}, state), nextState);
    // Notify all subscribers
    listeners.forEach(function (listener) {
      return listener(state);
    });
  };

  // If middlewares exist, wrap the "coreSetState" with each middleware
  var setState = middlewares.slice() // copy array
  .reverse() // reverse so they apply in correct order
  .reduce(function (next, mw) {
    return mw({
      getState: getState,
      setState: next
    });
  }, coreSetState);
  var subscribe = function subscribe(callback) {
    listeners.add(callback);
    return function () {
      listeners["delete"](callback);
    };
  };

  // Return the store object
  return {
    getState: getState,
    setState: setState,
    subscribe: subscribe
  };
}