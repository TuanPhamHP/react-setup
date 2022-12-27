import EmployeesTable from '../../components/Table/EmployeesTable';
import { useState, useEffect } from 'react';

import Pagination from '../../components/Shared/Pagination';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import CreateNewEmployee from '../../components/Dialog/CreateNewEmployee';
export default function ConstructionsList() {
	function createData(name, code, population, size) {
		const density = population / size;
		return { name, code, population, size, density };
	}
	const [firstDataLoading, setFirstDataLoading] = useState(true);
	const [dataLoading, setDataLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(2);
	const [openDialogCreate, setOpenDialogCreate] = useState(false);

	const rows = [
		createData('Admin', 'admin@gmail.com', 'Active', 'Admin', 3287263),
		createData('N.V.A', 'example1@gmail.com', 'Active', 'Nhân viên', 3287263),
		createData('N.V.B', 'example2@gmail.com', 'Active', 'Nhân viên', 9596961),
		createData('N.V.C', 'example3@gmail.com', 'Active', 'Nhân viên', 301340),
	];

	const getListData = () => {
		setDataLoading(true);
		setTimeout(() => {
			setFirstDataLoading(false);
			setDataLoading(false);
		}, 700);
	};
	useEffect(() => {
		getListData();
	}, []);
	useEffect(() => {
		getListData();
	}, [currentPage]);

	return (
		<div className='page-container'>
			<div className='page-header'>
				<h1 className='page-title'>Danh sách nhân viên</h1>
			</div>
			<CreateNewEmployee openDialogCreate={openDialogCreate} setOpenDialogCreate={setOpenDialogCreate} />
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
					<Grid item={true} xs={4} md={1} ml={'auto'}>
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

			<EmployeesTable rows={rows} onLoadData={dataLoading} isFirstLoad={firstDataLoading} />
			<div className='' style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Pagination page={currentPage} setCurrentPage={setCurrentPage} total={totalPage} setTotalPage={setTotalPage} />
			</div>
			{/* <button
				onClick={() => {
					setTotalPage(totalPage + 1);
				}}
			>
				Add pages {totalPage}
			</button>
			<p>Current page: {currentPage}</p>
			<p>Total page: {totalPage}</p> */}
		</div>
	);
}
