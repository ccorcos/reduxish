import React from 'react'
import Counter from './Counter'
import DeltaCounter from './DeltaCounter'
import connectChildren from './connectChildren'

function DeltaCounters(props) {
  return (
    <div>
      <Counter
        dispatch={props.actions.delta}
        state={props.state.delta}
      />
      <DeltaCounter
        dispatch={props.actions.counter}
        state={props.state.counter}
        delta={props.state.delta.count}
      />
    </div>
  )
}

export default connectChildren({
  delta: Counter,
  counter: DeltaCounter,
})(DeltaCounters)