/**
 * useAfroJackDispatch.js
 * A custom hook that returns a dispatcher function for your store.
 */

export function useAfroJackDispatch(storeRef) {
    const store = storeRef.current;
  
    // Example approach: pass an action object with a "type" property
    return (action) => {
      switch (action.type) {
        case 'SET_USER':
          store.setState({ user: action.payload });
          break;
        case 'TOGGLE_THEME':
          store.setState((state) => ({
            theme: state.theme === 'dark' ? 'light' : 'dark',
          }));
          break;
        default:
          console.warn('Unrecognized action type:', action.type);
      }
    };
  }
  