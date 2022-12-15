import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import styles from '../../assets/styles/DoorSet.module.scss';

// helpers
import { getErrorMessage } from '../../helpers/FormatnParse';

export default function CreateNewDoorSetContainer(props) {
	const [listData, setListData] = useState([]);
	const [formData, setFormData] = useState({
		name: '',
		no: '',
		accessory: null,
		width: '',
		height: '',
	});

	const [formError, setFormError] = useState({});
	const [isEdit, setIsEdit] = useState([]);
	const top100Films = [
		{ title: 'The Shawshank Redemption', year: 1994 },
		{ title: 'The Godfather', year: 1972 },
		{ title: 'The Godfather: Part II', year: 1974 },
		{ title: 'The Dark Knight', year: 2008 },
		{ title: '12 Angry Men', year: 1957 },
		{ title: "Schindler's List", year: 1993 },
		{ title: 'Pulp Fiction', year: 1994 },
	];
	const defaultProps = {
		options: top100Films,
		getOptionLabel: option => option.title,
	};
	const handleClickEdit = _name => {
		if (!isEdit.includes(_name)) {
			setIsEdit([...isEdit, _name]);
		}
	};
	const handleMouseDownPassword = event => {
		event.preventDefault();
	};
	const handleClickCancel = _name => {
		if (isEdit.includes(_name)) {
			setIsEdit(isEdit.filter(o => o !== _name));
		}
	};
	const handlerFormInput = (e, field) => {
		setFormData({ ...formData, [field]: e.target.value });
	};
	const removeData = _data => {
		setListData(listData.filter(o => o.code !== _data.code));
	};

	const renderListData = () => {
		return listData.map(o => (
			<div key={o.code} className={styles.eachDoor}>
				<Tooltip title='Xóa' className={styles.buttonRemoveAbsolute}>
					<IconButton
						color={'error'}
						onClick={() => {
							removeData(o);
						}}
					>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
				<p>Tên cửa: {o.name}</p>
				<p>Loại cửa: Demo</p>
			</div>
		));
	};
	const handlerPickAccessory = (e, data) => {
		console.log(data);
	};
	useEffect(() => {
		if (props && Array.isArray(props.items)) {
			setListData([...props.items]);
		}
	}, [props.items]);

	return (
		<Grid container spacing={{ sx: 1, md: 2 }}>
			<Grid item xs={12}>
				<div className='d-flex' style={{ gap: '12px', flexWrap: 'wrap' }}>
					<div className='d-flex flex-column'>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Tên:</p>
						<FormControl fullWidth={true} sx={{ m: 0, p: 0, minWidth: '240px' }} variant='filled'>
							<TextField
								error={!!formError.name}
								helperText={getErrorMessage(formError.name)}
								variant='outlined'
								size='small'
								type='text'
								value={formData.name}
								placeholder='Tên bộ cửa'
								fullWidth={true}
								onChange={e => {
									handlerFormInput(e, 'name');
								}}
							/>
						</FormControl>
					</div>
					<div className='d-flex flex-column'>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Số bộ:</p>
						<FormControl fullWidth={true} sx={{ m: 0, p: 0, minWidth: '240px' }} variant='filled'>
							<TextField
								error={!!formError.no}
								helperText={getErrorMessage(formError.no)}
								variant='outlined'
								size='small'
								type='text'
								value={formData.no}
								placeholder='Số bộ cửa'
								fullWidth={true}
								onChange={e => {
									handlerFormInput(e, 'no');
								}}
							/>
						</FormControl>
					</div>
				</div>
			</Grid>
			<Grid item xs={12}>
				<Divider variant='middle' />
			</Grid>
			<Grid item xs={5} sm={3}>
				{renderListData()}
			</Grid>
			<Grid item xs={7} sm={9}>
				<Grid container spacing={{ sx: 1, md: 2 }}>
					<Grid item xs={6}>
						<div className='d-flex flex-column'>
							<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Rộng:</p>
							<FormControl fullWidth={true} sx={{ m: 0, p: 0 }} variant='filled'>
								<TextField
									error={!!formError.width}
									helperText={getErrorMessage(formError.width)}
									variant='outlined'
									size='small'
									type='number'
									value={formData.width}
									placeholder='Rộng'
									fullWidth={true}
									onChange={e => {
										handlerFormInput(e, 'width');
									}}
								/>
							</FormControl>
						</div>
					</Grid>
					<Grid item xs={6}>
						<div className='d-flex flex-column'>
							<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Cao:</p>
							<FormControl fullWidth={true} sx={{ m: 0, p: 0 }} variant='filled'>
								<TextField
									error={!!formError.height}
									helperText={getErrorMessage(formError.height)}
									variant='outlined'
									size='small'
									type='number'
									value={formData.height}
									placeholder='Cao'
									fullWidth={true}
									onChange={e => {
										handlerFormInput(e, 'height');
									}}
								/>
							</FormControl>
						</div>
					</Grid>
					<Grid item xs={12}>
						<div className='d-flex flex-column'>
							<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Bộ phụ kiện:</p>
							<Autocomplete
								{...defaultProps}
								onChange={handlerPickAccessory}
								disableClearable
								noOptionsText='Không có kết quả phù hợp'
								value={formData.accessory}
								isOptionEqualToValue={(option, value) => option.title === value.title}
								renderInput={params => (
									<TextField {...params} placeholder='Chọn phụ kiện' variant='outlined' size='small' />
								)}
							/>
						</div>
					</Grid>
					<Grid item xs={12}>
						<div className='d-flex flex-column'>
							<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Chọn kính:</p>
							<Autocomplete
								{...defaultProps}
								onChange={handlerPickAccessory}
								disableClearable
								noOptionsText='Không có kết quả phù hợp'
								value={formData.accessory}
								isOptionEqualToValue={(option, value) => option.title === value.title}
								renderInput={params => (
									<TextField {...params} placeholder='Chọn kính' variant='outlined' size='small' />
								)}
							/>
						</div>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
