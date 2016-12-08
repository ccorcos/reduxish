import React from 'react'
import connectChildren from './connectChildren'
import Counter from './Counter'

function FourCounters(props) {
  return (
    <div>
      <Counter dispatch={props.actions.one} state={props.state.one}/>
      <Counter dispatch={props.actions.two} state={props.state.two}/>
      <Counter dispatch={props.actions.three} state={props.state.three}/>
      <Counter dispatch={props.actions.four} state={props.state.four}/>
    </div>
  )
}

export default connectChildren({
  one: Counter,
  two: Counter,
  three: Counter,
  four: Counter,
})(FourCounters)