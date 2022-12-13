import logo from './logo.svg';
import './App.css';
import './assets/styles/App.scss';

import { useSnackbar } from 'notistack';
import Header from './components/Header';
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
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useNavigate } from 'react-router-dom';

// helpers
import { getCookie } from './helpers/customizeCookie';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
function App() {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleClick = () => {
		enqueueSnackbar('I love hooks', { variant: 'success' });
	};
	const ProtectedRoute = ({ redirectPath = '/login', children }) => {
		const authUser = useSelector(selectUser);
		const currentToken = getCookie('token', true);
		const dispatch = useDispatch();
		const navigate = useNavigate();

		const getUser = async token => {
			const res = await api.user.getUserInfo(token);

			if (!res) {
				console.log('Đăng nhập thất bại. Liên hệ IT để được hỗ trợ. Code 01');
				return <Navigate to={redirectPath} replace />;
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
				return <Navigate to={redirectPath} replace />;
			}
		};
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
					<Header />
					<Routes>
						<Route exact path='/' element={<HomePage />} errorElement=<Error /> />
						<Route path='/cong-trinh' element={<ConstructionsList />} errorElement=<Error /> />
						<Route path='/cong-trinh/them-moi' element={<ConstructionsCreate />} errorElement=<Error /> />
						<Route path='/cong-trinh/:id' element={<ConstructionsDetail />} errorElement=<Error /> />
						<Route path='/mau-cua' element={<DoorModels />} errorElement=<Error /> />
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
