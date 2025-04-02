"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAfroJackSelector = useAfroJackSelector;
var _react = require("react");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * shallowEqual
 * A tiny utility to compare two objects shallowly.
 * Returns true if all keys and their values are strictly equal.
 * Avoids unnecessary re-renders by checking if selected state has changed.
 */
function shallowEqual(objA, objB) {
  if (Object.is(objA, objB)) return true;
  if (_typeof(objA) !== 'object' || objA === null || _typeof(objB) !== 'object' || objB === null) {
    return false;
  }
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (var _i = 0, _keysA = keysA; _i < _keysA.length; _i++) {
    var key = _keysA[_i];
    if (!Object.prototype.hasOwnProperty.call(objB, key) || !Object.is(objA[key], objB[key])) {
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
function useAfroJackSelector(storeRef, selector) {
  var store = storeRef.current; // Assume storeRef is a useRef to the store
  var _useState = (0, _react.useState)(function () {
      return selector(store.getState());
    }),
    _useState2 = _slicedToArray(_useState, 2),
    selectedState = _useState2[0],
    setSelectedState = _useState2[1];
  var lastSelectedState = (0, _react.useRef)(selectedState);
  (0, _react.useEffect)(function () {
    // Subscribe to store changes
    var unsubscribe = store.subscribe(function (currentState) {
      var newSelected = selector(currentState);
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