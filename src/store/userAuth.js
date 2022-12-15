import { createSlice } from '@reduxjs/toolkit';
import { jsonCopy } from '../helpers/FormatnParse';
import { deleteCookie } from '../helpers/customizeCookie';
import { deleteSession } from '../helpers/customizeSession';

export const userAuthSlice = createSlice({
	name: 'userAuth',
	initialState: {
		user: null,
		token: '',
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload ? jsonCopy(action.payload) : null;
		},
		setToken: (state, action) => {
			state.user = action.payload ? jsonCopy(action.payload) : '';
		},
		logOut: state => {
			state.user = null;
			state.token = '';
			deleteCookie('token');
			deleteSession('token');
		},
	},
});
export const { setUser, setToken, logOut } = userAuthSlice.actions;

// export const incrementAsync = amount => dispatch => {
// 	setTimeout(() => {
// 		dispatch(incrementByAmount(amount));
// 	}, 1000);
// };

export const selectUser = state => state.userAuth;

export default userAuthSlice.reducer;
