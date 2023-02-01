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

import { useSelector } from 'react-redux';
import { selectInternal } from '../../store/internal';

const defaultFormData = {
	name: '',
	system: null,
	style: null,
	price: '',
	density: '',
};

export default function FormDialog(props) {
	const internal = useSelector(selectInternal);
	const { enqueueSnackbar } = useSnackbar();
	const [open, setOpen] = React.useState(props.openDialogCreate);
	const [formError, setFormError] = React.useState({});
	const [loadingCreate, setLoadingCreate] = React.useState(false);
	const [formData, setFormData] = React.useState({ ...defaultFormData });
	const alStylesOption = internal.listAlStyles;
	const alSystemOption = internal.listAlSystems;
	const defaultProps = {
		getOptionLabel: option => option.name,
	};
	const changeSystem = (e, data) => {
		console.log(data);
		setFormData({ ...formData, system: data });
	};
	const changeStyle = (e, data) => {
		console.log(data);
		setFormData({ ...formData, style: data });
	};

	const handleFormDataInput = (e, field, type = 'string') => {
		setFormData({ ...formData, [field]: e.target.value });
	};
	const handleClickOpen = () => {
		props.setOpenDialogCreate(true);
	};
	const clearData = () => {
		setFormError({});
		setFormData({ ...defaultFormData });
	};
	const handleCreate = async () => {
		setLoadingCreate(true);
		let objError = {};
		if (!formData.name || !String(formData.name).trim()) {
			objError = { ...objError, name: 'required' };
		}
		if (!formData.style) {
			objError = { ...objError, style: 'required' };
		}
		if (!formData.system) {
			objError = { ...objError, system: 'required' };
		}
		if (!formData.price || !String(formData.price).trim()) {
			objError = { ...objError, price: 'required' };
		}
		if (!formData.density || !String(formData.density).trim()) {
			objError = { ...objError, density: 'required' };
		}
		if (Object.keys(objError).length) {
			setFormError(objError);

			setLoadingCreate(false);
			return;
		}
		const body = {
			name: formData.name,
			density: formData.density,
			price: formData.price,
			aluminum_style_id: formData.style.id,
			aluminum_system_id: formData.system.id,
		};
		const res = await api.aluminum.create(body);
		setLoadingCreate(false);
		if (!res) {
			enqueueSnackbar('Có lỗi khi tạo vật liệu nhôm', { variant: 'error' });
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
			enqueueSnackbar(`Có lỗi khi lấy danh sách kiểu nhôm: ${error}`, { variant: 'error' });
		}

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
				<DialogTitle>Thêm vật tư - Nhôm</DialogTitle>
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
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Hệ:</p>

						<Autocomplete
							{...defaultProps}
							options={alSystemOption}
							onChange={changeSystem}
							disableClearable
							noOptionsText='Không có kết quả phù hợp'
							value={formData.system}
							isOptionEqualToValue={(option, value) => option.name === value.name}
							renderInput={params => (
								<TextField
									{...params}
									error={!!formError.system}
									helperText={getErrorMessage(formError.system)}
									placeholder='Hệ'
									variant='outlined'
									size='small'
								/>
							)}
						/>
					</div>
					<div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Kiểu loại:</p>

						<Autocomplete
							{...defaultProps}
							options={alStylesOption}
							onChange={changeStyle}
							disableClearable
							noOptionsText='Không có kết quả phù hợp'
							value={formData.style}
							isOptionEqualToValue={(option, value) => option.name === value.name}
							renderInput={params => (
								<TextField
									{...params}
									error={!!formError.style}
									helperText={getErrorMessage(formError.style)}
									placeholder='Kiểu loại'
									variant='outlined'
									size='small'
								/>
							)}
						/>
					</div>
					<div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Tỉ trọng:</p>
						<TextField
							error={!!formError.density}
							helperText={getErrorMessage(formError.density)}
							margin='dense'
							placeholder='Tỉ trọng'
							value={formData.density}
							onChange={e => {
								handleFormDataInput(e, 'density');
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
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Giá nhập:</p>
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
