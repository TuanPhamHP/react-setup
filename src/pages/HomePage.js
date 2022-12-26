import '../App.css';
import workTable from '../assets/images/work-table.svg';

export default function Home() {
	return (
		<>
			<div
				className='d-flex align-center justify-content-center w-100'
				style={{
					paddingTop: '100px',
				}}
			>
				<img
					src={workTable}
					alt=''
					style={{
						margin: 'auto',
					}}
				/>
			</div>
		</>
	);
}
