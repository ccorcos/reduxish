import React, { PureComponent } from 'react'

class Counter extends PureComponent {

  static init() {
    return {
      count: 0,
    }
  }

  static actionTypes = {
    inc: 'counter/inc',
    dec: 'counter/dec'
  }

  static reducer(state, action) {
    switch(action.type) {
      case Counter.actionTypes.inc: {
        return {
          count: state.count + 1,
        }
      }
      case Counter.actionTypes.dec: {
        return {
          count: state.count - 1,
        }
      }
      default: {
        return state
      }
    }
  }

  static actions = {
    inc: () => ({type: Counter.actionTypes.inc}),
    dec: () => ({type: Counter.actionTypes.dec}),
  }

  onInc = () => this.props.dispatch(Counter.actions.inc())
  onDec = () => this.props.dispatch(Counter.actions.dec())

  render() {
    console.log('render Counter')
    return (
      <div>
        <button onClick={this.onDec}>dec</button>
        <span>{this.props.state.count}</span>
        <button onClick={this.onInc}>inc</button>
      </div>
    )
  }
}

export default Counter
