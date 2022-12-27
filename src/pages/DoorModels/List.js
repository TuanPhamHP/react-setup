import DoorModelsTable from '../../components/Table/DoorModelsTable';
import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import Pagination from '../../components/Shared/Pagination';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';

import { Link } from 'react-router-dom';
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
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(2);
	const [value, setValue] = useState(0);
	const [openDialogCreate, setOpenDialogCreate] = useState(false);
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
	return (
		<div className='page-container'>
			<div className='page-header'>
				<h1 className='page-title'>Danh sách mẫu cửa</h1>
			</div>
			<CreateNewDoorModels openDialogCreate={openDialogCreate} setOpenDialogCreate={setOpenDialogCreate} />
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
			<div className='listTabs'>
				<Tabs
					value={value}
					onChange={handleChangeTab}
					indicatorColor='secondary'
					textColor='inherit'
					variant='standard'
				>
					<Tab label='Cửa đi' />
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
					<DoorModelsTable rows={rows.slice(-8)} />
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
		</div>
	);
}
