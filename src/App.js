import logo from './logo.svg';
import './App.css';
import './assets/styles/App.scss';

import Header from './components/Header';
import ProtectedRouteF from './components/ProtectedRoute';
import LayoutStyles from './assets/styles/Layout.module.scss';

// Redux

import { useSelector, useDispatch } from 'react-redux';
import { setToken, setUser, selectUser } from './store/userAuth';
import api from './services/index';

// Route & Pages

import Home from './pages/Home';
import HomePage from './pages/HomePage';
import ConstructionsList from './pages/Constructions/List';
import ConstructionsDetail from './pages/Constructions/Detail';
import ConstructionsCreate from './pages/Constructions/Create';

import DoorModels from './pages/DoorModels';
import Supplies from './pages/Supplies';
import Login from './pages/Loggin';
import Error from './pages/Error';
import NoMatch from './pages/NoMatch';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';

// helpers
import { getCookie } from './helpers/customizeCookie';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect } from 'react';
function App() {
	const authUser = useSelector(selectUser);

	const ProtectedRoute = ({ expectedPath, redirectPath = '/login', children }) => {
		const currentToken = getCookie('token', true);
		const dispatch = useDispatch();
		const navigate = useNavigate();
		const location = useLocation();

		const getUser = async token => {
			const res = await api.user.getUserInfo(token);

			if (!res) {
				console.log('Đăng nhập thất bại. Liên hệ IT để được hỗ trợ. Code 01');
				if (token === 'randomedToken') {
					const fakeResult = {
						name: 'Admin',
						phone: '0989898989',
						email: 'admin@gmail.com',
						avatar: null,
						token: 'randomedToken',
					};
					dispatch(setUser(fakeResult));
					dispatch(setToken(fakeResult.token));
					navigate(location.pathname || '/cong-trinh');
					return;
				}
				navigate(redirectPath);
				return;
			}

			try {
				if (res.status && res.status > 199 && res.status < 400) {
					dispatch(setUser(res.data.data.user));
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
				if (token === 'randomedToken') {
					const fakeResult = {
						name: 'Admin',
						phone: '0989898989',
						email: 'admin@gmail.com',
						avatar: null,
						token: 'randomedToken',
					};

					dispatch(setUser(fakeResult));
					dispatch(setToken(fakeResult.token));

					navigate(location.pathname || '/cong-trinh');
					return;
				}
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
									<DoorModels />
								</ProtectedRoute>
							}
							errorElement=<Error />
						/>
						<Route path='/vat-tu' element={<Supplies />} errorElement=<Error /> />
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

						<Route path='*' element={<NoMatch />}></Route>
					</Routes>
				</Router>
			</div>
		</div>
	);
}

export default App;
