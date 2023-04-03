import '../App.css';
// import notFound from '../assets/images/404-page.png';

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
					src='https://cdn.pixabay.com/photo/2021/07/21/12/49/error-6482984_960_720.png'
					alt=''
					style={{
						maxWidth: '400px',
					}}
				/>
				<h1>Sorry, We cannot found this page :(</h1>
			</div>
		</>
	);
}
