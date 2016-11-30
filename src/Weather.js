import React, { PureComponent } from 'react'

class Weather extends PureComponent {

  static init() {
    return {
      text: '',
      fetching: false,
      error: undefined,
      result: undefined,
    }
  }

  static actionTypes = {
    onChange: 'weather/onChange',
    onSubmit: 'weather/onSubmit',
    onError: 'weather/onError',
    onSuccess: 'weather/onSuccess',
  }

  static actions = {
    onChange: (e) => ({type: Weather.actionTypes.onChange, text: e.target.value}),
    onSubmit: (query) => async (dispatch) => {
      try {
        dispatch({type: Weather.actionTypes.onSubmit})
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=d1038f86626c191d14fde59a7f548d6c&q=${query}`)
        const data = await response.json()
        dispatch(Weather.actions.onSuccess(data.weather[0].description))
      } catch (e) {
        dispatch(Weather.actions.onError(e.statusText))
      }
    },
    onSuccess: (result) => ({type: Weather.actionTypes.onSuccess, result}),
    onError: (error) => ({type: Weather.actionTypes.onError, error}),
  }

  static reducer = (state, action) => {
    switch(action.type) {
      case Weather.actionTypes.onChange: {
        return {
          ...state,
          text: action.text,
        }
      }
      case Weather.actionTypes.onSubmit: {
        return {
          ...state,
          fetching: true,
          error: undefined,
          result: undefined,
        }
      }
      case Weather.actionTypes.onSuccess: {
        return {
          ...state,
          fetching: false,
          result: action.result,
        }
      }
      case Weather.actionTypes.onError: {
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
  }

  onChange = (e) => this.props.dispatch(Weather.actions.onChange(e))
  onSubmit = () => this.props.dispatch(Weather.actions.onSubmit(this.props.state.text))

  render() {
    return (
      <div>
        <input value={this.props.state.text} onChange={this.onChange}/>
        <button onClick={this.onSubmit}>submit</button>
        {this.props.state.fetching && <div>fetching...</div>}
        {this.props.state.error && <div>{this.props.state.error}</div>}
        {this.props.state.result && <div>{this.props.state.result}</div>}
      </div>
    )
  }
}

export default Weather