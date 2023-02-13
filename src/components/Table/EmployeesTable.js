import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TBodyLoader from './TBodyLoader';
import TableEmptyRow from './TEmptyRow';
import LinearProgress from '@mui/material/LinearProgress';

import styles from '../../assets/styles/Table.module.scss';
const columns = [
	{ id: 'name', label: 'Họ tên', minWidth: 170 },
	{ id: 'code', label: 'Email', minWidth: 100 },
	{
		id: 'population',
		label: 'Trạng thái',
		minWidth: 170,
		align: 'center',
	},
	{
		id: 'size',
		label: 'Vai trò',
		minWidth: 170,
		align: 'center',
	},
	{
		id: 'action',
		label: 'Tác vụ',
		minWidth: 170,
		align: 'right',
	},
];

export default function StickyHeadTable(props) {
	const [elMenu, setElMenu] = useState(null);
	const [selectedData, setSelectedData] = useState(null);
	const handleClick = (e, employee) => {
		setSelectedData(employee);
		setElMenu(e.target);
	};
	const handleClose = () => {
		setSelectedData(null);
		setElMenu(null);
	};
	const rows = props.rows;
	function TableAction(data) {
		return (
			<>
				<IconButton
					aria-label='more'
					id='long-button'
					aria-controls={selectedData && data.name === selectedData.name ? 'long-menu' : undefined}
					aria-expanded={selectedData && data.name === selectedData.name ? 'true' : undefined}
					aria-haspopup='true'
					size='small'
					onClick={e => {
						handleClick(e, data);
					}}
					sx={{
						backgroundColor: '#cec5c5a3',
						backdropFilter: 'blur(4px)',
					}}
				>
					<MoreHorizIcon htmlColor='#000' />
				</IconButton>
				<Menu
					anchorEl={elMenu}
					MenuListProps={{
						'aria-labelledby': 'long-button',
					}}
					open={!!(selectedData && data.name === selectedData.name)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose} sx={{ fontSize: '14px' }}>
						Edit
					</MenuItem>
					<MenuItem onClick={handleClose} sx={{ fontSize: '14px' }}>
						Clone
					</MenuItem>
					<MenuItem onClick={handleClose} sx={{ fontSize: '14px' }}>
						Vật tư phụ
					</MenuItem>
				</Menu>
			</>
		);
	}
	return (
		<div className={styles.wrapper}>
			<Paper sx={{ width: '100%', overflow: 'hidden', padding: 0 }} elevation={0}>
				<TableContainer sx={{ maxHeight: '90vh' }}>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead>
							<TableRow>
								{columns.map(column => (
									<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} sx={{ p: 1 }}>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{props.onLoadData ? (
								<TableRow>
									<TableCell colSpan={99} sx={{ p: 0 }}>
										<LinearProgress />
									</TableCell>
								</TableRow>
							) : (
								<></>
							)}
							{props.onLoadData && props.isFirstLoad ? (
								<TBodyLoader key='1' count={columns.length || 3} />
							) : (
								<>
									{Array.isArray(rows) && rows.length ? (
										rows.map(row => {
											return (
												<TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
													{columns.map(column => {
														const value = row[column.id];
														return (
															<TableCell key={column.id} align={column.align} sx={{ color: 'text.black', p: 1 }}>
																{column.id === 'action'
																	? TableAction(row)
																	: column.format && typeof value === 'number'
																	? column.format(value)
																	: value}
															</TableCell>
														);
													})}
												</TableRow>
											);
										})
									) : (
										<TableEmptyRow />
									)}
								</>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</div>
	);
}
