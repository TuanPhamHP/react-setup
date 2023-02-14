import SuppliesAlTable from '../../components/Table/SuppliesAlTable';
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import api from '../../services/index';

import Pagination from '../../components/Shared/Pagination';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import CreateNewSuppliesAl from '../../components/Dialog/CreateNewSuppliesAl';
export default function ConstructionsList() {
	let [searchParams, setSearchParams] = useSearchParams();
	const [name, setName] = useState('');
	const [firstDataLoading, setFirstDataLoading] = useState(true);
	const [dataLoading, setDataLoading] = useState(true);
	const [listData, setListData] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPage, setTotalPage] = useState(1);
	const [openDialogCreate, setOpenDialogCreate] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const location = useLocation();

	const syncUrl = () => {
		const currentPage = +searchParams.get('page') || 1;
		const name = searchParams.get('name') || '';
		setCurrentPage(currentPage);
		setName(name);

		setFirstDataLoading(false);
	};
	const handleSearch = () => {
		setCurrentPage(1);
		if (currentPage === 1) {
			bindUrl();
		}
	};
	const bindUrl = () => {
		const localCurrentPage = currentPage || 1;
		const localSearch = name || '';
		setSearchParams({
			page: localCurrentPage,
			name: localSearch,
		});
	};
	const handleChangeSearch = e => {
		const val = e.target.value;
		setName(val);
	};
	const getListData = async () => {
		setDataLoading(true);
		const res = await api.aluminum.getListData({ name: name, page: currentPage, per_page: 15 });

		setDataLoading(false);
		if (!res) {
			enqueueSnackbar('Có lỗi khi lấy danh sách dữ liệu', { variant: 'error' });
			return;
		}
		try {
			if (!res.status || res.status > 399) {
				enqueueSnackbar(res.statusText, { variant: 'error' });
			} else {
				const pagination = res.data.pagination;
				setListData(res.data.data);
				setTotalPage(pagination.total_page);
			}
		} catch (error) {}
	};

	useEffect(() => {
		if (!firstDataLoading) {
			bindUrl();
		}
	}, [currentPage]);

	useEffect(() => {
		syncUrl();
	}, []);

	useEffect(() => {
		if (!firstDataLoading) {
			getListData();
		}
	}, [firstDataLoading, location.search]);

	// useEffect(() => {
	// 	getListData();
	// }, [refQuery]);
	return (
		<div className='page-container'>
			<div className='page-header'>
				<h1 className='page-title'>Danh sách vật tư Nhôm</h1>
			</div>
			<CreateNewSuppliesAl
				openDialogCreate={openDialogCreate}
				setOpenDialogCreate={setOpenDialogCreate}
				getListData={getListData}
			/>
			<div className='page-filter'>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
					<Grid item={true} xs={8} md={4}>
						<div className='d-flex' style={{ gap: '10px' }}>
							<TextField
								placeholder='Tìm kiếm'
								label=''
								size='small'
								value={name}
								fullWidth={true}
								onChange={e => handleChangeSearch(e)}
								onKeyUp={e => {
									if (e.key === 'Enter') {
										handleSearch();
									}
								}}
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
								onClick={handleSearch}
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

			<SuppliesAlTable rows={listData} onLoadData={dataLoading} isFirstLoad={firstDataLoading} />
			<div className='' style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Pagination page={currentPage} setCurrentPage={setCurrentPage} total={totalPage} setTotalPage={setTotalPage} />
			</div>
		</div>
	);
}
