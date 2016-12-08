import connectState from './connectState'
import { wrapAction, unwrapAction, mapObj } from './utils'

export default function connectChildren(children) {
  return connectState({
    init() {
      return mapObj(
        ({key, value}) => ({key: key, value: value.init()}),
        children
      )
    },
    reducer(state, action) {
      return mapObj(
        ({key, value}) => (
          key === action.type
          ? {key, value: children[key].reducer(value, unwrapAction(action))}
          : {key, value}
        ),
        state
      )
    },
    actions: mapObj(
      ({key, value}) => ({key, value: (action) => (dispatch) => dispatch(wrapAction(key, action))}),
      children
    )
  })
}