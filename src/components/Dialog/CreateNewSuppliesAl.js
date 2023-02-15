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
	type: null,
	profile: null,
	price: '',
	density: '',
};

export default function FormDialog(props) {
	const internal = useSelector(selectInternal);
	const { enqueueSnackbar } = useSnackbar();
	const [open, setOpen] = React.useState(props.openDialogCreate);
	const [formError, setFormError] = React.useState({});
	const [loadingCreate, setLoadingCreate] = React.useState(false);
	const [isEdit, setIsEdit] = React.useState(false);
	const [formData, setFormData] = React.useState({ ...defaultFormData });
	const alProfilesOption = internal.listAlSystems;
	const alTypesOption = internal.listAlStyles;
	const defaultProps = {
		getOptionLabel: option => option.name,
	};
	const changeType = (e, data) => {
		setFormData({ ...formData, type: data });
	};
	const changeProfile = (e, data) => {
		setFormData({ ...formData, profile: data });
	};

	const handleFormDataInput = (e, field, type = 'string') => {
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
		if (!formData.type) {
			objError = { ...objError, type: 'required' };
		}
		if (!formData.profile) {
			objError = { ...objError, profile: 'required' };
		}
		// if (!formData.price || !String(formData.price).trim()) {
		// 	objError = { ...objError, price: 'required' };
		// }
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
			density: +formData.density,
			// price: +formData.price,
			aluminum_profile_id: formData.profile.id,
			aluminum_type_id: formData.type.id,
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
			enqueueSnackbar(`Có lỗi khi tạo vật liệu: ${error}`, { variant: 'error' });
		}

		// navigate('/cong-trinh/them-moi');
	};
	const handleUpdate = async () => {
		setLoadingCreate(true);
		let objError = {};
		if (!formData.name || !String(formData.name).trim()) {
			objError = { ...objError, name: 'required' };
		}
		if (!formData.type) {
			objError = { ...objError, type: 'required' };
		}
		if (!formData.profile) {
			objError = { ...objError, profile: 'required' };
		}
		// if (!formData.price || !String(formData.price).trim()) {
		// 	objError = { ...objError, price: 'required' };
		// }
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
			density: +formData.density,
			// price: +formData.price,
			aluminum_profile_id: formData.profile.id,
			aluminum_type_id: formData.type.id,
		};
		const res = await api.aluminum.update(body, props.selectedData.id);
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
		props.closeDialog();
	};
	React.useEffect(() => {
		setOpen(props.openDialogCreate);
		if (props.selectedData && props.selectedData.id) {
			const selectedData = { ...props.selectedData };
			const f = {
				name: selectedData.name,
				type: selectedData.aluminumType,
				profile: selectedData.aluminumProfile,
				density: selectedData.density,
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
				<DialogTitle>{isEdit ? 'Chỉnh sửa vật tư' : 'Thêm vật tư - Nhôm'}</DialogTitle>
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
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Kiểu loại:</p>

						<Autocomplete
							{...defaultProps}
							options={alTypesOption}
							onChange={changeType}
							disableClearable
							noOptionsText='Không có kết quả phù hợp'
							value={formData.type}
							isOptionEqualToValue={(option, value) => option.name === value.name}
							renderInput={params => (
								<TextField
									{...params}
									error={!!formError.type}
									helperText={getErrorMessage(formError.type)}
									placeholder='Kiểu nhôm'
									variant='outlined'
									size='small'
								/>
							)}
						/>
					</div>
					<div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Hệ:</p>

						<Autocomplete
							{...defaultProps}
							options={alProfilesOption}
							onChange={changeProfile}
							disableClearable
							noOptionsText='Không có kết quả phù hợp'
							value={formData.profile}
							isOptionEqualToValue={(option, value) => option.name === value.name}
							renderInput={params => (
								<TextField
									{...params}
									error={!!formError.profile}
									helperText={getErrorMessage(formError.profile)}
									placeholder='Hệ'
									variant='outlined'
									size='small'
								/>
							)}
						/>
					</div>
					<div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
						<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Tỉ trọng:</p>
						<TextField
							name='Density'
							error={!!formError.density}
							helperText={getErrorMessage(formError.density)}
							margin='dense'
							placeholder='Tỉ trọng'
							value={formData.density}
							onChange={e => {
								handleFormDataInput(e, 'density');
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
					{/* <div className='d-flex flex-column' style={{ marginBottom: '12px' }}>
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
					</div> */}
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
