import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import user from './user'
import general from './general'


export const reducers = combineReducers({
  user,
  general,


  router: routerReducer,
})
