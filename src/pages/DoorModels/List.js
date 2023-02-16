import DoorModelsTable from '../../components/Table/DoorModelsTable';
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import api from '../../services/index';

import { useTheme } from '@mui/material/styles';
import ConfirmDialog from '../../components/Dialog/ConfirmDialog';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSnackbar } from 'notistack';
import SwipeableViews from 'react-swipeable-views';
import styles from '../../assets/styles/ListDoor.module.scss';
import CreateNewDoorModels from '../../components/Dialog/CreateNewDoorModels';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{children}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

export default function ConstructionsList() {
	function createData(name, code, population, size) {
		const density = population / size;
		return { name, code, population, size, density };
	}

	const theme = useTheme();
	let [searchParams, setSearchParams] = useSearchParams();
	const [name, setName] = useState('');
	const [firstDataLoading, setFirstDataLoading] = useState(true);
	const [dataLoading, setDataLoading] = useState(true);
	const [listData, setListData] = useState([]);
	const [selectedData, setSelectedData] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(2);
	const { enqueueSnackbar } = useSnackbar();
	const [value, setValue] = useState(0);
	const [openDialogCreate, setOpenDialogCreate] = useState(false);
	const [loadingDelete, setLoadingDelete] = useState(false);
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
	const location = useLocation();
	const handleChangeTab = (event, newValue) => {
		setValue(newValue);
	};
	const handleChangeIndex = index => {
		setValue(index);
	};
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
		const res = await api.template.getListData({ name: name, page: currentPage, per_page: 15 });

		setDataLoading(false);
		if (!res) {
			enqueueSnackbar('Có lỗi khi lấy danh sách dữ liệu', { variant: 'error' });
			return;
		}
		try {
			if (!res.status || res.status > 399) {
				enqueueSnackbar(res.statusText, { variant: 'error' });
			} else {
				const pagination = res.data.pagination || {};
				setTotalPage(pagination.total_page || 1);
				setListData(res.data.data);
			}
		} catch (error) {}
	};
	const onEdit = _data => {
		setSelectedData(_data);
		setOpenDialogCreate(true);
	};
	const closeCU = _data => {
		setSelectedData(null);
		setOpenDialogCreate(false);
	};
	const onDelete = _data => {
		setSelectedData(_data);
		setOpenConfirmDialog(true);
	};
	const closeDelete = () => {
		setSelectedData(null);
		setOpenConfirmDialog(false);
	};
	const onSubmitDelete = async () => {
		if (!selectedData) {
			return;
		}
		setLoadingDelete(true);
		const res = await api.template.delete(selectedData.id);

		setLoadingDelete(false);
		if (!res) {
			enqueueSnackbar('Có lỗi khi xóa dữ liệu', { variant: 'error' });
			return;
		}
		try {
			if (!res.status || res.status > 399) {
				enqueueSnackbar(res.statusText, { variant: 'error' });
			} else {
				enqueueSnackbar('Xóa thành công', { variant: 'success' });
				getListData();
				closeDelete();
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

	return (
		<div className='page-container'>
			<div className='page-header'>
				<h1 className='page-title'>Danh sách mẫu cửa</h1>
			</div>
			<CreateNewDoorModels
				openDialogCreate={openDialogCreate}
				setOpenDialogCreate={setOpenDialogCreate}
				onDelete={onDelete}
				onEdit={onEdit}
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
									if (['Enter', 'NumpadEnter'].includes(e.key)) {
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
			<div className={`${styles.listTabs} border-bottom `} style={{ margin: 2 }}>
				<Tabs
					value={value}
					onChange={handleChangeTab}
					indicatorColor='secondary'
					textColor='inherit'
					variant='standard'
				>
					<Tab label='Cửa đi' color='primary' />
					<Tab label='Cửa sổ' />
					<Tab label='Vách' />
				</Tabs>
			</div>

			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<DoorModelsTable rows={rows} />
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<DoorModelsTable rows={rows.slice(2, 5)} />
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					<DoorModelsTable rows={rows.slice(0, 0)} />
				</TabPanel>
			</SwipeableViews>

			{/* <button
				onClick={() => {
					setTotalPage(totalPage + 1);
				}}
			>
				Add pages {totalPage}
			</button>
			<p>Current page: {currentPage}</p>
			<p>Total page: {totalPage}</p> */}
			<ConfirmDialog
				openDialog={openConfirmDialog}
				setOpenDialog={setOpenConfirmDialog}
				closeDialog={closeDelete}
				onSubmit={onSubmitDelete}
				message={`Bạn chắc chắn muốn xóa ${selectedData ? selectedData.name : ''} ?`}
				loading={loadingDelete}
			/>
		</div>
	);
}
