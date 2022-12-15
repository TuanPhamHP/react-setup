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
import { useNavigate } from 'react-router';
import styles from '../../assets/styles/DoorSet.module.scss';
import { getErrorMessage } from '../../helpers/FormatnParse';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});
export default function FormDialog(props) {
	const [open, setOpen] = React.useState(props.openDialogCreate);
	const [formError, setFormError] = React.useState({});
	const [loadingCreate, setLoadingCreate] = React.useState(false);
	const [formData, setFormData] = React.useState({
		name: '',
		unit: null,
		price: '',
	});
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
	const changeUnit = (e, data) => {
		console.log(data);
		setFormData({ ...formData, unit: data });
	};

	const handleFormDataInput = (e, field) => {
		setFormData({ ...formData, [field]: e.target.value });
	};
	const handleClickOpen = () => {
		props.setOpenDialogCreate(true);
	};
	const clearData = () => {
		setFormError({});
		setFormData({
			name: '',
			unit: null,
			price: '',
		});
	};
	const handleCreate = () => {
		setLoadingCreate(true);
		let objError = {};
		if (!String(formData.name).trim()) {
			objError = { ...objError, name: 'required' };
		}
		if (!formData.unit) {
			objError = { ...objError, unit: 'required' };
		}
		if (!String(formData.price).trim()) {
			objError = { ...objError, price: 'required' };
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
			<Dialog TransitionComponent={Transition} open={open} onClose={handleClose} maxWidth='sm' fullWidth={true}>
				<DialogTitle>Thêm vật tư phụ</DialogTitle>
				<DialogContent>
					<div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Tên:</p>
						<TextField
							error={!!formError.name}
							helperText={getErrorMessage(formError.name)}
							autoFocus
							margin='dense'
							placeholder='Tên'
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
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Đơn vị:</p>

						<Autocomplete
							{...defaultProps}
							onChange={changeUnit}
							disableClearable
							noOptionsText='Không có kết quả phù hợp'
							value={formData.unit}
							isOptionEqualToValue={(option, value) => option.title === value.title}
							renderInput={params => (
								<TextField
									{...params}
									error={!!formError.unit}
									helperText={getErrorMessage(formError.unit)}
									placeholder='Đơn vị'
									variant='outlined'
									size='small'
								/>
							)}
						/>
					</div>
					<div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Giá:</p>
						<TextField
							error={!!formError.price}
							helperText={getErrorMessage(formError.price)}
							margin='dense'
							placeholder='Giá'
							value={formData.price}
							onChange={e => {
								handleFormDataInput(e, 'price');
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
