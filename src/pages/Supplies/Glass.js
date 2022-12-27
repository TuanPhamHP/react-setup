import SuppliesGlassTable from '../../components/Table/SuppliesGlassTable';
import { useState, useEffect } from 'react';

import Pagination from '../../components/Shared/Pagination';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import CreateNewSuppliesGlass from '../../components/Dialog/CreateNewSuppliesGlass';
export default function ConstructionsList() {
	function createData(name, code, population, size) {
		const density = population / size;
		return { name, code, population, size, density };
	}
	const rows = [createData('Kính 01', '18', 1324171354, 3287263), createData('Kính 02', '14', 1403500365, 9596961)];

	const [firstDataLoading, setFirstDataLoading] = useState(true);
	const [dataLoading, setDataLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [openDialogCreate, setOpenDialogCreate] = useState(false);
	const [rowsData, setRowsData] = useState(rows);

	const handleCreateNewData = ({ name, code, population, size }) => {
		setRowsData([...rowsData, createData(name, code, population, size)]);
	};

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
				<h1 className='page-title'>Danh sách vật tư Kính</h1>
			</div>
			<CreateNewSuppliesGlass
				openDialogCreate={openDialogCreate}
				setOpenDialogCreate={setOpenDialogCreate}
				handleCreateNewData={handleCreateNewData}
			/>
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

			<SuppliesGlassTable rows={rowsData} onLoadData={dataLoading} isFirstLoad={firstDataLoading} />
			<div className='' style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Pagination page={currentPage} setCurrentPage={setCurrentPage} total={totalPage} setTotalPage={setTotalPage} />
			</div>
		</div>
	);
}
