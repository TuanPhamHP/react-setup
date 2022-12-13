import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ItemBlock from './ItemBlock';
export default function NestedList() {
	const [open, setOpen] = React.useState('popular');
	const itemData = [
		{
			img: 'https://xuongdeco.com/wp-content/uploads/2021/06/cua-kinh-sieu-hep-deco-ckd12-510x510.jpg',
			title: 'Breakfast',
			author: '@bkristastucchio',
			rows: 2,
			cols: 2,
			featured: true,
		},
		{
			img: 'https://xuongdeco.com/wp-content/uploads/2021/06/cua-kinh-sieu-hep-deco-ckd12-510x510.jpg',
			title: 'Burger',
			author: '@rollelflex_graphy726',
		},
		{
			img: 'https://xuongdeco.com/wp-content/uploads/2021/06/cua-kinh-sieu-hep-deco-ckd12-510x510.jpg',
			title: 'Camera',
			author: '@helloimnik',
		},
		{
			img: 'https://xuongdeco.com/wp-content/uploads/2021/06/cua-kinh-sieu-hep-deco-ckd12-510x510.jpg',
			title: 'Coffee',
			author: '@nolanissac',
			cols: 2,
		},
		{
			img: 'https://xuongdeco.com/wp-content/uploads/2021/06/cua-kinh-sieu-hep-deco-ckd12-510x510.jpg',
			title: 'Hats',
			author: '@hjrc33',
			cols: 2,
		},
	];
	const handleClick = _open => {
		if (open === _open) {
			setOpen('');
			return;
		}
		setOpen(_open);
	};

	return (
		<List
			sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.white' }}
			component='nav'
			classes={{ nav: 'sideNav' }}
			aria-labelledby='nested-list-subheader'
		>
			<ListItemButton
				onClick={() => {
					handleClick('popular');
				}}
				sx={{ marginBottom: 1 }}
			>
				<ListItemIcon>
					<StarBorder />
				</ListItemIcon>
				<ListItemText primary='Phổ biến' />
				{open === 'popular' ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open === 'popular'} timeout='auto' unmountOnExit>
				<Grid container spacing={{ xs: 1, md: 1 }}>
					{itemData.map(o => (
						<Grid key={o.title} item xs={6} sm={6}>
							<ItemBlock item={o} />
						</Grid>
					))}
				</Grid>
			</Collapse>

			<ListItemButton
				onClick={() => {
					handleClick('main-door');
				}}
				sx={{ marginBottom: 1 }}
			>
				<ListItemIcon>
					<StarBorder />
				</ListItemIcon>
				<ListItemText primary='Cửa đi' />
				{open === 'main-door' ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open === 'main-door'} timeout='auto' unmountOnExit>
				<Grid container spacing={{ xs: 1, md: 1 }}>
					{itemData.map(o => (
						<Grid key={o.title} item xs={6} sm={6}>
							<ItemBlock item={o} />
						</Grid>
					))}
				</Grid>
			</Collapse>

			<ListItemButton
				onClick={() => {
					handleClick('window');
				}}
				sx={{ marginBottom: 1 }}
			>
				<ListItemIcon>
					<StarBorder />
				</ListItemIcon>
				<ListItemText primary='Cửa sổ' />
				{open === 'window' ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open === 'window'} timeout='auto' unmountOnExit>
				<Grid container spacing={{ xs: 1, md: 1 }}>
					{itemData.map(o => (
						<Grid key={o.title} item xs={6} sm={6}>
							<ItemBlock item={o} />
						</Grid>
					))}
				</Grid>
			</Collapse>

			<ListItemButton
				onClick={() => {
					handleClick('side-door');
				}}
				sx={{ marginBottom: 1 }}
			>
				<ListItemIcon>
					<StarBorder />
				</ListItemIcon>
				<ListItemText primary='Vách' />
				{open === 'side-door' ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open === 'side-door'} timeout='auto' unmountOnExit>
				<Grid container spacing={{ xs: 1, md: 1 }}>
					{itemData.map(o => (
						<Grid key={o.title} item xs={6} sm={6}>
							<ItemBlock item={o} />
						</Grid>
					))}
				</Grid>
			</Collapse>
			<Typography
				variant='subtitle1'
				noWrap
				component='p'
				sx={{
					textAlign: 'center',
					color: 'secondary',
					textDecoration: 'underline',
					cursor: 'pointer',
				}}
			>
				Xem toàn bộ
			</Typography>
		</List>
	);
}
