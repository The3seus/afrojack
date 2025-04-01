/**
 * loggerMiddleware.js
 * Logs old state, update, and new state for debugging.
 */

export function loggerMiddleware({ getState }) {
    return (next) => (update) => {
      const prevState = getState();
      console.group('AfroJack Update');
      console.log('Prev State:', prevState);
      console.log('Update:', update);
  
      next(update);
  
      const nextState = getState();
      console.log('Next State:', nextState);
      console.groupEnd();
    };
  }
  