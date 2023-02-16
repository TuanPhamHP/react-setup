import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../../assets/styles/DoorSet.module.scss';
import { getErrorMessage } from '../../helpers/FormatnParse';
import { useSnackbar } from 'notistack';
import api from '../../services/index';
import NumberInputFormat from './NumberInputFormat';

import { useSelector } from 'react-redux';
import { selectInternal } from '../../store/internal';
const defaultFormData = {
	name: '',
	unit: null,
	price: '',
};

export default function FormDialog(props) {
	const internal = useSelector(selectInternal);
	const { enqueueSnackbar } = useSnackbar();
	const [open, setOpen] = React.useState(props.openDialogCreate);
	const [formError, setFormError] = React.useState({});
	const [loadingCreate, setLoadingCreate] = React.useState(false);
	const [isEdit, setIsEdit] = React.useState(false);
	const [formData, setFormData] = React.useState({ ...defaultFormData });
	const alStylesOption = internal.listAlStyles;

	const defaultProps = {
		getOptionLabel: option => option.name,
	};
	const changeUnit = (e, data) => {
		console.log(data);
		setFormData({ ...formData, unit: data });
	};

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
		const body = {
			name: formData.name,
			unit: +formData.unit.id,
			price: +formData.price,
		};
		const res = await api.supply.create(body);
		setLoadingCreate(false);
		if (!res) {
			enqueueSnackbar('Có lỗi khi tạo vật liệu', { variant: 'error' });
			return;
		}
		try {
			if (!res.status || res.status > 399 || res.status < 200) {
				enqueueSnackbar(res.statusText, { variant: 'error' });
			} else {
				enqueueSnackbar('Tạo mới thành công', { variant: 'success' });
				props.getListData();

				props.closeDialog();
			}
		} catch (error) {
			enqueueSnackbar(`Có lỗi khi tạo vật liệu: ${error}`, { variant: 'error' });
		}
	};
	const handleUpdate = async () => {
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
		const body = {
			name: formData.name,
			unit: +formData.unit.id,
			price: +formData.price,
		};
		const res = await api.supply.update(body, props.selectedData.id);
		setLoadingCreate(false);
		if (!res) {
			enqueueSnackbar('Có lỗi khi cập nhật vật liệu nhôm', { variant: 'error' });
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
		props.setOpenDialogCreate(false);
	};
	React.useEffect(() => {
		setOpen(props.openDialogCreate);
		if (props.selectedData && props.selectedData.id) {
			const selectedData = { ...props.selectedData };
			const f = {
				name: selectedData.name,
				price: selectedData.price,
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
				<DialogTitle>{isEdit ? 'Chỉnh sửa vật tư' : 'Thêm vật tư phụ'}</DialogTitle>
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
							options={alStylesOption}
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
							name='Pricing'
							error={!!formError.price}
							helperText={getErrorMessage(formError.price)}
							margin='dense'
							placeholder='Giá'
							value={formData.price}
							onChange={e => {
								handleFormDataInput(e, 'price');
							}}
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
