import { createSlice } from '@reduxjs/toolkit';
import { jsonCopy } from '../helpers/FormatnParse';

export const internalSlice = createSlice({
	name: 'internal',
	initialState: {
		listAlStyles: [],
		listAlSystems: [],
		token: '',
	},
	reducers: {
		setListAlStyles: (state, action) => {
			state.listAlStyles = action.payload ? jsonCopy(action.payload) : [];
		},
		setListAlSystems: (state, action) => {
			state.listAlSystems = action.payload ? jsonCopy(action.payload) : [];
		},
	},
});
export const { setListAlStyles, setListAlSystems } = internalSlice.actions;

export const selectInternal = state => state.internal;

export default internalSlice.reducer;
