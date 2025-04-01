# 🧠 AfroJack

**AfroJack** is a fast, simple, and powerful React state management library written from scratch. No Redux, no external dependencies — just clean, minimal code built for modern React apps.

Created with ❤️ by [Sam Paniagua](https://theeseus.dev) — reach me at [theeseus@protonmail.com](mailto:theeseus@protonmail.com)

---

## ✨ Features

- 🧩 **Global Store** — with `getState`, `setState`, and `subscribe`.
- ⚡ **Zero Redux** — no affiliation, no boilerplate, no magic.
- 🔧 **Middleware Support** — easily add logging, error handling, analytics, etc.
- 🧠 **Smart Selectors** — prevent re-renders using shallow equality.
- 🔁 **Optional Actions** — action-based state updates for bigger apps.
- 🔬 **DevTools Friendly** — optional integration with Redux DevTools for debugging.
- 🧬 **AI-Ready** — extendable agent architecture for AI state and async task management.

---

## 📦 Installation

```bash
npm install afrojack
```

---

## 🚀 Getting Started

### 1. Create Your Store

```js
// store.js
import { createStore, applyMiddleware, loggerMiddleware, errorMiddleware } from 'afrojack';

const middlewares = applyMiddleware(loggerMiddleware, errorMiddleware);

export const store = createStore(
  {
    user: null,
    theme: 'dark',
  },
  middlewares
);
```

---

### 2. Use in a React Component

```jsx
// App.jsx
import React, { useRef } from 'react';
import { store } from './store';
import { useAfroJackSelector, useAfroJackDispatch } from 'afrojack';

export function App() {
  const storeRef = useRef(store);
  const theme = useAfroJackSelector(storeRef, (state) => state.theme);
  const dispatch = useAfroJackDispatch(storeRef);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <div style={{ background: theme === 'dark' ? '#111' : '#fff', color: theme === 'dark' ? '#fff' : '#111' }}>
      <h1>AfroJack Demo</h1>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

---

## 🔧 Middleware

### Logger Middleware

```js
export const loggerMiddleware = ({ getState }) => next => update => {
  console.group('AfroJack Update');
  console.log('Prev State:', getState());
  console.log('Update:', update);
  next(update);
  console.log('Next State:', getState());
  console.groupEnd();
};
```

### Error Handling Middleware

```js
export const errorMiddleware = () => next => update => {
  try {
    next(update);
  } catch (err) {
    console.error('AfroJack state error:', err);
  }
};
```

---

## 🧪 Selector Example

```js
const user = useAfroJackSelector(storeRef, state => state.user);
```

Only triggers re-render when `user` slice of state changes (uses shallow comparison by default).

---

## 📤 Optional Action-Based Dispatch

```js
const dispatch = useAfroJackDispatch(storeRef);

dispatch({ type: 'SET_USER', payload: { name: 'Alice' } });
dispatch({ type: 'TOGGLE_THEME' });
```

Your app stays clean and logic remains reusable.

---

## 🤖 Built-In AI Agent Integration (Optional)

Use `AGENT_TRIGGER` and `REGISTER_AGENT` actions to dynamically manage state and async operations like calling AI APIs, workers, or bots.

---

## 🧠 Philosophy

AfroJack is **not Redux**, and that's the point.

- No context wrapping required.
- No reducers, thunks, or saga trees.
- Just your state, your way — enhanced with smart tools when *you* want them.

---

## 🔌 DevTools Integration (Optional)

You can optionally hook into Redux DevTools:

```js
const devtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const devtoolsMiddleware = (devtools) => ({ getState }) => next => (update) => {
  next(update);
  devtools.send('state_update', getState());
};

export const store = createStore(initialState, [
  loggerMiddleware,
  errorMiddleware,
  devtoolsMiddleware(devtools)
].filter(Boolean));
```

---

## 🛠 API Summary

### `createStore(initialState, middlewares?)`

Creates a store with the initial state and optional middlewares.

### `setState(update)`
Updates the store. `update` can be an object or a function.

### `getState()`
Returns the current state.

### `subscribe(callback)`
Listens for state changes.

---

## 🪪 License

MIT © [Sam Paniagua](https://theeseus.dev)

---

## 🙌 Contributing

Pull requests and suggestions welcome! Open an issue or shoot me an email at [theeseus@protonmail.com](mailto:theeseus@protonmail.com).

---

> AfroJack — Modern State. Made Simple.
```

---
