import styles from '../assets/styles/Login.module.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import api from '../services/index';

// helpers
import { setSession } from '../helpers/customizeSession';
import { getCookie, setCookie, deleteCookie } from '../helpers/customizeCookie';
import { getErrorMessage } from '../helpers/FormatnParse';

//redux
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../store/userAuth';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography component={'span'}>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

export default function FullWidthTabs() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [loadingLogin, setLoadingLogin] = useState(false);
	const [value, setValue] = useState(0);
	const [rememberMe, setRememberMe] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [formLogin, setFormLogin] = useState({ username: '', password: '' });
	const [formRegistration, setFormRegistration] = useState({ name: '', email: '', password: '' });
	const [formError, setFormError] = useState({});
	const [formErrorRegis, setFormErrorRegis] = useState({});

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleChangeIndex = index => {
		setValue(index);
	};
	const handleClickShowPassword = () => setShowPassword(show => !show);

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};
	const handlerFormLoginInput = (e, field) => {
		setFormLogin({ ...formLogin, [field]: e.target.value });
	};
	const handlerFormRegisInput = (e, field) => {
		setFormRegistration({ ...formRegistration, [field]: e.target.value });
	};
	const handleRegis = () => {
		setFormErrorRegis({});
		setLoadingLogin(true);
		let objError = {};
		if (!String(formRegistration.name).trim()) {
			objError = { ...objError, name: 'required' };
		}
		if (!String(formRegistration.email).trim()) {
			objError = { ...objError, email: 'required' };
		}
		if (!String(formRegistration.password).trim()) {
			objError = { ...objError, password: 'required' };
		}
		if (Object.keys(objError).length) {
			setFormErrorRegis(objError);
			setLoadingLogin(false);
			return;
		}
		setTimeout(() => {
			if (formRegistration.email === 'admin@gmail.com' && formRegistration.password === '123456') {
				const fakeResult = {
					name: 'Admin',
					phone: '0989898989',
					email: 'admin@gmail.com',
					avatar: null,
					token: 'randomedToken',
				};
				if (rememberMe) {
					setCookie('email', String(formErrorRegis.email).trim(), 30, true);
					setCookie('password', String(formErrorRegis.password).trim(), 30, true);
					setCookie('token', String(fakeResult.token).trim(), 30, true);
				} else {
					deleteCookie('email');
					deleteCookie('password');
					deleteCookie('token');
				}

				setSession('token', String(fakeResult.token).trim(), true);
				dispatch(setUser(fakeResult));
				dispatch(setToken(fakeResult.token));
				setLoadingLogin(false);
				navigate('/');
				return;
			}
			enqueueSnackbar('Login failed try again', { variant: 'error' });
			setLoadingLogin(false);
		}, 2000);
	};
	const handleLogin = async () => {
		setFormError({});
		setLoadingLogin(true);
		let objError = {};
		if (!String(formLogin.username).trim()) {
			objError = { ...objError, username: 'required' };
		}
		if (!String(formLogin.password).trim()) {
			objError = { ...objError, password: 'required' };
		}
		if (Object.keys(objError).length) {
			setFormError(objError);
			setLoadingLogin(false);
			return;
		}
		const body = {
			username: formLogin.username,
			password: formLogin.password,
		};
		const res = await api.user.loginUser(body);
		setLoadingLogin(false);
		if (!res) {
			enqueueSnackbar('Login Failed. Code 01', { variant: 'error' });
		}
		try {
			if (res.status && res.status > 199 && res.status < 400) {
				console.log(res);
				const dataObj = res.data.data;
				if (rememberMe) {
					setCookie('email', String(formLogin.username).trim(), 30, true);
					setCookie('password', String(formLogin.password).trim(), 30, true);
					setCookie('token', String(dataObj.access_token).trim(), 30, true);
				} else {
					deleteCookie('email');
					deleteCookie('password');
					deleteCookie('token');
				}

				setSession('token', String(dataObj.access_token).trim(), true);
				dispatch(setUser(dataObj.user));
				dispatch(setToken(dataObj.access_token));
				setLoadingLogin(false);
				navigate('/');
				return;
			} else {
				const msg = 'Login Failed: ' + (res.data.message || String(res)) + ' Code 02';
				enqueueSnackbar(msg, { variant: 'error' });
			}
		} catch (error) {
			const msg = 'Login Failed: ' + String(error) + ' Code 03';
			console.log(msg);
		}
	};
	const handleLoginKeyup = event => {
		event.preventDefault();
		if (event.keyCode === 13) {
			handleLogin();
		}
	};
	const handleUsernameEnter = event => {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.querySelector('#loginPassword').focus();
		}
	};
	useEffect(() => {
		const email = getCookie('email', true);
		const password = getCookie('password', true);
		if (email && password) {
			setFormLogin({ email, password });
		}
	}, []);

	return (
		<div
			className={`${styles.loginPage}`}
			style={{
				backgroundColor: theme.palette.primary.mainLight2,
			}}
		>
			<div
				className={`${styles.formLoginContainer} box-shadow-m1`}
				style={{
					backgroundColor: theme.palette.primary.white,
				}}
			>
				<Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
					<SwipeableViews
						axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
						index={value}
						onChangeIndex={handleChangeIndex}
					>
						<TabPanel value={value} index={0} dir={theme.direction}>
							<div className='d-flex flex-column'>
								<FormControl fullWidth={true} sx={{ m: '12px 0', p: 0 }} variant='outlined'>
									<TextField
										error={!!formError.username}
										helperText={getErrorMessage(formError.username)}
										type='text'
										placeholder='Username'
										label='Username'
										value={formLogin.username}
										onKeyUp={handleUsernameEnter}
										onChange={e => {
											handlerFormLoginInput(e, 'username');
										}}
										fullWidth={true}
									/>
								</FormControl>

								<FormControl fullWidth={true} sx={{ m: '12px 0', p: 0 }} variant='outlined'>
									<TextField
										error={!!formError.password}
										id='loginPassword'
										helperText={getErrorMessage(formError.password)}
										type={showPassword ? 'text' : 'password'}
										value={formLogin.password}
										placeholder='Password'
										label='Password'
										fullWidth={true}
										onChange={e => {
											handlerFormLoginInput(e, 'password');
										}}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<IconButton
														aria-label='toggle password visibility'
														onClick={handleClickShowPassword}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											),
										}}
										onKeyUp={handleLoginKeyup}
									/>
								</FormControl>
								<FormControlLabel
									control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
									label='Remember me'
								/>
								<Button
									variant='contained'
									className='no-box-shadow'
									size='large'
									sx={{
										display: 'flex',
										alignItems: 'center',
										marginTop: 2,
										whiteSpace: 'nowrap',
										textTransform: 'none',
									}}
									onClick={handleLogin}
								>
									{loadingLogin ? <CircularProgress color='grey' size={24} sx={{ margin: 0 }} /> : <>Login</>}
								</Button>
							</div>
						</TabPanel>
						<TabPanel value={value} index={1} dir={theme.direction}>
							<div className='d-flex flex-column'>
								<FormControl fullWidth={true} sx={{ m: '12px 0', p: 0 }} variant='outlined'>
									<TextField
										error={!!formErrorRegis.name}
										helperText={getErrorMessage(formErrorRegis.name)}
										value={formRegistration.name}
										type='text'
										placeholder='Họ tên'
										label='Họ tên'
										fullWidth={true}
										onChange={e => {
											handlerFormRegisInput(e, 'name');
										}}
									/>
								</FormControl>
								<FormControl fullWidth={true} sx={{ m: '12px 0', p: 0 }} variant='outlined'>
									<TextField
										type='text'
										placeholder='Email'
										label='Email'
										fullWidth={true}
										error={!!formErrorRegis.email}
										helperText={getErrorMessage(formErrorRegis.email)}
										value={formRegistration.email}
										onChange={e => {
											handlerFormRegisInput(e, 'email');
										}}
									/>
								</FormControl>
								<FormControl fullWidth={true} sx={{ m: '12px 0', p: 0 }} variant='outlined'>
									<TextField
										error={!!formErrorRegis.password}
										helperText={getErrorMessage(formErrorRegis.password)}
										type={showPassword ? 'text' : 'password'}
										placeholder='Mật khẩu'
										label='Mật khẩu'
										fullWidth={true}
										value={formRegistration.password}
										onChange={e => {
											handlerFormRegisInput(e, 'password');
										}}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<IconButton
														aria-label='toggle password visibility'
														onClick={handleClickShowPassword}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</FormControl>
								<Button
									variant='contained'
									className='no-box-shadow'
									size='large'
									sx={{
										display: 'flex',
										alignItems: 'center',
										marginTop: 2,
										whiteSpace: 'nowrap',
										textTransform: 'none',
									}}
									onClick={handleRegis}
								>
									{loadingLogin ? <CircularProgress color='grey' size={24} sx={{ margin: 0 }} /> : <>Đăng ký</>}
								</Button>
							</div>
						</TabPanel>
					</SwipeableViews>
				</Box>
			</div>
		</div>
	);
}
