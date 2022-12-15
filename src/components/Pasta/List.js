import ContructionsTable from '../../components/Table/ContructionsTable';
import { useState, useEffect } from 'react';

import Pagination from '../../components/Shared/Pagination';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import CreateNewConstruction from '../../components/Dialog/CreateNewConstruction';
export default function ConstructionsList() {
	function createData(name, code, population, size) {
		const density = population / size;
		return { name, code, population, size, density };
	}

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(2);
	const [openDialogCreate, setOpenDialogCreate] = useState(false);

	const rows = [
		createData('India', 'IN', 1324171354, 3287263),
		createData('China', 'CN', 1403500365, 9596961),
		createData('Italy', 'IT', 60483973, 301340),
		createData('United States', 'US', 327167434, 9833520),
		createData('Canada', 'CA', 37602103, 9984670),
		createData('Australia', 'AU', 25475400, 7692024),
		createData('Germany', 'DE', 83019200, 357578),
		createData('Ireland', 'IE', 4857000, 70273),
		createData('Mexico', 'MX', 126577691, 1972550),
		createData('Japan', 'JP', 126317000, 377973),
	];
	return (
		<div className='page-container'>
			<div className='page-header'>
				<h1 className='page-title'> --- --- --- </h1>
			</div>
			<CreateNewConstruction openDialogCreate={openDialogCreate} setOpenDialogCreate={setOpenDialogCreate} />
			<div className='page-filter'>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
					<Grid item={true} xs={8} md={4}>
						<div className='d-flex' style={{ gap: '10px' }}>
							<TextField
								placeholder='Tìm kiếm'
								label=''
								size='small'
								fullWidth={true}
								InputProps={{
									classes: {
										input: 'font-size-14',
									},
								}}
								sx={{
									fontSize: '14px',
								}}
							/>
							<Button
								variant='contained'
								sx={{
									boxShadow: 'none',
									whiteSpace: 'nowrap',
									textTransform: 'none',
								}}
								size='medium'
								elevation={0}
							>
								Tìm kiếm
							</Button>
						</div>
					</Grid>
					<Grid item={true} xs={2} md={1} ml={'auto'}>
						<Button
							variant='contained'
							sx={{
								display: 'block',
								boxShadow: 'none',
								whiteSpace: 'nowrap',
								textTransform: 'none',
								marginLeft: 'auto',
							}}
							size='medium'
							elevation={0}
							onClick={() => {
								setOpenDialogCreate(true);
							}}
						>
							Thêm mới
						</Button>
					</Grid>
				</Grid>
			</div>

			<ContructionsTable rows={rows} />
			<div className='' style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Pagination page={currentPage} setCurrentPage={setCurrentPage} total={totalPage} setTotalPage={setTotalPage} />
			</div>
			<button
				onClick={() => {
					setTotalPage(totalPage + 1);
				}}
			>
				Add pages {totalPage}
			</button>
			<p>Current page: {currentPage}</p>
			<p>Total page: {totalPage}</p>
		</div>
	);
}
