import { combineReducers } from 'redux'
import login from './login'
import app from './app'
import info from './info'
import schedule from './schedule'
import feedback from './feedback'
import registration from './registration'
import branch from './branch'
import amount from './amount'
import validate from './validate'

const rootReducer = combineReducers({
	login,
	app,
	info,
	schedule,
	feedback,
	registration,
	branch,
	amount,
	validate
})

export default rootReducer;