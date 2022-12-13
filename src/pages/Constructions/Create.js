import { useState, useEffect } from 'react';
import Grid from '@mui/system/Unstable_Grid/Grid';
export default function ConstructionsList() {
	return (
		<div className='page-container'>
			<div className='page-header'>
				<h1 className='page-title'>Tạo mới dự án</h1>
			</div>

			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
				<Grid item xs={6} md={4} lg={3}></Grid>
			</Grid>
		</div>
	);
}
