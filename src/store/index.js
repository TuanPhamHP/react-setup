import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import userAuthReducer from './userAuth';
export default configureStore({
	reducer: {
		counter: counterReducer,
		userAuth: userAuthReducer,
	},
});
