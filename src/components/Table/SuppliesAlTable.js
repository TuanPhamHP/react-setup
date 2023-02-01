import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TBodyLoader from './TBodyLoader';
import LinearProgress from '@mui/material/LinearProgress';

import styles from '../../assets/styles/Table.module.scss';
const columns = [
	{ id: 'name', label: 'Tên', minWidth: 170 },
	{ id: 'aluminum_style_id', label: 'Hệ', minWidth: 100 },
	{
		id: 'population',
		label: 'Giá',
		minWidth: 170,
		align: 'right',
		format: value => value.toLocaleString('en-US'),
	},
	{
		id: 'density',
		label: 'Tỉ trọng',
		minWidth: 170,
		align: 'right',
		format: value => value.toLocaleString('en-US'),
	},
	{
		id: 'price',
		label: 'Giá nhập',
		minWidth: 170,
		align: 'right',
		format: value => value.toFixed(2) || '---',
	},
	{
		id: 'aluminum_system_id',
		label: 'Loại',
		minWidth: 170,
		align: 'right',
		format: () => 'Nhôm',
	},
];

export default function StickyHeadTable(props) {
	const rows = props.rows;
	return (
		<div className={styles.wrapper}>
			<Paper sx={{ width: '100%', overflow: 'hidden', padding: 0 }} elevation={0}>
				<TableContainer sx={{ maxHeight: '90vh' }}>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead>
							<TableRow>
								{columns.map(column => (
									<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
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
									{rows.map(row => {
										return (
											<TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
												{columns.map(column => {
													const value = row[column.id];
													return (
														<TableCell key={column.id} align={column.align} sx={{ color: 'text.black' }}>
															{column.format && typeof value === 'number' ? column.format(value) : value}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
								</>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</div>
	);
}
