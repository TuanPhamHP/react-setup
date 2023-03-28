import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import styles from '../../assets/styles/ChatSideBar.module.scss';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
export default function ChatTabHeader() {
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div id='appSideBarHeader' className={`${styles.headerContainer}`}>
			<div className={`${styles.boxSearch}`} tabIndex='-1'>
				<IconButton color={'text'} sx={{ p: 0 }}>
					<SearchIcon />
				</IconButton>
				<input type='text' placeholder='Search ...' />
			</div>
			<div className={`${styles.boxTypes}`}>
				<Tabs value={value} onChange={handleChange} sx={{ padding: '0 2px', minHeight: 'unset' }}>
					<Tab
						label='All'
						sx={{ p: 1, minHeight: 'unset', minWidth: 'unset', textTransform: 'none', fontSize: '14px' }}
					/>
					<Tab
						label='Unread'
						sx={{ p: 1, minHeight: 'unset', minWidth: 'unset', textTransform: 'none', fontSize: '14px' }}
					/>
				</Tabs>
			</div>
		</div>
	);
}
