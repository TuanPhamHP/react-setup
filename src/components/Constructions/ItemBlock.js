import * as React from 'react';
import Draggable from 'react-draggable';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import styles from '../../assets/styles/ConstructItem.module.scss';
import { useDispatch } from 'react-redux';
import { setItemSidebarDrag } from '../../store/dragLocal';

export default function ItemData(props) {
	const [originPosition, setOriginPosition] = React.useState(null);
	const [desPosition, setDesPosition] = React.useState(null);
	const dispatch = useDispatch();
	const eventLogger = (e, data) => {
		console.log('Event: ', e);
		console.log('Data: ', data);
	};
	const startDrag = (e, data) => {
		dispatch(setItemSidebarDrag(true));
		// console.log('start');
		// console.log(e);
		const obj = {
			x: e.clientX,
			y: e.clientY,
		};
		setOriginPosition(obj);
	};
	const onDrag = (e, data) => {
		// console.log('on');
	};
	const stopDrag = (e, data) => {
		// console.log('stop');
		dispatch(setItemSidebarDrag(false));
		console.log(e);
		const target = document.querySelector('#resultPos');
		if (target) {
			const rect = target.getBoundingClientRect();
			const width = target.clientWidth;
			const height = target.clientHeight;
			const startRX = rect.left;
			const endRX = startRX + width;
			const startRY = rect.top;
			const endRY = startRY + height;
			const validX = e.clientX >= startRX && e.clientX <= endRX;
			const validY = e.clientY >= startRY && e.clientY <= endRY;
			if (validX && validY) {
				console.log(props.item);
			}
		}

		setTimeout(() => {
			setDesPosition({ x: 0, y: 0 });
		}, 100);
	};
	return (
		<Draggable
			handle='.handle'
			defaultPosition={{ x: 0, y: 0 }}
			position={desPosition}
			grid={[30, 30]}
			scale={1}
			onStart={startDrag}
			onStop={stopDrag}
		>
			<div>
				<div className='handle'>
					<div className={styles.itemWrapper}>
						<ImageListItem>
							<img src={props.item.img} alt={props.item.title} loading='lazy' className={'no-drag'} />
							<ImageListItemBar title={props.item.title} subtitle={props.item.author} />
						</ImageListItem>
					</div>
				</div>
			</div>
		</Draggable>
	);
}
