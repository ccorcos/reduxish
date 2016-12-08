
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

export function mapObj(fn, obj) {
  const result = {}
  Object.keys(obj).forEach((k) => {
    const {key, value} = fn({key: k, value: obj[k]})
    result[key] = value
  })
  return result
}

export function compose(a, b) {
  return function (c) {
    return a(b(c))
  }
}
