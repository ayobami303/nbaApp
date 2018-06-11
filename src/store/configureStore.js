import { compose,createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { createMigrate, persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { createLogger } from 'redux-logger'
import Reactotron from 'reactotron-react-native';
import storage from 'redux-persist/es/storage'

import rootReducer from '../reducers'

let middleware = [thunk];


const manifest = {
	1: (state) => ({ ...state }),

};

// const VERSION_REDUCER_KEY = 'migrations';

// const migration = createMigration(manifest, VERSION_REDUCER_KEY);

const persistConfig = {
  key: 'primary',
  version: 1,
  storage,
	blacklist: ['app'],
	migrate: createMigrate(manifest, { debug: false }),
}


if(__DEV__){
	const logger = createLogger ({collapsed: true});
	middleware = [...middleware, logger];
}else{
	middleware = [...middleware]
}

const finalReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore(initialState){
	let store = createStore(finalReducer, applyMiddleware(...middleware))
	// let persistor = persistStore(store).purge()
	return store
	// return { store, persistor }

	// return createStore(
	// 	rootReducer,
	// 	initialState,
	// 	applyMiddleware(...middleware)
	// )
}



// export default function configureStore(initialState) {
// 	const store = Reactotron.createStore(
// 		reducers,
// 		initialState,
// 		compose(
// 			applyMiddleware(...middleware),
// 			migration,
// 			autoRehydrate()
// 		)
// 	);
// 	// whitelist and blacklist or try using persist/REHYDRATE action:type to reset some values
// 	persistStore(store, { storage: AsyncStorage }); //.purge();
// 	// persistStore(store, { storage: AsyncStorage, blacklist: ['app', 'user'] }); //.purge();

// 	return store;
// }
