import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, BrowserRouter, useLocation } from 'react-router-dom';
import styles from '../assets/styles/Header.module.scss';
import LogoutDialog from '../components/Dialog/LogoutDialog';
// redux
import { selectUser } from '../store/userAuth';
import { useSelector, useDispatch } from 'react-redux';

const pages = [
	// { name: 'Công trình', link: '/cong-trinh', active: ['/cong-trinh'] },
	{ name: 'Mẫu cửa', link: '/mau-cua', active: ['/mau-cua'] },
	{ name: 'Vật tư', link: '/vat-tu', active: ['/vat-tu'] },
	{ name: 'Hướng dẫn', link: '/huong-dan', active: ['/huong-dan'] },
	{ name: 'Cài đặt', link: '/cai-dat', active: ['/cai-dat'] },
];
const instructionSub = [
	{ name: 'Danh sách', link: '/cong-trinh', active: ['/cong-trinh'] },
	{ name: 'Thêm mới', link: '/cong-trinh/them-moi', active: ['/cong-trinh/them-moi'] },
];

function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [anchorElConstrcution, setAnchorElConstrcution] = React.useState(null);

	const [openDialogLogout, setOpenDialogLogout] = React.useState(false);

	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const location = useLocation();

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};
	const handleOpenConstructionMenu = event => {
		setAnchorElConstrcution(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const handleClickLogout = () => {
		setOpenDialogLogout(true);
		handleCloseUserMenu();
	};
	const handleCloseConstructionMenu = () => {
		setAnchorElConstrcution(null);
	};
	const isActiveNavRaw = currentPage => {
		return Array.isArray(currentPage.active) && currentPage.active.includes(location.pathname);
	};
	const isActiveNav = currentPage => {
		return isActiveNavRaw(currentPage)
			? {
					borderBottom: `2px solid #fff`,
					padding: 0,
			  }
			: {
					borderBottom: `2px solid transparent`,
					padding: 0,
			  };
	};
	return (
		<AppBar position='sticky' className={styles.headerContainer}>
			<Container maxWidth='false'>
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant='h6'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'text.white',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>
					{/* MOBILE */}
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map(page => (
								<MenuItem key={page.name} onClick={handleCloseNavMenu} sx={isActiveNav(page)}>
									<Link to={page.link} className={`${styles.navigateLink}`}>
										<Typography textAlign='center'>{page.name}</Typography>
									</Link>
								</MenuItem>
							))}
						</Menu>
					</Box>
					{/* DESKTOP */}
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant='h5'
						noWrap
						component='a'
						href=''
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
						<MenuItem
							aria-controls='menu-appbar'
							onClick={handleOpenConstructionMenu}
							sx={{
								...isActiveNav({
									name: 'Công trình',
									link: '/cong-trinh',
									active: ['/cong-trinh', '/cong-trinh/them-moi'],
								}),
								padding: '10px 24px',
							}}
						>
							Công trình
						</MenuItem>
						<Menu
							sx={{ mt: '45px', padding: '12px ' }}
							id='menu-construction'
							anchorEl={anchorElConstrcution}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElConstrcution)}
							onClose={handleCloseConstructionMenu}
						>
							{instructionSub.map(page => (
								<MenuItem key={page.name} onClick={handleCloseConstructionMenu} sx={isActiveNav(page, true)}>
									<Link
										to={page.link}
										className={`${styles.navigateLinkDropdown} ${
											isActiveNavRaw(page) ? styles.navigateLinkDropdownActive : ''
										}`}
									>
										{page.name}
									</Link>
								</MenuItem>
							))}
						</Menu>

						{pages.map(page => (
							<MenuItem key={page.name} onClick={handleCloseNavMenu} sx={isActiveNav(page)}>
								<Link to={page.link} className={styles.navigateLink}>
									{page.name}
								</Link>
							</MenuItem>
						))}
					</Box>
					<Box sx={{ flexGrow: 0, marginLeft: '16px' }}>
						<Tooltip title='Tùy chỉnh'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt={user.user?.name || 'U'} src='/static/images/avatar/2.jpg' />
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
							<MenuItem onClick={handleCloseUserMenu}>
								<Typography textAlign='center'>Tài khoản</Typography>
							</MenuItem>
							<MenuItem onClick={handleClickLogout}>
								<Typography textAlign='center'>Đăng xuất</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
			<LogoutDialog openDialog={openDialogLogout} setOpenDialog={setOpenDialogLogout} />
		</AppBar>
	);
}
export default ResponsiveAppBar;
