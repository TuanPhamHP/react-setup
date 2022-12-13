import { createSlice } from '@reduxjs/toolkit';
import { jsonCopy } from '../helpers/FormatnParse';

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
	},
});
export const { setUser } = userAuthSlice.actions;

// export const incrementAsync = amount => dispatch => {
// 	setTimeout(() => {
// 		dispatch(incrementByAmount(amount));
// 	}, 1000);
// };

export const selectUser = state => state.userAuth;

export default userAuthSlice.reducer;
