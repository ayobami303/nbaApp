import { combineReducers } from 'redux'
import login from './login'
import app from './app'

const rootReducer = combineReducers({
	login,
	app
})

export default rootReducer;