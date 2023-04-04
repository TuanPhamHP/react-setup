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
				<div key={msg._id} className={`${styles.eachMsg} ${msg.isMe ? styles.myMsg : styles.otherMsg}`}>
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
	return (
		<div className={`${styles.roomWrapper}`}>
			<div className={`${styles.roomHeader}`}>
				<div className={`${styles.roomHeaderInfo}`}>
					<div className=''>
						<Avatar alt={'User avatar'} src={room.id ? room.listUser[0]?.avatar : ''} sx={{ width: 38, height: 38 }} />
					</div>
					<div>
						<span className={`${styles.roomName}`}>{room.recipientId}</span>
					</div>
				</div>
			</div>
			<div className={`${styles.roomBody}`}>
				<div className={`${styles.msgContainer} mod-webkit-scroll-m1 `} id='msgContainer'>
					{renderListMsg()}
				</div>
				<div className={`${styles.typingContainer}`}>
					<textarea
						id='inAppEditor'
						className={`${styles.editorBlock}`}
						placeholder='Type and send your message'
						onKeyUp={e => {
							handleKeyPress(e);
						}}
					></textarea>
					<IconButton
						sx={{ padding: '4px', marginRight: '4px', boxSizing: 'border-box', height: 'auto' }}
						color={'primary'}
						onClick={submitMsg}
					>
						<SendTwoToneIcon sx={{ transform: 'rotateZ(-45deg)' }} />
					</IconButton>
				</div>
			</div>
		</div>
	);
}
