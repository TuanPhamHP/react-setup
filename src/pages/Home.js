import '../App.css';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCount } from '../store/counter';

export default function Home() {
	const count = useSelector(selectCount);
	return (
		<>
			<div className='App'>Alohahaha</div>
			<Link to={`/home/1`}>Link to detail</Link>
			<p>{count}</p>
			<div id='detail'>
				<Outlet />
			</div>
		</>
	);
}
