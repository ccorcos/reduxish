import React from 'react'
import Counter from './Counter'
import connectChildren from './connectChildren'
import connectState from './connectState'
import { compose } from './utils'

function HideableCounter(props) {
  return (
    <div>
      <input
        type="checkbox"
        checked={props.state.checked}
        onChange={props.actions.onToggle}
      />
      {props.state.checked && (
        <Counter
          dispatch={props.actions.counter}
          state={props.state.counter}
        />
      )}
    </div>
  )
}

const connectToggle = connectState({
  init() {
    return {
      checked: true,
    }
  },
  reducer(state, action) {
    if (action.type === 'toggle') {
      return {
        ...state,
        checked: !state.checked
      }
    }
    return state
  },
  actions: {
    onToggle: () => ({type: 'toggle'}),
  },
})

const connectCounter = connectChildren({
  counter: Counter,
})

export default compose(connectToggle, connectCounter)(HideableCounter)