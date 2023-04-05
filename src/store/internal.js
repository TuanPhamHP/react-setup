import { createSlice } from '@reduxjs/toolkit';
import { jsonCopy } from '../helpers/FormatnParse';

export const internalSlice = createSlice({
	name: 'internal',
	initialState: {
		listAlStyles: [],
		listAlSystems: [],
		token: '',
		userId: 117562048883023, // hardcode
		filterRoomByRead: 0, // 0 all, 1 unread
		listRoom: [],
		roomMsg: [],
		roomSetupPhase: 0, // 0: fetching, 1: succes, 2:failed
	},
	reducers: {
		pushMsg: (state, action) => {
			state.roomMsg.push(action.payload);
		},
		setCurrentRoomMsg: (state, action) => {
			state.roomMsg = action.payload;
		},
		setRoomSetupPhase: (state, action) => {
			state.roomSetupPhase = action.payload;
		},
		setListRoom: (state, action) => {
			state.listRoom = action.payload;
		},
		updateRoom: (state, action) => {
			const idx = state.listRoom.findIndex(o => o.conversationId === action.payload.id);
			if (idx === -1) {
				state.listRoom.push(action.payload);
			} else {
				state.listRoom.splice(idx, 1, action.payload);
			}
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
export const {
	setCurrentRoomMsg,
	pushMsg,
	setListRoom,
	updateRoom,
	setRoomReadAt,
	setFilterRoomByRead,
	setRoomSetupPhase,
} = internalSlice.actions;

export const selectInternal = state => state.internal;

export default internalSlice.reducer;
