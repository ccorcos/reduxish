import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux'

export default function start(App, props, store, node) {

  const Connector = connect(
    (state) => ({state}),
    (dispatch) => ({dispatch})
  )(
    (props) => <App {...props} dispatch={props.dispatch} state={props.state}/>
  )

  ReactDOM.render(
    <Provider store={store}>
      <Connector/>
    </Provider>,
    node
  )

}
