import App from './App';
import start from './start'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import 'babel-polyfill'
import 'whatwg-fetch'

const store = createStore(
  (state=App.init(), action) => App.reducer(state, action),
  applyMiddleware(thunkMiddleware)
)

start(App, {}, store, document.getElementById('root'))