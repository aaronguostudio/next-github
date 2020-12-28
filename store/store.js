import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { LOGOUT } from './action-types'
import axios from 'axios'

const userInitialState = {}

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case LOGOUT:
      return {}
    default:
      return state
  }
}

const allReducers = combineReducers({
  user: userReducer
})

// action creators start
export function logout () {
  return (dispatch) => {
    axios.post('/logout')
      .then(res => {
        if (res.status === 200) dispatch({ type: LOGOUT })
        else console.log('logout failed', res)
      }).catch(err => {
        console.log('err', err)
      })
  }
}
// action creators end

// Make sure every request will create a new store
export default function initializeStore (state) {
  const store = createStore(
    allReducers,
    Object.assign({}, { user: userInitialState }, state),
    composeWithDevTools(applyMiddleware(thunk))
  )

  return store
}
