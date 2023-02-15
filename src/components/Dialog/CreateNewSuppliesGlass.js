import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';
import styles from '../../assets/styles/DoorSet.module.scss';
import { getErrorMessage } from '../../helpers/FormatnParse';
import { useSnackbar } from 'notistack';
import api from '../../services/index';
import NumberInputFormat from './NumberInputFormat';

const defaultFormData = {
	name: '',
	// thickness: '',
	price: '',
};

export default function FormDialog(props) {
	const { enqueueSnackbar } = useSnackbar();
	const [open, setOpen] = React.useState(props.openDialogCreate);
	const [formError, setFormError] = React.useState({});
	const [loadingCreate, setLoadingCreate] = React.useState(false);
	const [isEdit, setIsEdit] = React.useState(false);
	const [formData, setFormData] = React.useState({ ...defaultFormData });

	const handleFormDataInput = (e, field) => {
		setFormData({ ...formData, [field]: e.target.value });
	};
	const clearData = () => {
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
		// if (!formData.thickness) {
		// 	objError = { ...objError, thickness: 'required' };
		// }
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
			// thickness: +formData.thickness,
			price: +formData.price,
		};
		const res = await api.glass.create(body);
		setLoadingCreate(false);
		if (!res) {
			enqueueSnackbar('Có lỗi khi tạo vật liệu kính', { variant: 'error' });
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
			enqueueSnackbar(`Có lỗi khi lấy danh sách kính: ${error}`, { variant: 'error' });
		}
		// navigate('/cong-trinh/them-moi');
	};
	const handleUpdate = async () => {
		setLoadingCreate(true);
		let objError = {};
		if (!String(formData.name).trim()) {
			objError = { ...objError, name: 'required' };
		}
		// if (!formData.thickness) {
		// 	objError = { ...objError, thickness: 'required' };
		// }
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
			// thickness: +formData.thickness,
			price: +formData.price,
		};
		const res = await api.glass.update(body, props.selectedData.id);
		setLoadingCreate(false);
		if (!res) {
			enqueueSnackbar('Có lỗi khi tạo vật liệu kính', { variant: 'error' });
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
			enqueueSnackbar(`Có lỗi khi lấy danh sách kính: ${error}`, { variant: 'error' });
		}
		// navigate('/cong-trinh/them-moi');
	};
	const handleClose = () => {
		if (loadingCreate) {
			return;
		}
		props.closeDialog();
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
				<DialogTitle>{isEdit ? 'Chỉnh sửa vật tư' : 'Thêm vật tư - Kính'}</DialogTitle>
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
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Độ dày:</p>
						<TextField
							error={!!formError.thickness}
							helperText={getErrorMessage(formError.thickness)}
							margin='dense'
							placeholder='Độ dày'
							value={formData.thickness}
							onChange={e => {
								handleFormDataInput(e, 'thickness');
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
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Giá:</p>
						<TextField
							name='GlassPrice'
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
