import React from 'react'
import connectState from './connectState'
import Counter from './Counter'
import { wrapAction, unwrapAction } from './utils'

function TwoCounters(props) {
  return (
    <div>
      <Counter dispatch={props.actions.dispatchOne} state={props.state.counterOne}/>
      <Counter dispatch={props.actions.dispatchTwo} state={props.state.counterTwo}/>
    </div>
  )
}

const actionTypes = {
  counterOne: 'two-counters/one',
  counterTwo: 'two-counters/two',
}

export default connectState({
  init() {
    return {
      counterOne: Counter.init(),
      counterTwo: Counter.init(),
    }
  },
  reducer(state, action) {
    switch(action.type) {
      case actionTypes.counterOne: {
        return {
          ...state,
          counterOne: Counter.reducer(state.counterOne, unwrapAction(action))
        }
      }
      case actionTypes.counterTwo: {
        return {
          ...state,
          counterTwo: Counter.reducer(state.counterTwo, unwrapAction(action))
        }
      }
      default: {
        return state
      }
    }
  },
  actions: {
    dispatchOne: (action) => (dispatch) => dispatch(wrapAction(actionTypes.counterOne, action)),
    dispatchTwo: (action) => (dispatch) => dispatch(wrapAction(actionTypes.counterTwo, action)),
  }
})(TwoCounters)
