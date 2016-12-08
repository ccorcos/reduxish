import App from './App';
import start from './start'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import 'babel-polyfill'
import 'whatwg-fetch'

const composeDevTool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  (state=App.init(), action) => App.reducer(state, action),
  composeDevTool(applyMiddleware(thunkMiddleware))
)

start(App, {}, store, document.getElementById('root'))