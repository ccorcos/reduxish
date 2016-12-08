import React, { PureComponent } from 'react'

const actionTypes = {
  insert: 'list-of/insert',
  remove: 'list-of/remove',
  child: 'list-of/child',
}

export default function listOf(Something) {
  return class ListOf extends PureComponent {

    static init() {
      return {
        id: 1,
        items: [{id: 0, state: Something.init()}],
      }
    }

    static reducer(state, action) {
      switch(action.type) {
        case actionTypes.insert: {
          return {
            ...state,
            id: state.id + 1,
            items: state.items.concat([{
              id: state.id,
              state: Something.init()
            }])
          }
        }
        case actionTypes.remove: {
          return {
            ...state,
            items: state.items.filter(item => item.id !== action.id)
          }
        }
        case actionTypes.child: {
          return {
            ...state,
            items: state.items.map(item => {
              if (item.id === action.id) {
                return {
                  ...item,
                  state: Something.reducer(item.state, action.payload)
                }
              }
              return item
            })
          }
        }
        default: {
          return state
        }
      }
    }

    constructor(props) {
      super(props)
      this.removeActions = {}
      this.childActions = {}
    }

    cleanupChildActions() {
      Object.keys(this.removeActions).forEach((id) => {
        if (!this.props.state.items.find((item) => `${item.id}` === id)) {
          delete this.removeActions[id]
        }
      })
      Object.keys(this.childActions).forEach((id) => {
        if (!this.props.state.items.find((item) => `${item.id}` === id)) {
          delete this.childActions[id]
        }
      })
    }

    makeChildActions() {
      this.props.state.items.forEach(({id}) => {
        if (!this.removeActions[id]) {
          this.removeActions[id] = () => this.props.dispatch({type: actionTypes.remove, id})
        }
        if (!this.childActions[id]) {
          this.childActions[id] = (action) => this.props.dispatch({type: actionTypes.child, id, payload: action})
        }
      })
    }

    onInsert = () => this.props.dispatch({type: actionTypes.insert})

    render() {
      this.makeChildActions()
      this.cleanupChildActions()
      return (
        <div>
          <button onClick={this.onInsert}>insert</button>
          {this.props.state.items.map((item) => (
            <div key={item.id}>
              <Something dispatch={this.childActions[item.id]} state={item.state}/>
              <button onClick={this.removeActions[item.id]}>remove</button>
            </div>
          ))}
        </div>
      )
    }
  }
}