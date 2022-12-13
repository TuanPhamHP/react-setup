function ConstructionsTable() {
	const getTableData = () => {
		const listData = [];
		return listData.map(o => (
			<tr>
				<td>{'Anh Vĩnh'}</td>
				<td>{'0988797979'}</td>
				<td>{'Hoàn thành'}</td>
				<td>{''}</td>
			</tr>
		));
	};
	return (
		<table>
			<thead>
				<tr>
					<th>
						<span>Tên</span>
					</th>
					<th>
						<span>Số điện thoại</span>
					</th>
					<th>
						<span>Trạng thái</span>
					</th>
					<th>
						<span>Tác vụ</span>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Anh vĩnh</td>
				</tr>
			</tbody>
		</table>
	);
}
export default ConstructionsTable;
