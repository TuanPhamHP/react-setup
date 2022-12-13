import { createSlice } from '@reduxjs/toolkit';

export const dragLocalSlice = createSlice({
	name: 'dragLocal',
	initialState: {
		itemSidebarOndrag: false,
	},
	reducers: {
		setItemSidebarDrag: (state, action) => {
			state.itemSidebarOndrag = action.payload;
		},
	},
});

export const { setItemSidebarDrag } = dragLocalSlice.actions;

export const selectDragLocal = state => state.dragLocal.itemSidebarOndrag;

export default dragLocalSlice.reducer;
