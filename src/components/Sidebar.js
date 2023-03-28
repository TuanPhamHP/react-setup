import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../assets/styles/Header.module.scss';
import LogoutDialog from './Dialog/LogoutDialog';
import ChatTabHeader from './Chat/ChatTabHeader';
import ChatRoomSidebar from './Chat/ChatRoomSidebar';
// DRAWER
import Drawer from '@mui/material/Drawer';
// redux
import { selectUser } from '../store/userAuth';
import { useSelector, useDispatch } from 'react-redux';

function ResponsiveAppBar() {
	const [state, setState] = React.useState({
		left: false,
	});

	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const [openDialogLogout, setOpenDialogLogout] = React.useState(false);

	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const toggleDrawer = (anchor, open) => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const handleClickLogout = () => {
		setOpenDialogLogout(true);
		handleCloseUserMenu();
	};
	const handleNavigateSub = () => {
		navigate('/nhan-vien');
		handleCloseUserMenu();
	};
	const isActiveNavRaw = currentPage => {
		return Array.isArray(currentPage.active) && currentPage.active.includes(location.pathname);
	};

	return (
		<AppBar
			position='sticky'
			className={styles.headerContainer}
			sx={{
				width: '340px',
				height: '100vh',
				display: 'flex',
				padding: 0,
				flexDirection: 'row',
				bgcolor: 'white.main',
				boxShadow: 'none',
				borderRight: '1px solid #d5d5d5',
			}}
		>
			<div style={{ padding: '0px' }}>
				<Drawer
					sx={{
						width: 70,
						height: '100%',
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: 70,
							boxSizing: 'border-box',
							bgcolor: 'primary.main',
							position: 'relative',
						},
					}}
					variant='permanent'
					anchor='left'
				>
					<Toolbar disableGutters sx={{ display: 'block', padding: '16px 2px' }}>
						{/* DESKTOP */}
						<Box
							sx={{
								flexGrow: 0,
								margin: 'auto',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
							}}
						>
							<Tooltip title='Tùy chỉnh'>
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt={user.user?.username || 'U'} src={user.user?.avatar} sx={{ width: 56, height: 56 }} />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id='menu-appbar'
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem onClick={handleCloseUserMenu} sx={{ borderBottom: '1px solid #ebebeb' }}>
									<Typography textAlign='center'>Hi, {user.user?.username} </Typography>
								</MenuItem>

								<MenuItem onClick={handleClickLogout}>
									<Typography textAlign='center' color={'red'}>
										Logout
									</Typography>
								</MenuItem>
							</Menu>
							<ListItemButton sx={{ padding: '12px 0', marginTop: '32px' }}>
								<ListItemIcon className='d-flex align-items-center justify-center my-2'>
									<ChatRoundedIcon sx={{ color: '#fff', fontSize: '32px', display: 'block', margin: 'auto' }} />
								</ListItemIcon>
							</ListItemButton>
						</Box>
					</Toolbar>
				</Drawer>
			</div>
			<div style={{ flex: 1 }}>
				<ChatTabHeader />
				<ChatRoomSidebar />
			</div>
			<LogoutDialog openDialog={openDialogLogout} setOpenDialog={setOpenDialogLogout} />
		</AppBar>
	);
}
export default ResponsiveAppBar;
