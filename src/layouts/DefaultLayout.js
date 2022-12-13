import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import LayoutStyles from '../assets/styles/Layout.module.scss';

export default function DefaultLayout({ children }) {
	return (
		<div className={`layout ${LayoutStyles.container}`}>
			<div className='main'>
				<Header />
				{children}
			</div>
		</div>
	);
}
