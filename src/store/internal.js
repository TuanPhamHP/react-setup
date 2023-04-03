import { createSlice } from '@reduxjs/toolkit';
import { jsonCopy } from '../helpers/FormatnParse';

export const internalSlice = createSlice({
	name: 'internal',
	initialState: {
		listAlStyles: [],
		listAlSystems: [],
		token: '',
		filterRoomByRead: 0, // 0 all, 1 unread
		listRoom: [],
		listMsg: [],
		roomSetupPhase: 0, // 0: fetching, 1: succes, 2:failed
	},
	reducers: {
		pushMsg: (state, action) => {
			state.listMsg.push(action.payload);
		},
		setRoomSetupPhase: (state, action) => {
			state.roomSetupPhase = action.payload;
		},
		setListRoom: (state, action) => {
			state.listRoom = action.payload;
		},
		setFilterRoomByRead: (state, action) => {
			state.filterRoomByRead = action.payload;
		},
		setRoomReadAt: (state, action) => {
			const idx = state.listRoom.findIndex(o => o.id === action.payload);

			if (idx !== -1) {
				state.listRoom[idx].read_at = true;
			}
		},
	},
});
export const { setListRoom, pushMsg, setRoomReadAt, setFilterRoomByRead, setRoomSetupPhase } = internalSlice.actions;

export const selectInternal = state => state.internal;

export default internalSlice.reducer;
