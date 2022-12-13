import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ListItemPreview from '../../components/Constructions/ListItemPreview';
import { useSelector } from 'react-redux';
import { selectDragLocal } from '../../store/dragLocal';
import styles from '../../assets/styles/ConstructPage.module.scss';
export default function ConstructionsList() {
	const dragLocal = useSelector(selectDragLocal);

	return (
		<div className='page-container'>
			<div className='page-header'>
				<h1 className='page-title'>Tạo mới dự án</h1>
			</div>

			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
				<Grid item={true} xs={12} sm={4} md={3}>
					<div className={dragLocal ? styles.listItemWrNoOf : styles.listItemWr}>
						<ListItemPreview />
					</div>
				</Grid>
				<Grid item={true} xs={12} sm={8} md={9}>
					<h1>MAIN CREATOR</h1>
					<div id='resultPos' style={{ padding: '20px', border: '1px solid #000' }}>
						<h3>Drag</h3>
						<h3>Over</h3>
						<h3>Here</h3>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
