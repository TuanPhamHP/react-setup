import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import dragLocalReducer from './dragLocal';
import userAuthReducer from './userAuth';
export default configureStore({
	reducer: {
		counter: counterReducer,
		dragLocal: dragLocalReducer,
		userAuth: userAuthReducer,
	},
});
