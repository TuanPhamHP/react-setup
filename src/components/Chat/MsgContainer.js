import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import styles from '../../assets/styles/ChatRoomDetail.module.scss';
import { Avatar, IconButton } from '@mui/material';
import api from '../../services/index';

import { useSelector, useDispatch } from 'react-redux';
import { selectInternal, pushMsg, setRoomReadAt } from '../../store/internal';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

// firebase
import { getDocs, collection, query, where, orderBy, onSnapshot, limit, doc } from '@firebase/firestore';
import firestore from '../../plugins/firebase_setup';
import { getLmTime } from '../../helpers/chat';

export default function ChatDetail(props) {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [room, setRoom] = useState({});
	const [roomMsg, setRoomMsg] = useState([]);

	const internal = useSelector(selectInternal);
	const listRoom = internal.listRoom;
	const userId = internal.userId;
	const roomSetupPhase = internal.roomSetupPhase;
	const scrollToBottom = () => {
		try {
			const t = document.querySelector('#msgContainer');
			t.scrollTo(0, t.scrollHeight);
		} catch (error) {}
	};
	const handleKeyPress = async e => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			if (e.target.value.trim()) {
				const msg = {
					message: e.target.value.trim(),
					recipientId: room.senderId,
				};
				e.target.value = '';
				const res = await api.chat.postMessage(msg);
			}
		}
	};

	const submitMsg = async () => {
		const input = document.querySelector('#inAppEditor');
		if (!input) {
			return;
		}
		if (input.value.trim()) {
			const msg = {
				message: input.value.trim(),
				recipientId: room.senderId,
			};
			input.value = '';
			input.focus();
			const res = await api.chat.postMessage(msg);
		}
	};

	const renderListMsg = () => {
		return roomMsg.map(msg => {
			return (
				<div
					key={msg._id}
					className={`${styles.eachMsg} ${+msg.senderId === +userId ? styles.myMsg : styles.otherMsg}`}
				>
					<div className={`${styles.bodyMsg}`}>
						<pre className={`${styles.textContent}`}>{msg.text}</pre>
						<span className={`${styles.msgTime}`}>{getLmTime(msg.timestamp)}</span>
					</div>
				</div>
			);
		});
	};
	const pushNewMsg = msg => {
		setRoomMsg(prev => {
			const cr = prev.map(o => o._id);
			if (cr.includes(msg._id)) {
				return [...prev];
			}
			return [...prev, msg];
		});
	};
	useEffect(() => {
		setRoomMsg([]);
		setRoom({});
		if (!roomSetupPhase) {
			return;
		}
		const room = listRoom.find(o => o.conversationId === id);
		dispatch(setRoomReadAt(id));
		if (room) {
			setRoom(room);
		} else {
			navigate('/');
		}
	}, [id, listRoom, roomSetupPhase]);

	useEffect(() => {
		const r = () => {
			const arr = [...roomMsg];
			const q = query(
				collection(firestore, 'messages'),
				where('conversationId', '==', id),
				orderBy('timestamp', 'asc'),
				limit(100)
			);
			onSnapshot(q, snapshot => {
				snapshot.docChanges().forEach(change => {
					const msg = {
						_id: change.doc.id,
						...change.doc.data(),
					};
					pushNewMsg(msg);
				});
			});
		};
		r();
	}, [room]);

	useEffect(() => {
		scrollToBottom();
	}, [roomMsg]);
	return renderListMsg();
}
