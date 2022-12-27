import ContructionsTable from '../../components/Table/ContructionsTable';
import { useState, useEffect } from 'react';

import Pagination from '../../components/Shared/Pagination';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import CreateNewConstruction from '../../components/Dialog/CreateNewConstruction';
const defaultFilter = {
	search: '',
};
export default function ConstructionsList() {
	function createData(name, code, population, size) {
		const density = population / size;
		return { name, code, population, size, density };
	}

	const [firstDataLoading, setFirstDataLoading] = useState(true);
	const [dataLoading, setDataLoading] = useState(true);
	const [formFilter, setFormFilter] = useState({ ...defaultFilter });
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(2);
	const [openDialogCreate, setOpenDialogCreate] = useState(false);

	const rows = [
		createData('India', '0987789981', 'Đã hoàn thành', 3287263),
		createData('China', '0987789982', 'Đã hoàn thành', 9596961),
		createData('Italy', '0987789983', 'Đã hoàn thành', 301340),
		createData('United States', '0987789984', 'Đã hoàn thành', 9833520),
		createData('Canada', '0987789985', 'Đã hoàn thành', 9984670),
		createData('Australia', '0987789986', 'Đã hoàn thành', 7692024),
		createData('Germany', '0987789987', 'Đã hoàn thành', 357578),
		createData('Ireland', '0987789988', 'Đã hoàn thành', 70273),
		createData('Mexico', '0987789989', 'Đã hoàn thành', 1972550),
		createData('Japan', '0987789990', 'Đã hoàn thành', 377973),
	];

	const getListData = () => {
		setDataLoading(true);
		setTimeout(() => {
			setFirstDataLoading(false);
			setDataLoading(false);
		}, 700);
	};
	const submitFormSearch = e => {
		e.preventDefault();
		// getListData();
		getListData();
	};
	const handleFormFilterInput = (e, field) => {
		setFormFilter({ ...formFilter, [field]: e.target.value });
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
				<h1 className='page-title'>Danh sách dự án</h1>
			</div>
			<CreateNewConstruction openDialogCreate={openDialogCreate} setOpenDialogCreate={setOpenDialogCreate} />
			<div className='page-filter'>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
					<Grid item={true} xs={8} md={4}>
						<form className='d-flex' style={{ gap: '10px' }} onSubmit={submitFormSearch}>
							<TextField
								placeholder='Tìm kiếm'
								label=''
								size='small'
								fullWidth={true}
								value={formFilter.search}
								InputProps={{
									classes: {
										input: 'font-size-14',
									},
								}}
								sx={{
									fontSize: '14px',
								}}
								onChange={e => handleFormFilterInput(e, 'search')}
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
								type='submit'
							>
								Tìm kiếm
							</Button>
						</form>
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

			<ContructionsTable rows={rows} onLoadData={dataLoading} isFirstLoad={firstDataLoading} />
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
