import React from 'react'
import connectState from './connectState'

function Counter(props) {
  return (
    <div>
      <button onClick={props.actions.onDec}>dec</button>
      <span>{props.state.count}</span>
      <button onClick={props.actions.onInc}>inc</button>
    </div>
  )
}

const actionTypes = {
  inc: 'counter/inc',
  dec: 'counter/dec'
}

export default connectState({
  init() {
    return {
      count: 0,
    }
  },
  reducer(state, action) {
    switch(action.type) {
      case actionTypes.inc: {
        return {
          count: state.count + 1,
        }
      }
      case actionTypes.dec: {
        return {
          count: state.count - 1,
        }
      }
      default: {
        return state
      }
    }
  },
  actions: {
    onInc: () => ({type: actionTypes.inc}),
    onDec: () => ({type: actionTypes.dec}),
  },
})(Counter)
