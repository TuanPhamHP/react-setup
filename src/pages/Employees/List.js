import EmployeesTable from '../../components/Table/EmployeesTable';
import { useState, useEffect } from 'react';
import api from '../../services/index';

import Pagination from '../../components/Shared/Pagination';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import CreateNewEmployee from '../../components/Dialog/CreateNewEmployee';
export default function ConstructionsList() {
	const [firstDataLoading, setFirstDataLoading] = useState(true);
	const [dataLoading, setDataLoading] = useState(true);
	const [listData, setListData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [openDialogCreate, setOpenDialogCreate] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const getListData = async () => {
		setDataLoading(true);
		const res = await api.admins.getListData({ page: 1, per_page: 15 });

		setFirstDataLoading(false);
		setDataLoading(false);
		if (!res) {
			enqueueSnackbar('Có lỗi khi lấy danh sách dữ liệu', { variant: 'error' });
			return;
		}
		try {
			if (!res.status || res.status > 399) {
				enqueueSnackbar(res.statusText, { variant: 'error' });
			} else {
				setListData(res.data.data);
				setTotalPage(1);
			}
		} catch (error) {}
		// console.log(res);
	};
	useEffect(() => {
		getListData();
	}, []);
	useEffect(() => {
		if (!firstDataLoading) {
			getListData();
		}
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

			<EmployeesTable rows={listData} onLoadData={dataLoading} isFirstLoad={firstDataLoading} />
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
