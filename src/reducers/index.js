import { combineReducers } from 'redux'
import login from './login'
import app from './app'
import info from './info'
import schedule from './schedule'

const rootReducer = combineReducers({
	login,
	app,
	info,
	schedule
})

export default rootReducer;