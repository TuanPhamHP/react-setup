import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function EmptyRow(props) {
	return (
		<TableRow hover role='checkbox' tabIndex={-1}>
			<TableCell colSpan={99} className='text-center'>
				<h3 style={{ margin: '0' }}>
					<em>{props.isLoading ? 'Đang tải dữ liệu' : 'Không có dữ liệu'}</em>
				</h3>
			</TableCell>
		</TableRow>
	);
}
