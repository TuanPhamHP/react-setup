import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from '../../assets/styles/ChatRoomDetail.module.scss';
import { Avatar, IconButton } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { selectInternal, pushMsg, setRoomReadAt } from '../../store/internal';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

// firebase
import { getDocs, collection, query, where, orderBy, onSnapshot, limit } from '@firebase/firestore';
import firestore from '../../plugins/firebase_setup';
import { getLmTime } from '../../helpers/chat';

export default function ChatDetail(props) {
	let { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [room, setRoom] = useState({});
	const [roomMsg, setRoomMsg] = useState([]);

	const internal = useSelector(selectInternal);
	const listRoom = internal.listRoom;
	const roomSetupPhase = internal.roomSetupPhase;
	const handleKeyPress = e => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			if (e.target.value.trim()) {
				dispatch(
					pushMsg({
						id: new Date().getTime(),
						type: 'text',
						textContent: e.target.value.trim(),
						sender: { id: 3, name: 'Me' },
						rId: id,
						created_at: new Date().getTime(),
						isMe: true,
					})
				);
				e.target.value = '';
			}
		}
	};
	const fetchListMsg = async () => {
		const ar = [];
		const q = query(
			collection(firestore, 'messages'),
			where('conversationId', '==', id),
			orderBy('timestamp', 'asc'),
			limit(100)
		);
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach(doc => {
			ar.push({
				_id: doc.id,
				...doc.data(),
			});
		});
		setRoomMsg(ar);
	};

	const submitMsg = () => {
		const input = document.querySelector('#inAppEditor');
		if (!input) {
			return;
		}
		if (input.value.trim()) {
			dispatch(
				pushMsg({
					id: new Date().getTime(),
					type: 'text',
					textContent: input.value.trim(),
					sender: { id: 3, name: 'Me' },
					rId: id,
					created_at: new Date().getTime(),
					isMe: true,
				})
			);
			input.value = '';
			input.focus();
		}
	};

	const renderListMsg = () => {
		return roomMsg.map(msg => {
			return (
				<div key={msg._id} className={`${styles.eachMsg} ${msg.isMe ? styles.myMsg : styles.otherMsg}`}>
					<pre className={`${styles.textContent}`}>{msg.text}</pre>
					<span className={`${styles.msgTime}`}>{getLmTime(msg.timestamp)}</span>
				</div>
			);
		});
	};
	useEffect(() => {
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
		fetchListMsg();
	}, [room]);

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
				<div className={`${styles.msgContainer}`}>{renderListMsg()}</div>
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
