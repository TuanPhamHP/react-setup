import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import styles from '../../assets/styles/ChatSideBarRoom.module.scss';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectInternal } from '../../store/internal';
export default function ChatRoomSideBar(props) {
	const internal = useSelector(selectInternal);

	const listRoom = internal.listRoom;
	const renderListRoom = () => {
		return listRoom.map(room => {
			return (
				<Link
					key={room.id}
					className={`${styles.room} ${room.read_at ? '' : styles.unread}`}
					style={{ gap: '8px' }}
					to={`/chat/${room.id}`}
				>
					<div className=''>
						<Avatar alt={'User avatar'} src={room.user?.avatar} sx={{ width: 38, height: 38 }} />
					</div>
					<p className={`${styles.roomLastMessageBlock}`} style={{ color: 'text' }}>
						<span className={`${styles.roomName}`} style={{ color: 'text.primary' }}>
							{room.name || 'Unknow'}
						</span>

						<span className={`${styles.roomLastMessageContent}`}>
							<span className={`${styles.roomLastMessageUser}`}>{room.lastMsg.user?.name || 'Unknow'}: </span>
							{room.lastMsg.content}
						</span>
					</p>
				</Link>
			);
		});
	};

	useEffect(() => {}, []);

	return <div className={`${styles.eachRoomWrapper}`}>{renderListRoom()}</div>;
}
