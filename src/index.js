import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import store from './store/index';
import { SnackbarProvider } from 'notistack';

// Redux

import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, setUser, selectUser } from './store/userAuth';
import api from './services/index';

// Route & Pages
import App from './App';
import Login from './pages/Login';
import Error from './pages/Error';
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	BrowserRouter,
	Navigate,
	Outlet,
	useNavigate,
} from 'react-router-dom';

// helpers
import { getCookie } from './helpers/customizeCookie';

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
				dispatch(setUser(res.data.data));
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
			getUser('currentToken');
		} else {
			return <Navigate to={redirectPath} replace />;
		}
	}
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
	},
	{
		path: '/login',
		element: <Login />,
		errorElement: <Error />,
	},
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
	palette: {
		model: {
			main: '#ff0000',
			constrastText: '#000000',
		},
		black: '#000000',
		dark: {
			main: '#222222',
		},
		white: {
			main: '#ffffff',
		},
		grey: {
			main: '#ebebeb',
		},
		primary: {
			main: '#1976D2',
			mainLight2: '#1976d242',
			contrastText: '#ffffff',
			white: '#ffffff',
			black: '#000000',
		},
		pagination: {
			main: '#222222',

			contrastText: '#ffffff',
		},
		secondary: {
			main: '#1976D2',
		},
		text: {
			primary: '#222222',
			white: '#ffffff',
			black: '#000',
			main: '#222222',
		},
		error: {
			main: '#D11313',
		},
		semantic: {
			error: {
				main: '#D11313',
			},
			success: '#3AC430',
			info: '#0569FF',
			warning: '#FE9705',
		},
		background: {
			white: '#fff',
		},
		buttonCancel: {
			main: '#D11313',
		},
	},
});
root.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<SnackbarProvider maxSnack={3} autoHideDuration={4000}>
				{/* <React.StrictMode>
			
				</React.StrictMode> */}
				<App />
			</SnackbarProvider>
		</ThemeProvider>
	</Provider>
);

reportWebVitals();
