import React, { PureComponent } from 'react'
import connectState from './connectState'

const actionTypes = {
  onChange: 'weather/onChange',
  onSubmit: 'weather/onSubmit',
  onError: 'weather/onError',
  onSuccess: 'weather/onSuccess',
}

const connectWeather = connectState({
  init() {
    return {
      text: '',
      fetching: false,
      error: undefined,
      result: undefined,
    }
  },
  reducer(state, action) {
    switch(action.type) {
      case actionTypes.onChange: {
        return {
          ...state,
          text: action.text,
        }
      }
      case actionTypes.onSubmit: {
        return {
          ...state,
          fetching: true,
          error: undefined,
          result: undefined,
        }
      }
      case actionTypes.onSuccess: {
        return {
          ...state,
          fetching: false,
          result: action.result,
        }
      }
      case actionTypes.onError: {
        return {
          ...state,
          fetching: false,
          error: action.error,
        }
      }
      default: {
        return state
      }
    }
  },
  actions: {
    onChange: (e) => ({type: actionTypes.onChange, text: e.target.value}),
    onSubmit: (query) => async (dispatch) => {
      try {
        dispatch({type: actionTypes.onSubmit})
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=d1038f86626c191d14fde59a7f548d6c&q=${query}`)
        const data = await response.json()
        dispatch({type: actionTypes.onSuccess, result: data.weather[0].description})
      } catch (e) {
        dispatch({type: actionTypes.onError, error: e.statusText})
      }
    },
  }
})

class Weather extends PureComponent {
  onSubmit = () => this.props.actions.onSubmit(this.props.state.text)
  render() {
    return (
      <div>
        <input value={this.props.state.text} onChange={this.props.actions.onChange}/>
        <button onClick={this.onSubmit}>submit</button>
        {this.props.state.fetching && <div>fetching...</div>}
        {this.props.state.error && <div>{this.props.state.error}</div>}
        {this.props.state.result && <div>{this.props.state.result}</div>}
      </div>
    )
  }
}

export default connectWeather(Weather)