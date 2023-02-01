import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import dragLocalReducer from './dragLocal';
import userAuthReducer from './userAuth';
import internalReducer from './internal';
export default configureStore({
	reducer: {
		counter: counterReducer,
		dragLocal: dragLocalReducer,
		userAuth: userAuthReducer,
		internal: internalReducer,
	},
});
