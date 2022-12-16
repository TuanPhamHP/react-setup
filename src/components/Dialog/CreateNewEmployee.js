import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import styles from '../../assets/styles/DoorSet.module.scss';
import { getErrorMessage } from '../../helpers/FormatnParse';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const defaultFormData = {
	name: '',
	role: null,
	email: '',
	password: '',
};

export default function FormDialog(props) {
	const [open, setOpen] = React.useState(props.openDialogCreate);
	const [formError, setFormError] = React.useState({});
	const [loadingCreate, setLoadingCreate] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const [formData, setFormData] = React.useState({ ...defaultFormData });
	const top100Films = [
		{ title: 'The Shawshank Redemption', year: 1994 },
		{ title: 'The Godfather', year: 1972 },
		{ title: 'The Godfather: Part II', year: 1974 },
		{ title: 'The Dark Knight', year: 2008 },
		{ title: '12 Angry Men', year: 1957 },
		{ title: "Schindler's List", year: 1993 },
		{ title: 'Pulp Fiction', year: 1994 },
	];
	const handleClickShowPassword = () => setShowPassword(show => !show);

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};
	const defaultProps = {
		options: top100Films,
		getOptionLabel: option => option.title,
	};
	const changeRole = (e, data) => {
		console.log(data);
		setFormData({ ...formData, role: data });
	};
	const changeType = (e, data) => {
		console.log(data);
		setFormData({ ...formData, type: data });
	};

	const handleFormDataInput = (e, field) => {
		setFormData({ ...formData, [field]: e.target.value });
	};
	const handleClickOpen = () => {
		props.setOpenDialogCreate(true);
	};
	const clearData = () => {
		setFormError({});
		setFormData({ ...defaultFormData });
	};
	const handleCreate = () => {
		setLoadingCreate(true);
		let objError = {};
		if (!formData.name || !String(formData.name).trim()) {
			objError = { ...objError, name: 'required' };
		}
		if (!formData.role) {
			objError = { ...objError, role: 'required' };
		}
		if (!formData.email || !String(formData.email).trim()) {
			objError = { ...objError, email: 'required' };
		}
		if (!formData.password || !String(formData.password).trim()) {
			objError = { ...objError, password: 'required' };
		}
		if (Object.keys(objError).length) {
			setFormError(objError);

			setLoadingCreate(false);
			return;
		}
		setTimeout(() => {
			props.setOpenDialogCreate(false);
			setLoadingCreate(false);
		}, 2000);
		// navigate('/cong-trinh/them-moi');
	};

	const handleClose = () => {
		if (loadingCreate) {
			return;
		}
		props.setOpenDialogCreate(false);
	};
	React.useEffect(() => {
		setOpen(props.openDialogCreate);
		clearData();
	}, [props.openDialogCreate]);

	return (
		<div>
			<Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth={true}>
				<DialogTitle>Thêm nhân viên</DialogTitle>
				<DialogContent>
					<div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Họ Tên:</p>
						<TextField
							error={!!formError.name}
							helperText={getErrorMessage(formError.name)}
							autoFocus
							margin='dense'
							placeholder='Họ tên'
							value={formData.name}
							onChange={e => {
								handleFormDataInput(e, 'name');
							}}
							type='text'
							fullWidth
							variant='outlined'
							size='small'
							sx={{
								margin: 0,
							}}
						/>
					</div>

					<div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Email:</p>
						<TextField
							error={!!formError.email}
							helperText={getErrorMessage(formError.email)}
							margin='dense'
							placeholder='Tỉ trọng'
							value={formData.email}
							onChange={e => {
								handleFormDataInput(e, 'email');
							}}
							type='number'
							fullWidth
							variant='outlined'
							size='small'
							sx={{
								margin: 0,
							}}
						/>
					</div>
					<div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Password:</p>

						<FormControl fullWidth={true} sx={{ m: '12px 0', p: 0 }} variant='outlined'>
							<TextField
								error={!!formError.password}
								helperText={getErrorMessage(formError.password)}
								type={showPassword ? 'text' : 'password'}
								value={formData.password}
								placeholder='Mật khẩu'
								size='small'
								fullWidth={true}
								onChange={e => {
									handleFormDataInput(e, 'password');
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
					</div>
					<div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Vai trò:</p>

						<Autocomplete
							{...defaultProps}
							onChange={changeRole}
							disableClearable
							noOptionsText='Không có kết quả phù hợp'
							value={formData.role}
							isOptionEqualToValue={(option, value) => option.title === value.title}
							renderInput={params => (
								<TextField
									{...params}
									error={!!formError.role}
									helperText={getErrorMessage(formError.role)}
									placeholder='Vai trò'
									variant='outlined'
									size='small'
								/>
							)}
						/>
					</div>
				</DialogContent>

				<DialogActions>
					<Button
						onClick={handleClose}
						color='buttonCancel'
						sx={{
							display: 'flex',
							alignItems: 'center',

							whiteSpace: 'nowrap',
							textTransform: 'none',
						}}
						disabled={loadingCreate}
					>
						Đóng
					</Button>
					<Button
						onClick={handleCreate}
						sx={{
							display: 'flex',
							alignItems: 'center',
							whiteSpace: 'nowrap',
							textTransform: 'none',
						}}
					>
						{loadingCreate ? <CircularProgress color='primary' size={24} sx={{ margin: 0 }} /> : <>Lưu</>}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
