import './App.css';
import './assets/styles/App.scss';

import Sidebar from './components/Sidebar';
import LayoutStyles from './assets/styles/Layout.module.scss';

// Redux

import { useSelector, useDispatch } from 'react-redux';
import { setUser, selectUser } from './store/userAuth';
import { setListRoom, setRoomSetupPhase } from './store/internal';
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

// firebase
import { getDocs, collection, query, where, onSnapshot } from '@firebase/firestore';
import firestore from './plugins/firebase_setup';

function App() {
	const authUser = useSelector(selectUser);
	const dispatch = useDispatch();
	const fetchLm = async () => {
		const ar = [];
		const q = query(collection(firestore, 'conversations'));
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach(doc => {
			ar.push(doc.data());
		});
		dispatch(setRoomSetupPhase(1));
		dispatch(setListRoom(ar));
	};
	useEffect(() => {
		if (authUser.user) {
		}
	}, [authUser]);
	useEffect(() => {
		onSnapshot(collection(firestore, 'conversations'), snapshot => {});
		fetchLm();
	}, []);
	const ProtectedRoute = ({ expectedPath, redirectPath = '/login', children }) => {
		const currentToken = getCookie('token', true) || getSession('token', true);
		const dispatch = useDispatch();
		const navigate = useNavigate();
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

		if (authUser.user) {
			// logged
			return children ? children : <Outlet />;
		} else {
			setUser({
				name: 'Admin',
				email: 'admin@gmail.com',
				token: 'faketoken',
			});
			return children ? children : <Outlet />;
			// real auth but disabled
			// if (currentToken) {
			// 	getUser(currentToken);
			// } else {
			// 	return <Navigate to={redirectPath} replace />;
			// }
		}
	};

	return (
		<div className={`layout `}>
			<div className={`main ${LayoutStyles.container}`}>
				<Router>
					{/* {authUser.user ? <Sidebar /> : <></>} */}
					<Sidebar />

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
								exact
								path='/chat'
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
