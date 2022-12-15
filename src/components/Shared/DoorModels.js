import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CardActionArea } from '@mui/material';

export default function Component(params) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Card sx={{ width: '100%', height: '100%', position: 'relative' }}>
			<CardActionArea>
				<IconButton
					aria-label='more'
					id='long-button'
					aria-controls={open ? 'long-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-haspopup='true'
					onClick={handleClick}
					sx={{
						position: 'absolute',
						zIndex: 2,
						top: '2px',
						right: '2px',
						backgroundColor: '#cec5c5a3',
						backdropFilter: 'blur(4px)',
					}}
				>
					<MoreHorizIcon htmlColor='#000' />
				</IconButton>
				<Menu
					MenuListProps={{
						'aria-labelledby': 'long-button',
					}}
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose} sx={{ fontSize: '14px' }}>
						Edit
					</MenuItem>
					<MenuItem onClick={handleClose} sx={{ fontSize: '14px' }}>
						Clone
					</MenuItem>
					<MenuItem onClick={handleClose} sx={{ fontSize: '14px' }}>
						Vật tư phụ
					</MenuItem>
				</Menu>
				<CardMedia
					component='img'
					height='140'
					image='https://webnoithat.net/wp-content/uploads/2020/06/mau-cua-kinh-khung-nhom-dep-1.jpg'
					alt='green iguana'
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='div'>
						Cửa nhôm {params.item.code}
					</Typography>
					<Typography variant='body2' color='text.secondary' className='limit-line-3'>
						Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
						except Antarctica
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
