import React, { PureComponent } from 'react'
import Counter from './Counter'
import { wrapAction, unwrapAction } from './utils'

class TwoCounters extends PureComponent {

  static init() {
    return {
      counterOne: Counter.init(),
      counterTwo: Counter.init(),
    }
  }

  static actionTypes = {
    counterOne: 'two-counters/one',
    counterTwo: 'two-counters/two',
  }

  static reducer(state, action) {
    switch(action.type) {
      case TwoCounters.actionTypes.counterOne: {
        return {
          ...state,
          counterOne: Counter.reducer(state.counterOne, unwrapAction(action))
        }
      }
      case TwoCounters.actionTypes.counterTwo: {
        return {
          ...state,
          counterTwo: Counter.reducer(state.counterTwo, unwrapAction(action))
        }
      }
      default: {
        return state
      }
    }
  }

  dispatch = {
    counterOne: (action) => this.props.dispatch(wrapAction(TwoCounters.actionTypes.counterOne, action)),
    counterTwo: (action) => this.props.dispatch(wrapAction(TwoCounters.actionTypes.counterTwo, action)),
  }

  render() {
    return (
      <div>
        <Counter dispatch={this.dispatch.counterOne} state={this.props.state.counterOne}/>
        <Counter dispatch={this.dispatch.counterTwo} state={this.props.state.counterTwo}/>
      </div>
    )
  }
}

export default TwoCounters