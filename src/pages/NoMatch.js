import '../App.css';
import notFound from '../assets/images/404-er.webp';

export default function NoMatch() {
	return (
		<>
			<div
				className='d-flex flex-column align-items-center justify-center'
				style={{
					paddingTop: '32px',
				}}
			>
				<img
					src={notFound}
					alt=''
					style={{
						maxWidth: '400px',
					}}
				/>
				<h1>Xin lỗi, chúng tôi không tim thấy trang này.</h1>
			</div>
		</>
	);
}
