import React, { PureComponent } from 'react'
import connectState from './connectState'

class DeltaCounter extends PureComponent {
  onInc = () => this.props.actions.onInc(this.props.delta || 1)
  onDec = () => this.props.actions.onDec(this.props.delta || 1)
  render() {
    return (
      <div>
        <button onClick={this.onDec}>dec</button>
        <span>{this.props.state.count}</span>
        <button onClick={this.onInc}>inc</button>
      </div>
    )
  }
}

const actionTypes = {
  inc: 'delta-counter/inc',
  dec: 'delta-counter/dec'
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
          count: state.count + action.delta,
        }
      }
      case actionTypes.dec: {
        return {
          count: state.count - action.delta,
        }
      }
      default: {
        return state
      }
    }
  },
  actions: {
    onInc: (delta) => ({type: actionTypes.inc, delta}),
    onDec: (delta) => ({type: actionTypes.dec, delta}),
  },
})(DeltaCounter)

