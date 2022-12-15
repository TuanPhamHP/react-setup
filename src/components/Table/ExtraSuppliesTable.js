import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import styles from '../../assets/styles/Table.module.scss';
const columns = [
	{ id: 'name', label: 'Tên', minWidth: 170 },
	{ id: 'code', label: 'Đơn vị', minWidth: 100 },
	{
		id: 'population',
		label: 'Giá',
		minWidth: 170,
		align: 'right',
		format: value => value.toLocaleString('en-US'),
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
							{rows.map(row => {
								return (
									<TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
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
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</div>
	);
}
