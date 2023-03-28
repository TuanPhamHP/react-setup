import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import LayoutStyles from '../assets/styles/Layout.module.scss';

export default function DefaultLayout({ children }) {
	return (
		<div className={`layout ${LayoutStyles.container}`}>
			<div className='main'>
				<Sidebar />
				{children}
			</div>
		</div>
	);
}
