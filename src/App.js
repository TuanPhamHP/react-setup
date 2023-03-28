import './App.css';
import './assets/styles/App.scss';

import Sidebar from './components/Sidebar';
import ProtectedRouteF from './components/ProtectedRoute';
import LayoutStyles from './assets/styles/Layout.module.scss';

// Redux

import { useSelector, useDispatch } from 'react-redux';
import { setUser, selectUser } from './store/userAuth';
import { setListAlStyles, setListAlSystems } from './store/internal';
import { useSnackbar } from 'notistack';
import api from './services/index';

// Route & Pages

import Home from './pages/Home';
import HomePage from './pages/HomePage';
import ChatDetail from './pages/Chat/Detail';
import Login from './pages/Login';
import Error from './pages/Error';
import NoMatch from './pages/NoMatch';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';

// helpers
import { getSession } from './helpers/customizeSession';
import { getCookie } from './helpers/customizeCookie';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect } from 'react';
function App() {
	const authUser = useSelector(selectUser);
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	const getListAlTypes = async () => {
		const res = await api.aluminum.getListAlTypes({ pagination: false });
		if (!res) {
			enqueueSnackbar('Có lỗi khi lấy danh sách kiểu nhôm', { variant: 'error' });
			return;
		}
		try {
			if (!res.status || res.status > 399) {
				enqueueSnackbar(res.statusText, { variant: 'error' });
			} else {
				dispatch(setListAlStyles(res.data.data));
			}
		} catch (error) {
			enqueueSnackbar(`Có lỗi khi lấy danh sách kiểu nhôm: ${error}`, { variant: 'error' });
		}
	};
	const getListAlProfiles = async () => {
		const res = await api.aluminum.getListAlProfiles({ pagination: false });
		if (!res) {
			enqueueSnackbar('Có lỗi khi lấy danh sách kiểu nhôm', { variant: 'error' });
			return;
		}
		try {
			if (!res.status || res.status > 399) {
				enqueueSnackbar(res.statusText, { variant: 'error' });
			} else {
				dispatch(setListAlSystems(res.data.data));
			}
		} catch (error) {
			enqueueSnackbar(`Có lỗi khi lấy danh sách kiểu nhôm: ${error}`, { variant: 'error' });
		}
	};
	useEffect(() => {
		if (authUser.user) {
			getListAlTypes();
			getListAlProfiles();
		}
	}, [authUser]);
	const ProtectedRoute = ({ expectedPath, redirectPath = '/login', children }) => {
		const currentToken = getCookie('token', true) || getSession('token', true);
		const dispatch = useDispatch();
		const navigate = useNavigate();
		const location = useLocation();

		const getUser = async token => {
			const res = await api.user.getUserInfo(token);

			if (!res) {
				console.log('Đăng nhập thất bại. Liên hệ IT để được hỗ trợ. Code 01');

				navigate(redirectPath);
				return;
			}

			try {
				if (res.status && res.status > 199 && res.status < 400) {
					dispatch(setUser({ ...res.data.data, token }));
					return children ? children : <Outlet />;
				} else {
					dispatch(setUser(null));
					const msg = 'Đăng nhập thất bại: ' + (res.data.message || String(res)) + ' Code 02';
					console.log(msg);
					navigate(redirectPath);
					return;
				}
			} catch (error) {
				const msg = 'Đăng nhập thất bại: ' + String(error) + ' Code 03';

				console.log(msg);

				navigate(redirectPath);
				return;
			}
		};
		// useEffect(() => {
		// 	first

		// 	return () => {
		// 		second
		// 	}
		// }, [third])
		if (authUser.user) {
			// logged
			return children ? children : <Outlet />;
		} else {
			if (currentToken) {
				getUser(currentToken);
			} else {
				return <Navigate to={redirectPath} replace />;
			}
		}
	};

	return (
		<div className={`layout `}>
			<div className={`main ${LayoutStyles.container}`}>
				<Router>
					{authUser.user ? <Sidebar /> : <></>}

					<div className='ref' style={{ flex: 1 }}>
						<Routes>
							<Route
								exact
								path='/'
								element={
									<ProtectedRoute>
										<HomePage />
									</ProtectedRoute>
								}
								errorElement=<Error />
							/>

							<Route
								path='/chat/:id'
								element={
									<ProtectedRoute expectedPath='/chat/:id'>
										<ChatDetail />
									</ProtectedRoute>
								}
								errorElement=<Error />
							/>
							<Route
								path='/home'
								element={
									<ProtectedRoute>
										<Home />
									</ProtectedRoute>
								}
								errorElement=<Error />
							/>
							<Route path='/login' element={<Login />} errorElement=<Error /> />

							<Route
								path='*'
								element={
									<ProtectedRoute>
										<NoMatch />
									</ProtectedRoute>
								}
							></Route>
						</Routes>
					</div>
				</Router>
			</div>
		</div>
	);
}

export default App;
