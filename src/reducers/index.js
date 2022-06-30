import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import user from './user'


export const reducers = combineReducers({
  user,


  router: routerReducer,
})
