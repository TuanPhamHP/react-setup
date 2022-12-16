import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';
import LinearProgress from '@mui/material/LinearProgress';

export default function Tbody(params) {
	const rows = [...Array(params.count || 4)];
	return (
		<>
			<TableRow>
				<TableCell colSpan={99} sx={{ p: 1 }}>
					<p style={{ textAlign: 'center', margin: '8px 0' }}>
						<b>Đang tải dữ liệu.</b>
					</p>
				</TableCell>
			</TableRow>
			<TableRow>
				{rows.map((col, idx) => {
					return (
						<TableCell key={idx} sx={{ p: 1 }}>
							{idx !== rows.length - 1 ? (
								<Skeleton variant='text' width={'90%'} height={30} />
							) : (
								<Skeleton variant='text' width={'100%'} height={30} />
							)}
						</TableCell>
					);
				})}
			</TableRow>
			<TableRow>
				{rows.map((col, idx) => {
					return (
						<TableCell key={idx} sx={{ p: 1 }}>
							{idx !== rows.length - 1 ? (
								<Skeleton variant='text' width={'90%'} height={30} />
							) : (
								<Skeleton variant='text' width={'100%'} height={30} />
							)}
						</TableCell>
					);
				})}
			</TableRow>
		</>
	);
}
