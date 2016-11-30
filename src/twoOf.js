import React, { PureComponent } from 'react'
import { wrapAction, unwrapAction } from './utils'

function twoOf(Something) {

  return class TwoOf extends PureComponent {

    static init() {
      return {
        one: Something.init(),
        two: Something.init(),
      }
    }

    static actionTypes = {
      one: 'two-of/one',
      two: 'two-of/two',
    }

    static reducer(state, action) {
      switch(action.type) {
        case TwoOf.actionTypes.one: {
          return {
            ...state,
            one: Something.reducer(state.one, unwrapAction(action))
          }
        }
        case TwoOf.actionTypes.two: {
          return {
            ...state,
            two: Something.reducer(state.two, unwrapAction(action))
          }
        }
        default: {
          return state
        }
      }
    }

    dispatch = {
      one: (action) => this.props.dispatch(wrapAction(TwoOf.actionTypes.one, action)),
      two: (action) => this.props.dispatch(wrapAction(TwoOf.actionTypes.two, action)),
    }

    render() {
      return (
        <div>
          <Something dispatch={this.dispatch.one} state={this.props.state.one}/>
          <Something dispatch={this.dispatch.two} state={this.props.state.two}/>
        </div>
      )
    }
  }
}

export default twoOf