import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';

export default function PaginationSize(props) {
	const [page, setPage] = useState(props.page);
	const [total, setTotal] = useState(props.total);
	const onChangePagination = (ev, count) => {
		setPage(count);
		props.setCurrentPage(count);
	};
	useEffect(() => {
		console.log('page changed', page);
		// return () => {
		// 	// Cleanup function;
		// 	console.log('unmounted');
		// };
	}, [page]);

	useEffect(() => {
		setTotal(props.total);
	}, [props.total]);

	useEffect(() => {
		if (props.page !== page) {
			setPage(props.page);
		}
	}, [props.page]);
	return (
		<Pagination
			showFirstButton
			showLastButton
			page={page}
			count={total}
			sx={{
				justifyContent: 'flex-end',
			}}
			color='pagination'
			onChange={onChangePagination}
		/>
	);
}
