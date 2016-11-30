
export function wrapAction(key, action) {
  if (typeof action === 'function') {
    return (dispatch) => action((_action) => dispatch(wrapAction(key, _action)))
  } else {
    return {
      type: key,
      payload: action,
    }
  }
}

export function unwrapAction(action) {
  return action.payload
}
