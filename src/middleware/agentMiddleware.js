/**
 * agentMiddleware.js
 * Enables dynamic registration and triggering of AI agents or async tasks.
 */

const agents = new Map();

export function agentMiddleware({ getState, setState }) {
  return (next) => async (action) => {
    switch (action.type) {
      case 'REGISTER_AGENT': {
        const { name, handler } = action.payload;
        if (typeof handler === 'function') {
          agents.set(name, handler);
        } else {
          console.warn(`[AfroJack] Agent "${name}" must be a function.`);
        }
        break;
      }

      case 'AGENT_TRIGGER': {
        const { name, args = [] } = action.payload;
        const agent = agents.get(name);
        if (agent) {
          try {
            const result = await agent({ getState, setState }, ...args);
            if (action.payload.onSuccess) {
              setState(action.payload.onSuccess(result));
            }
          } catch (err) {
            console.error(`[AfroJack] Agent "${name}" failed:`, err);
            if (action.payload.onError) {
              setState(action.payload.onError(err));
            }
          }
        } else {
          console.warn(`[AfroJack] Agent "${name}" not found.`);
        }
        break;
      }

      default:
        next(action);
    }
  };
}
