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
import { Link, BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import styles from '../assets/styles/Header.module.scss';
import LogoutDialog from '../components/Dialog/LogoutDialog';
// DRAWER
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// redux
import { selectUser } from '../store/userAuth';
import { useSelector, useDispatch } from 'react-redux';

const pages = [
	// { name: 'Công trình', link: '/cong-trinh', active: ['/cong-trinh'] },
	// { name: 'Mẫu cửa', link: '/mau-cua', active: ['/mau-cua'] },
	{ name: 'Hướng dẫn', link: '/huong-dan', active: ['/huong-dan'] },
	{ name: 'Cài đặt', link: '/cai-dat', active: ['/cai-dat'] },
];
const instructionSub = [
	{ name: 'Danh sách', link: '/cong-trinh', active: ['/cong-trinh'] },
	{ name: 'Thêm mới', link: '/cong-trinh/them-moi', active: ['/cong-trinh/them-moi'] },
];
const suppliesSub = [
	{ name: 'Nhôm', link: '/vat-tu/nhom', active: ['/vat-tu/nhom'] },
	{ name: 'Kính', link: '/vat-tu/kinh', active: ['/vat-tu/kinh'] },
	{ name: 'Phụ kiện', link: '/vat-tu/phu-kien', active: ['/vat-tu/phu-kien'] },
	{ name: 'Vật tư phụ', link: '/vat-tu/vat-tu-phu', active: ['/vat-tu/vat-tu-phu'] },
];

function ResponsiveAppBar() {
	const [state, setState] = React.useState({
		left: false,
	});

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [anchorElConstrcution, setAnchorElConstrcution] = React.useState(null);
	const [anchorElSupplies, setAnchorElSupplies] = React.useState(null);

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

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};
	const handleOpenConstructionMenu = event => {
		setAnchorElConstrcution(event.currentTarget);
	};
	const handleOpenSuppliesMenu = event => {
		setAnchorElSupplies(event.currentTarget);
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
	const handleCloseSuppliesMenu = () => {
		setAnchorElSupplies(null);
	};
	const handleNavigateSub = () => {
		navigate('/nhan-vien');
		handleCloseUserMenu();
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

	const list = anchor => (
		<Box
			sx={{ height: '100%', width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, bgcolor: 'primary.main' }}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List sx={{ paddingTop: 4, paddingBottom: 0 }}>
				<ListItem disablePadding>
					<AdbIcon sx={{ height: '40px', display: 'block', margin: 'auto', color: 'primary.white', fontSize: 40 }} />
				</ListItem>

				{instructionSub.map(page => (
					<ListItem key={page.link} disablePadding>
						<ListItemButton>
							<ListItemIcon
								sx={{
									minWidth: '40px',
								}}
							>
								{1 % 2 === 0 ? <InboxIcon color='white' /> : <MailIcon color='white' />}
							</ListItemIcon>

							<Link to={page.link} className={styles.navigateLink}>
								{page.name}
							</Link>
						</ListItemButton>
					</ListItem>
				))}
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon
							sx={{
								minWidth: '40px',
							}}
							color='primary.white'
						>
							<InboxIcon color='white' />
						</ListItemIcon>
						<Link to={'/mau-cua'} className={styles.navigateLink}>
							Mẫu cửa
						</Link>
					</ListItemButton>
				</ListItem>
				{suppliesSub.map(page => (
					<ListItem key={page.link} disablePadding>
						<ListItemButton>
							<ListItemIcon
								sx={{
									minWidth: '40px',
								}}
								color='primary.white'
							>
								{1 % 2 === 0 ? <InboxIcon /> : <MailIcon color='white' />}
							</ListItemIcon>

							<Link to={page.link} className={styles.navigateLink}>
								{page.name}
							</Link>
						</ListItemButton>
					</ListItem>
				))}
				{pages.map(page => (
					<ListItem key={page.link} disablePadding>
						<ListItemButton>
							<ListItemIcon
								sx={{
									minWidth: '40px',
								}}
								color='primary.white'
							>
								{1 % 2 === 0 ? <InboxIcon /> : <MailIcon color='white' />}
							</ListItemIcon>

							<Link to={page.link} className={styles.navigateLink}>
								{page.name}
							</Link>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

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
							onClick={toggleDrawer('left', true)}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>

						<Drawer sx={{ padding: 0 }} anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
							{list('left')}
						</Drawer>
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
							sx={{ mt: '45px', padding: '0' }}
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
										style={{ padding: '12px 18px ', width: '100%' }}
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
						<MenuItem
							onClick={handleCloseNavMenu}
							sx={{ ...isActiveNav({ name: 'Mẫu cửa', link: '/mau-cua', active: ['/mau-cua'] }), padding: '10px 12px' }}
						>
							<Link to={'/mau-cua'} className={styles.navigateLink}>
								Mẫu cửa
							</Link>
						</MenuItem>
						<MenuItem
							aria-controls='menu-appbar'
							onClick={handleOpenSuppliesMenu}
							sx={{
								...isActiveNav({
									name: 'Vật tư',
									link: '/vat-tu',
									active: ['/vat-tu', '/vat-tu/nhom', '/vat-tu/kinh', '/vat-tu/phu-kien', '/vat-tu/vat-tu-phu'],
								}),
								padding: '10px 12px',
							}}
						>
							Vật tư
						</MenuItem>
						<Menu
							sx={{ mt: '45px', padding: '0px ' }}
							id='menu-supplies'
							anchorEl={anchorElSupplies}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElSupplies)}
							onClose={handleCloseSuppliesMenu}
						>
							{suppliesSub.map(page => (
								<MenuItem key={page.name} onClick={handleCloseSuppliesMenu} sx={isActiveNav(page, true)}>
									<Link
										style={{ padding: '12px 18px', width: '100%' }}
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
							<MenuItem
								key={page.name}
								onClick={handleCloseNavMenu}
								sx={{ ...isActiveNav(page), padding: '10px 12px' }}
							>
								<Link to={page.link} className={styles.navigateLink}>
									{page.name}
								</Link>
							</MenuItem>
						))}
					</Box>
					<Box sx={{ flexGrow: 0, marginLeft: '16px' }}>
						<Tooltip title='Tùy chỉnh'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt={user.user?.name || 'U'} src={user.user?.avatar} />
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
								<Typography textAlign='center'>Xin chào, {user.user?.name} </Typography>
							</MenuItem>
							<MenuItem onClick={handleNavigateSub} sx={{ borderBottom: '1px solid #ebebeb' }}>
								<Typography textAlign='center'>Nhân viên</Typography>
							</MenuItem>
							{/* <MenuItem onClick={handleCloseUserMenu} sx={{ borderBottom: '1px solid #ebebeb' }}>
								<Typography textAlign='center'>Tài khoản</Typography>
							</MenuItem> */}

							<MenuItem onClick={handleClickLogout}>
								<Typography textAlign='center' color={'red'}>
									Đăng xuất
								</Typography>
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
