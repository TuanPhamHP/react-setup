import './App.css';
import './assets/styles/App.scss';

import Header from './components/Header';
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
import ConstructionsList from './pages/Constructions/List';
import ConstructionsDetail from './pages/Constructions/Detail';
import ConstructionsCreate from './pages/Constructions/Create';

import DoorModelsList from './pages/DoorModels/List';

import Supplies from './pages/Supplies/Supplies';
import SuppliesAl from './pages/Supplies/Al';
import SuppliesGlass from './pages/Supplies/Glass';
import SuppliesAccessory from './pages/Supplies/Accessory';
import SuppliesExtra from './pages/Supplies/Extra';

import EmployeesList from './pages/Employees/List';

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
	const getListAlStyles = async () => {
		const res = await api.aluminum.getListAlStyles({ pagination: false });
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
	const getListAlSystems = async () => {
		const res = await api.aluminum.getListAlSystems({ pagination: false });
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
			getListAlStyles();
			getListAlSystems();
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
		<div className={`layout ${LayoutStyles.container}`}>
			<div className='main'>
				<Router>
					{authUser.user ? <Header /> : <></>}

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
							path='/cong-trinh'
							element={
								<ProtectedRoute>
									<ConstructionsList />
								</ProtectedRoute>
							}
							errorElement=<Error />
						/>
						<Route
							path='/cong-trinh/them-moi'
							element={
								<ProtectedRoute expectedPath='/cong-trinh/them-moi'>
									<ConstructionsCreate />
								</ProtectedRoute>
							}
							errorElement=<Error />
						/>
						<Route
							path='/cong-trinh/:id'
							element={
								<ProtectedRoute expectedPath='/cong-trinh/:id'>
									<ConstructionsDetail />
								</ProtectedRoute>
							}
							errorElement=<Error />
						/>
						<Route
							path='/mau-cua'
							element={
								<ProtectedRoute expectedPath='/mau-cua'>
									<DoorModelsList />
								</ProtectedRoute>
							}
							errorElement=<Error />
						/>
						<Route
							path='/vat-tu'
							element={
								<ProtectedRoute>
									<Supplies />
								</ProtectedRoute>
							}
							errorElement=<Error />
						>
							<Route
								path='nhom'
								element={
									<ProtectedRoute>
										<SuppliesAl />
									</ProtectedRoute>
								}
								errorElement=<Error />
							/>
							<Route
								path='kinh'
								element={
									<ProtectedRoute>
										<SuppliesGlass />
									</ProtectedRoute>
								}
								errorElement=<Error />
							/>
							<Route
								path='phu-kien'
								element={
									<ProtectedRoute>
										<SuppliesAccessory />
									</ProtectedRoute>
								}
								errorElement=<Error />
							/>
							<Route
								path='vat-tu-phu'
								element={
									<ProtectedRoute>
										<SuppliesExtra />
									</ProtectedRoute>
								}
								errorElement=<Error />
							/>
						</Route>

						<Route
							path='/nhan-vien'
							element={
								<ProtectedRoute>
									<EmployeesList />
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
				</Router>
			</div>
		</div>
	);
}

export default App;
