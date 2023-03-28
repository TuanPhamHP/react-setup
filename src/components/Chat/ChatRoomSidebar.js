import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import styles from '../../assets/styles/ChatSideBarRoom.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectInternal } from '../../store/internal';
export default function ChatRoomSideBar(props) {
	const internal = useSelector(selectInternal);

	const location = useLocation();
	const listRoom = internal.listRoom;
	const filterRoomByRead = internal.filterRoomByRead;

	const renderListRoom = () => {
		const arr = listRoom.filter(o => {
			return filterRoomByRead ? !o.read_at : true;
		});
		if (!arr.length) {
			return (
				<div className={styles.noRoom}>
					<p className={styles.noRoomMsg}>No unread message</p>
				</div>
			);
		}
		return arr.map(room => {
			return (
				<Link
					key={room.id}
					className={`${styles.room} ${room.read_at ? '' : styles.unread} ${
						location.pathname === `/chat/${room.id}` ? styles.isActiveRoom : ''
					}`}
					style={{ gap: '8px' }}
					to={`/chat/${room.id}`}
				>
					<div className=''>
						<Avatar alt={'User avatar'} src={room.user?.avatar} sx={{ width: 38, height: 38 }} />
					</div>
					<div className={`${styles.roomLastMessageBlock}`} style={{ color: 'text' }}>
						<div className='d-flex align-items-center'>
							<span className={`${styles.roomName}`} style={{ color: 'text.primary' }}>
								{room.name || 'Unknow'}
							</span>
							<span className={`${styles.roomTime}`} style={{ color: 'text.primary' }}>
								{room.lastMsg.created_at_dump || '---'}
							</span>
						</div>
						<span className={`${styles.roomLastMessageContent}`}>
							<span className={`${styles.roomLastMessageUser}`}>{room.lastMsg.user?.name || 'Unknow'}: </span>
							{room.lastMsg.content}
						</span>
					</div>
				</Link>
			);
		});
	};

	useEffect(() => {}, []);

	return <div className={`${styles.eachRoomWrapper}`}>{renderListRoom()}</div>;
}
