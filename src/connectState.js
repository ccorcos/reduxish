import React, { PureComponent } from 'react'
import { mapObj } from './utils'

export default function connectState({init, reducer, actions}) {
  return function(Component) {
    return class ConnectStateContainer extends PureComponent {
      static init() {
        const initState = init()
        if (Component.init) {
          return {
            ...initState,
            ...Component.init(),
          }
        }
        return initState
      }
      static reducer(state, action) {
        const nextState = reducer(state, action)
        if (Component.reducer) {
          return Component.reducer(nextState, action)
        }
        return nextState
      }
      static actions = actions
      static propTypes = {
        ...(Component.propTypes || {}),
        dispatch: React.PropTypes.func.isRequired,
        state: React.PropTypes.object.isRequired,
      }
      constructor(props) {
        super(props)
        const boundActions = mapObj(
          ({key, value}) => ({key, value: (...args) => this.props.dispatch(value(...args))}),
          actions
        )
        const otherActions = this.props.actions || {}
        this.boundActions = {...boundActions, ...otherActions}
      }
      render() {
        const { actions, state, ...otherProps } = this.props // eslint-disable-line
        return (
          <Component actions={this.boundActions} state={this.props.state} {...otherProps}/>
        )
      }
    }
  }
}