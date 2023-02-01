import { useEffect } from 'react';
import sidebarStyles from '../assets/styles/Sidebar.module.scss';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import { ThemeContext } from '../contextStore/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, selectCount } from '../store/counter';
import { selectUser } from '../store/userAuth';
import api from '../services/index';

export default function SideBar() {
	const Theme = useContext(ThemeContext);
	function setLoggedUser() {
		console.log('will set');
		Theme.setUserLogged({ name: 'Tuan', token: 'Bearer 8934jkljsdf89u' });
	}
	useEffect(() => {
		console.log('rendered');
	});
	const handleLogin = async () => {
		const body = {
			login: 'xc-0001',
			password: '123456',
		};
		const res = await api.user.loginUser(body);

		if (!res) {
			console.log('Đăng nhập thất bại. Liên hệ IT để được hỗ trợ. Code 01');
		}
		try {
			if (res.status && res.status > 199 && res.status < 400) {
				console.log(res, 'failed');
			} else {
				const msg = 'Đăng nhập thất bại: ' + (res.data.message || String(res)) + ' Code 02';
				console.log(msg);
			}
		} catch (error) {
			const msg = 'Đăng nhập thất bại: ' + String(error) + ' Code 03';
			console.log(msg);
		}
	};
	const count = useSelector(selectCount);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	return (
		<div className={sidebarStyles.container}>
			<p>{Theme.user ? Theme.user.name : '---'}</p>
			<Button variant='contained' onClick={setLoggedUser}>
				Hello World
			</Button>
			<p>
				{' '}
				<small>
					You are running this application in <b>{process.env.REACT_APP_API_BASE_URL}</b> mode.
				</small>
			</p>
			<p>{count}</p>
			<p>{user.user?.name}</p>
			<Button variant='contained' onClick={() => dispatch(increment())}>
				+
			</Button>
			<br /> <br />
			<Button variant='contained' onClick={() => dispatch(decrement())}>
				-
			</Button>{' '}
			<br /> <br />
			<Button variant='contained' onClick={handleLogin}>
				Loggin
			</Button>
		</div>
	);
}
