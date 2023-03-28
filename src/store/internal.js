import { createSlice } from '@reduxjs/toolkit';
import { jsonCopy } from '../helpers/FormatnParse';

export const internalSlice = createSlice({
	name: 'internal',
	initialState: {
		listAlStyles: [],
		listAlSystems: [],
		token: '',
		listRoom: [
			{
				id: '934329xiw3453j',
				name: 'John',
				read_at: '2023-03-28T15:08:23',
				listUser: [
					{ id: 1, name: 'John' },
					{ id: 2, name: 'Sarah' },
				],
				lastMsg: {
					user: { id: 1, name: 'John' },
					content: 'Hi! Can i have more photos about this product?',
					images: [],
					created_at: '2023-03-28T15:07:33',
					created_at_dump: '15:07',
					type: 'text',
				},
			},
			{
				id: '560897jld389',
				name: 'Sam',
				read_at: null,
				listUser: [
					{ id: 1, name: 'Sam' },
					{ id: 2, name: 'Sarah' },
				],
				lastMsg: {
					user: { id: 1, name: 'Sam' },
					content: 'How can i buy this?',
					images: [],
					created_at: '2023-03-28T11:07:33',
					created_at_dump: '16:18',
					type: 'text',
				},
			},
			{
				id: '67867fvffn3432',
				name: 'Kelly',
				read_at: null,
				listUser: [
					{ id: 11, name: 'Kelly' },
					{ id: 2, name: 'Sarah' },
				],
				lastMsg: {
					user: { id: 11, name: 'Kelly' },
					content: 'I want to buy this',
					images: [],
					created_at: '2023-03-28T11:01:33',
					created_at_dump: '11:01 28/03',
					type: 'text',
				},
			},
		],
		listMsg: [
			{
				id: 3,
				type: 'text',
				textContent: 'Hi, anyone there?',
				sender: { id: 1, name: 'John' },
				rId: '934329xiw3453j',
				created_at: '2023-03-28T14:07:33',
			},
			{
				id: 7,
				type: 'text',
				textContent: 'Yes, how can i help you sir?',
				sender: { id: 3, name: 'Me' },
				rId: '934329xiw3453j',
				created_at: '2023-03-28T14:08:33',
				isMe: true,
			},
			{
				id: 1,
				type: 'text',
				textContent: 'Can i have more photos about this product?',
				sender: { id: 1, name: 'John' },
				rId: '934329xiw3453j',
				created_at: '2023-03-28T15:07:33',
			},
			{
				id: 4,
				type: 'text',
				textContent: 'Is this still available?',
				sender: { id: 1, name: 'Sam' },
				rId: '560897jld389',
				created_at: '2023-03-28T10:07:33',
			},
			{
				id: 6,
				type: 'text',
				textContent: 'Yes it is! Do you want more infomation about it ?',
				sender: { id: 3, name: 'Me' },
				rId: '560897jld389',
				created_at: '2023-03-28T10:08:33',
				isMe: true,
			},
			{
				id: 2,
				type: 'text',
				textContent: 'How can i buy this?',
				sender: { id: 1, name: 'Sam' },
				rId: '560897jld389',
				created_at: '2023-03-28T11:07:33',
			},
			{
				id: 11,
				type: 'text',
				textContent: 'I want to buy this',
				sender: { id: 1, name: 'Kelly' },
				rId: '67867fvffn3432',
				created_at: '2023-03-28T11:07:33',
			},
		],
	},
	reducers: {
		setListAlStyles: (state, action) => {
			state.listAlStyles = action.payload ? jsonCopy(action.payload) : [];
		},
		setListAlSystems: (state, action) => {
			state.listAlSystems = action.payload ? jsonCopy(action.payload) : [];
		},
		pushMsg: (state, action) => {
			state.listMsg.push(action.payload);
		},
		setRoomReadAt: (state, action) => {
			const idx = state.listRoom.findIndex(o => o.id === action.payload);

			if (idx !== -1) {
				state.listRoom[idx].read_at = true;
			}
		},
	},
});
export const { setListAlStyles, setListAlSystems, pushMsg, setRoomReadAt } = internalSlice.actions;

export const selectInternal = state => state.internal;

export default internalSlice.reducer;
