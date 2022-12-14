import { createSlice } from '@reduxjs/toolkit';

export const dragLocalSlice = createSlice({
	name: 'dragLocal',
	initialState: {
		itemSidebarOndrag: false,
		droppedItem: null,
	},
	reducers: {
		setItemSidebarDrag: (state, action) => {
			state.itemSidebarOndrag = action.payload;
		},
		setDroppedItem: (state, action) => {
			state.droppedItem = action.payload;
		},
	},
});

export const { setItemSidebarDrag, setDroppedItem } = dragLocalSlice.actions;

export const selectDragLocal = state => state.dragLocal;

export default dragLocalSlice.reducer;
