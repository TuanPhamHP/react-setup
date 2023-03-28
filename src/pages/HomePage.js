import '../App.css';
import workTable from '../assets/images/work-table.svg';

export default function Home() {
	return (
		<>
			<div className='d-flex flex-column align-center justify-content-center h-100 w-100' style={{ height: '100vh' }}>
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
