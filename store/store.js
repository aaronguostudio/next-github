import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  count: 0
}

const userInitialState = {
  username: 'aaron'
}

const ADD = 'ADD'

function counterReducer(state = initialState, action) {
  // console.log(state, action)
  switch (action.type) {
    case ADD:
      return { count: state.count + (action.num || 1) }
    default:
      return state
  }
}

const UPDATE_USERNAME = 'UPDATE_USERNAME'
function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.name
      }
    default:
      return state
  }
}

const allReducers = combineReducers({
  counter: counterReducer,
  user: userReducer
})

// action creatore
export function add(num) {
  return {
    type: ADD,
    num
  }
}

function addAsync(num) {
  return dispatch => {
    setTimeout(() => {
      dispatch(add(num))
    }, 1000)
  }
}


// store.dispatch(addAsync(50))
// store.dispatch({ type: UPDATE_USERNAME, name: 'Xianghui Guo' })

// store.subscribe(() => {
//   console.log('>changed', store.getState())
// })

// store.dispatch({ type: ADD })

export default function initializeStore (state) {
  const store = createStore(
    allReducers,
    Object.assign({},
      {
        counter: initialState,
        user: userInitialState
      }, state
    ),
    composeWithDevTools(applyMiddleware(thunk))
  )

  return store
}
