import React from 'react'
import connectChildren from './connectChildren'
import Counter from './Counter'

export default function twoOf(Something) {
  function TwoOf(props) {
    return (
      <div>
        <Something dispatch={props.actions.one} state={props.state.one}/>
        <Something dispatch={props.actions.two} state={props.state.two}/>
      </div>
    )
  }
  return connectChildren({
    one: Something,
    two: Something,
  })(TwoOf)
}
