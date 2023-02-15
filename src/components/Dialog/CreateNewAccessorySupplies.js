import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import NumberInputFormat from './NumberInputFormat';

import styles from '../../assets/styles/DoorSet.module.scss';
import { getErrorMessage } from '../../helpers/FormatnParse';
import api from '../../services/index';
import { useSnackbar } from 'notistack';

const defaultFormData = {
	name: '',
	unit: null,
	entry_price: '',
	profit_coefficient: '',
	discount: '',
};

export default function FormDialog(props) {
	const { enqueueSnackbar } = useSnackbar();
	const [open, setOpen] = React.useState(props.openDialogCreate);
	const [isEdit, setIsEdit] = React.useState(false);
	const [formError, setFormError] = React.useState({});
	const [loadingCreate, setLoadingCreate] = React.useState(false);
	const [formData, setFormData] = React.useState({ ...defaultFormData });

	const handleFormDataInput = (e, field) => {
		setFormData({ ...formData, [field]: e.target.value });
	};
	const clearData = () => {
		setIsEdit(false);
		setFormError({});
		setFormData({ ...defaultFormData });
	};
	const submit = () => {
		isEdit ? handleUpdate() : handleCreate();
	};
	const handleCreate = async () => {
		setLoadingCreate(true);
		let objError = {};
		if (!formData.name || !String(formData.name).trim()) {
			objError = { ...objError, name: 'required' };
		}

		if (!formData.entry_price || !String(formData.entry_price).trim()) {
			objError = { ...objError, entry_price: 'required' };
		}

		if (Object.keys(objError).length) {
			console.log(objError);
			setFormError(objError);
			enqueueSnackbar('Có lỗi khi tạo vật tư ' + `${objError}`, { variant: 'error' });
			setLoadingCreate(false);
			return;
		}
		const body = {
			name: formData.name,
			entry_price: +formData.entry_price,
			profit_coefficient: +formData.profit_coefficient,
			discount: +formData.discount,
		};
		const res = await api.accessory.create(body);
		setLoadingCreate(false);
		if (!res) {
			enqueueSnackbar('Có lỗi khi tạo vật tư', { variant: 'error' });
			return;
		}
		try {
			if (!res.status || res.status > 399 || res.status < 200) {
				enqueueSnackbar(res.statusText, { variant: 'error' });
			} else {
				enqueueSnackbar('Tạo mới thành công', { variant: 'success' });
				props.getListData();
				props.setOpenDialogCreate(false);
			}
		} catch (error) {
			enqueueSnackbar(`Có lỗi khi tạo vật tư: ${error}`, { variant: 'error' });
		}
		// navigate('/cong-trinh/them-moi');
	};
	const handleUpdate = async () => {
		setLoadingCreate(true);
		let objError = {};
		if (!formData.name || !String(formData.name).trim()) {
			objError = { ...objError, name: 'required' };
		}

		if (!formData.entry_price || !String(formData.entry_price).trim()) {
			objError = { ...objError, entry_price: 'required' };
		}

		if (Object.keys(objError).length) {
			console.log(objError);
			setFormError(objError);
			enqueueSnackbar('Có lỗi khi tạo vật tư ' + `${objError}`, { variant: 'error' });
			setLoadingCreate(false);
			return;
		}
		const body = {
			name: formData.name,
			entry_price: +formData.entry_price,
			profit_coefficient: +formData.profit_coefficient,
			discount: +formData.discount,
		};
		const res = await api.accessory.update(body, props.selectedData.id);
		setLoadingCreate(false);
		if (!res) {
			enqueueSnackbar('Có lỗi khi cập nhật vật liệu', { variant: 'error' });
			return;
		}
		try {
			if (!res.status || res.status > 399 || res.status < 200) {
				enqueueSnackbar(res.statusText, { variant: 'error' });
			} else {
				enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
				props.getListData();

				props.closeDialog();
			}
		} catch (error) {
			enqueueSnackbar(`Có lỗi khi cập nhật vật liệu: ${error}`, { variant: 'error' });
		}
	};
	const handleClose = () => {
		if (loadingCreate) {
			return;
		}
		props.closeDialog(false);
	};
	React.useEffect(() => {
		setOpen(props.openDialogCreate);
		if (props.selectedData && props.selectedData.id) {
			const selectedData = { ...props.selectedData };
			const f = {
				name: selectedData.name,
				entry_price: selectedData.entry_price,
				profit_coefficient: selectedData.profit_coefficient,
				discount: selectedData.discount,
			};
			setIsEdit(true);
			setFormError({});
			setFormData(f);
			return;
		}
		clearData();
	}, [props.openDialogCreate, props.selectedData]);

	return (
		<div>
			<Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth={true}>
				<DialogTitle>Thêm vật tư - Phụ kiện</DialogTitle>
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
					{/* <div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Mẫu cửa:</p>

						<Autocomplete
							{...defaultProps}
							options={alSystemOption}
							onChange={changeUnit}
							disableClearable
							noOptionsText='Không có kết quả phù hợp'
							value={formData.unit}
							isOptionEqualToValue={(option, value) => option.name === value.name}
							renderInput={params => (
								<TextField
									{...params}
									error={!!formError.unit}
									helperText={getErrorMessage(formError.unit)}
									placeholder='Mẫu cửa'
									variant='outlined'
									size='small'
								/>
							)}
						/>
					</div> */}
					<div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Giá nhập:</p>
						<TextField
							error={!!formError.entry_price}
							helperText={getErrorMessage(formError.entry_price)}
							margin='dense'
							placeholder='Giá'
							value={formData.entry_price}
							onChange={e => {
								handleFormDataInput(e, 'entry_price');
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
					{/* <div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Tỉ lệ lợi nhuận:</p>
						<TextField
							error={!!formError.profit_coefficient}
							helperText={getErrorMessage(formError.profit_coefficient)}
							margin='dense'
							placeholder='Tỉ lệ lợi nhận'
							value={formData.profit_coefficient}
							onChange={e => {
								handleFormDataInput(e, 'profit_coefficient');
							}}
							InputProps={{
								startAdornment: <InputAdornment position='start'>%</InputAdornment>,
							}}
							type='number'
							fullWidth
							variant='outlined'
							size='small'
							sx={{
								margin: 0,
							}}
						/>
					</div> */}

					<div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Tỉ lệ lợi nhuận:</p>
						<TextField
							value={formData.profit_coefficient}
							onChange={e => handleFormDataInput(e, 'profit_coefficient')}
							name='numberformat'
							placeholder='Tỉ lệ lợi nhận'
							id='formatted-numberformat-input'
							InputProps={{
								inputComponent: NumberInputFormat,
							}}
							fullWidth
							variant='outlined'
							size='small'
							sx={{
								margin: 0,
							}}
						/>
					</div>
					<div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Chiết khấu:</p>
						<TextField
							error={!!formError.discount}
							helperText={getErrorMessage(formError.discount)}
							margin='dense'
							placeholder='Giá'
							value={formData.discount}
							onChange={e => {
								handleFormDataInput(e, 'discount');
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
						onClick={submit}
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
