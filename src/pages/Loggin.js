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

// helpers
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
	const [formLogin, setformLogin] = useState();
	const [formError, setFormError] = useState({});

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
		setformLogin({ ...formLogin, [field]: e.target.value });
	};
	const handleLogin = () => {
		setFormError({});
		setLoadingLogin(true);
		let objError = {};
		if (!String(formLogin.email).trim()) {
			objError = { ...objError, email: 'required' };
		}
		if (!String(formLogin.password).trim()) {
			objError = { ...objError, password: 'required' };
		}
		if (Object.keys(objError).length) {
			setFormError(objError);
			setLoadingLogin(false);
			return;
		}
		setTimeout(() => {
			if (formLogin.email === 'admin@gmail.com' && formLogin.password === '123456') {
				if (rememberMe) {
					setCookie('email', String(formLogin.email).trim(), 30, true);
					setCookie('password', String(formLogin.password).trim(), 30, true);
				} else {
					deleteCookie('email');
					deleteCookie('password');
				}
				const fakeResult = {
					name: 'Admin',
					phone: '0989898989',
					email: 'admin@gmail.com',
					avatar: null,
					token: 'randomedToken',
				};
				setCookie('token', String(fakeResult.token).trim(), 30, true);
				dispatch(setUser(fakeResult));
				dispatch(setToken(fakeResult.token));
				setLoadingLogin(false);
				navigate('/');
				return;
			}
			enqueueSnackbar('Thông tin đăng nhập không chính xác. Vui lòng thử lại', { variant: 'error' });
			setLoadingLogin(false);
		}, 2000);
	};
	const handleLoginKeyup = event => {
		event.preventDefault();
		if (event.keyCode === 13) {
			handleLogin();
		}
	};
	useEffect(() => {
		const email = getCookie('email', true);
		const password = getCookie('password', true);
		if (email && password) {
			setformLogin({ email, password });
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
					<AppBar position='static' elevation={0} color={'text'}>
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor='secondary'
							textColor='inherit'
							variant='fullWidth'
							aria-label='full width tabs example'
						>
							<Tab label='Đăng Nhập' {...a11yProps(0)} />
							<Tab label='Đăng Ký' {...a11yProps(1)} />
						</Tabs>
					</AppBar>
					<SwipeableViews
						axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
						index={value}
						onChangeIndex={handleChangeIndex}
					>
						<TabPanel value={value} index={0} dir={theme.direction}>
							<div className='d-flex flex-column'>
								<FormControl fullWidth={true} sx={{ m: '12px 0', p: 0 }} variant='outlined'>
									<TextField
										error={!!formError.email}
										helperText={getErrorMessage(formError.email)}
										type='text'
										placeholder='Tài khoản'
										label='Tài khoản'
										onChange={e => {
											handlerFormLoginInput(e, 'email');
										}}
										fullWidth={true}
									/>
								</FormControl>

								<FormControl fullWidth={true} sx={{ m: '12px 0', p: 0 }} variant='outlined'>
									<TextField
										error={!!formError.password}
										helperText={getErrorMessage(formError.password)}
										id='outlined-adornment-password'
										type={showPassword ? 'text' : 'password'}
										placeholder='Mật khẩu'
										label='Mật khẩu'
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
									label='Ghi nhớ tài khoản'
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
									{loadingLogin ? <CircularProgress color='grey' size={24} sx={{ margin: 0 }} /> : <>Đăng nhập</>}
								</Button>
							</div>
						</TabPanel>
						<TabPanel value={value} index={1} dir={theme.direction}>
							<div className='d-flex flex-column'>
								<FormControl fullWidth={true} sx={{ m: '12px 0', p: 0 }} variant='outlined'>
									<TextField type='text' placeholder='Họ tên' label='Họ tên' fullWidth={true} />
								</FormControl>
								<FormControl fullWidth={true} sx={{ m: '12px 0', p: 0 }} variant='outlined'>
									<TextField type='text' placeholder='Email' label='Email' fullWidth={true} />
								</FormControl>
								<FormControl fullWidth={true} sx={{ m: '12px 0', p: 0 }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-password2'>Mật khẩu</InputLabel>
									<OutlinedInput
										id='outlined-adornment-password2'
										type={showPassword ? 'text' : 'password'}
										placeholder='Mật khẩu'
										label='Mật khẩu'
										fullWidth={true}
										endAdornment={
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
										}
									/>
								</FormControl>

								<Button
									variant='contained'
									className='no-box-shadow'
									size='large'
									sx={{
										display: 'block',
										marginTop: 2,
										whiteSpace: 'nowrap',
										textTransform: 'none',
									}}
								>
									Đăng ký
								</Button>
							</div>
						</TabPanel>
					</SwipeableViews>
				</Box>
			</div>
		</div>
	);
}
