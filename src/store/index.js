import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import userAuthReducer from './userAuth';
import internalReducer from './internal';
export default configureStore({
	reducer: {
		counter: counterReducer,
		userAuth: userAuthReducer,
		internal: internalReducer,
	},
});
