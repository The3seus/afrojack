/**
 * errorMiddleware.js
 * Catches and logs errors that occur during state updates.
 */

export function errorMiddleware({ getState }) {
    return (next) => (update) => {
      try {
        next(update);
      } catch (error) {
        console.error('AfroJack state update error:', error);
        // Optionally, you could set an error slice in the state:
        // next({ error: error.toString() });
      }
    };
  }
  