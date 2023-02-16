import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import DoorModels from '../Shared/DoorModels';
export default function ListCard(params) {
	const [listDoorModel, setListDoorModel] = useState([]);

	useEffect(() => {
		if (Array.isArray(params.rows)) {
			setListDoorModel(params.rows);
		}
	}, [params.rows]);

	return (
		<Grid container spacing={{}}>
			{listDoorModel.length ? (
				listDoorModel.map(o => (
					<Grid key={o.name} item={true} xs={6} md={3} xl={2} sx={{ p: 2 }}>
						<DoorModels item={o} />
					</Grid>
				))
			) : (
				<>
					<h3 style={{ margin: '40px 16px', width: '100%' }} className='text-center'>
						<em>Không có dữ liệu</em>
					</h3>
				</>
			)}
		</Grid>
	);
}
