import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import styles from '../../assets/styles/ChatSideBarRoom.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectInternal } from '../../store/internal';
import { getLmTime, formatUserNameFromId } from '../../helpers/chat';

export default function ChatRoomSideBar(props) {
	const internal = useSelector(selectInternal);

	const location = useLocation();
	const listRoom = internal.listRoom;
	const roomSetupPhase = internal.roomSetupPhase;
	const filterRoomByRead = internal.filterRoomByRead;

	const renderListRoom = () => {
		const arr = listRoom.filter(o => {
			return filterRoomByRead ? !o.read_at : true;
		});
		if (!arr.length) {
			return (
				<div className={styles.noRoom}>
					<p className={styles.noRoomMsg}>{roomSetupPhase ? 'Nothing Found :(' : 'Getting list message ...'}</p>
				</div>
			);
		}
		return arr.map(room => {
			return (
				<Link
					key={room.conversationId}
					className={`${styles.room} ${room.read_at ? '' : styles.unread} ${
						location.pathname === `/chat/${room.conversationId}` ? styles.isActiveRoom : ''
					}`}
					style={{ gap: '8px' }}
					to={`/chat/${room.conversationId}`}
				>
					<div className=''>
						<Avatar alt={'User avatar'} src={room.user?.avatar} sx={{ width: 38, height: 38 }} />
					</div>
					<div className={`${styles.roomLastMessageBlock}`} style={{ color: 'text' }}>
						<div className='d-flex align-items-center'>
							<span className={`${styles.roomName}`} style={{ color: 'text.primary' }}>
								{formatUserNameFromId(room.recipientId)}
							</span>
							<span className={`${styles.roomTime}`} style={{ color: 'text.primary' }}>
								{getLmTime(room.last_message?.timestamp) || '---'}
							</span>
						</div>
						<span className={`${styles.roomLastMessageContent}`}>
							<span className={`${styles.roomLastMessageUser}`}>
								{room.last_message ? formatUserNameFromId(room.last_message.senderId) : 'Unknow'}:{' '}
							</span>
							{room.last_message?.text}
						</span>
					</div>
				</Link>
			);
		});
	};

	useEffect(() => {}, []);

	return <div className={`${styles.eachRoomWrapper}`}>{renderListRoom()}</div>;
}
