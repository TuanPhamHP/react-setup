import * as React from 'react';
import Draggable from 'react-draggable';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import styles from '../../assets/styles/ConstructItem.module.scss';

export default function ItemData(props) {
	const [originPosition, setOriginPosition] = React.useState(null);
	const [desPosition, setDesPosition] = React.useState(null);

	const eventLogger = (e, data) => {
		console.log('Event: ', e);
		console.log('Data: ', data);
	};
	const startDrag = (e, data) => {
		console.log('start');
		console.log(e);
		const obj = {
			x: e.clientX,
			y: e.clientY,
		};
		console.log(obj);
		setOriginPosition(obj);
	};
	const onDrag = (e, data) => {
		// console.log('on');
	};
	const stopDrag = (e, data) => {
		console.log('stop');
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
			onDrag={onDrag}
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
