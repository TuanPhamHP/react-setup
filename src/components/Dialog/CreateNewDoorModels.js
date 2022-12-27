import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import ImgPlaceHolder from '../../assets/images/image-place-holder.jpg';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { getErrorMessage } from '../../helpers/FormatnParse';
import { onChangesImage } from '../../helpers/FileHandler';

const defaultFormData = {
	name: '',
	role: null,
	email: '',
	password: '',
	image: null,
};
const doorImgStyle = {
	maxWidth: '100%',
	width: '100%',
	maxHeight: '400px',
	aspectRatio: 2 / 3,
	objectFit: 'cover',
	borderRadius: '4px',
};
const fieldTitle = {
	fontWeight: 500,
	minWidth: '90px',
	width: '90px',
	paddingLeft: '0px',
	paddingBottom: '4px',
	paddingTop: '4px',
};
export default function FormDialog(props) {
	const [open, setOpen] = React.useState(props.openDialogCreate);
	const [name, setName] = React.useState('');
	const [formData, setFormData] = React.useState({ ...defaultFormData });

	const [formError, setFormError] = React.useState([]);

	const navigate = useNavigate();
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

	const handleChange = event => {
		setName(event.target.value);
	};
	const handleClickOpen = () => {
		props.setOpenDialogCreate(true);
	};
	const clearData = () => {
		setFormError([]);
		setName('');
	};
	const handleCreate = () => {
		if (!name) {
			setFormError([...formError, 'name']);
			return;
		}
		navigate('/cong-trinh/them-moi');
	};
	const handleFormDataInput = (e, field) => {
		setFormData({ ...formData, [field]: e.target.value });
	};
	const changeRole = (e, data) => {
		console.log(data);
		setFormData({ ...formData, role: data });
	};
	const handleClose = () => {
		props.setOpenDialogCreate(false);
	};
	const inputImages = async event => {
		const files = event.target.files;

		for (const file of files) {
			const target = await onChangesImage(file);
			setFormData({ ...formData, image: target });
		}
	};

	React.useEffect(() => {
		setOpen(props.openDialogCreate);
		clearData();
	}, [props.openDialogCreate]);

	return (
		<div>
			<Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth={true}>
				<DialogTitle>Thêm mẫu cửa</DialogTitle>
				<DialogContent>
					<Grid container spacing={{ xs: 2, md: 2 }}>
						<Grid item={true} columns={12} xs={12} sm={4} md={3}>
							<div style={{ marginBottom: '12px' }}>
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
							<div>
								<label htmlFor='newDoorImage' className='pointer' style={doorImgStyle}>
									{formData.image ? (
										<img src={formData.image.src} style={doorImgStyle} alt='' />
									) : (
										<>
											<img
												src={ImgPlaceHolder}
												style={{
													maxWidth: '100%',
													width: '100%',
													aspectRatio: 2 / 3,
													objectFit: 'cover',
													borderRadius: '4px',
												}}
												alt=''
											/>
											<span style={{ display: 'block', textAlign: 'center' }}>Thêm ảnh</span>
										</>
									)}
								</label>
								<input
									type='file'
									accept='image/*'
									id='newDoorImage'
									style={{ display: 'none' }}
									onChange={inputImages}
								/>
							</div>
						</Grid>
						<Grid item={true} columns={12} xs={12} sm={8} md={9}>
							<div style={{ marginBottom: '12px' }}>
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
											placeholder='Kiểu'
											variant='outlined'
											size='small'
										/>
									)}
								/>
							</div>
							<div>
								<div className='d-flex' style={{ marginBottom: '12px' }}>
									<p className={`m-0 text-nowrap`} style={fieldTitle}>
										Nhôm:
									</p>
									<Autocomplete
										{...defaultProps}
										onChange={changeRole}
										disableClearable
										noOptionsText='Không có kết quả phù hợp'
										value={formData.role}
										fullWidth
										isOptionEqualToValue={(option, value) => option.title === value.title}
										renderInput={params => (
											<TextField
												{...params}
												error={!!formError.role}
												helperText={getErrorMessage(formError.role)}
												placeholder='Chọn nhôm'
												variant='outlined'
												size='small'
											/>
										)}
									/>
								</div>
								<div className='d-flex ' style={{ marginBottom: '12px' }}>
									<p className={`m-0 text-nowrap`} style={fieldTitle}>
										Khung:
									</p>
									<TextField
										error={!!formError.khung}
										helperText={getErrorMessage(formError.khung)}
										margin='dense'
										placeholder='Công thức VD: (cao + rong) * 2'
										value={formData.khung}
										onChange={e => {
											handleFormDataInput(e, 'email');
										}}
										type='text'
										fullWidth
										variant='outlined'
										size='small'
										sx={{
											margin: 0,
										}}
									/>
									<Button
										variant='contained'
										sx={{
											display: 'flex',
											alignItems: 'center',
											minWidth: '40px',
											boxShadow: 'none',
											whiteSpace: 'nowrap',
											textTransform: 'none',
											marginLeft: '8px',
										}}
										color={'error'}
										size='small'
										elevation={0}
									>
										<DeleteIcon sx={{ lineHeight: '100%' }} />
									</Button>
								</div>
								<div className='d-flex ' style={{ marginBottom: '12px' }}>
									<p className={`m-0 text-nowrap`} style={fieldTitle}>
										Cánh:
									</p>
									<TextField
										error={!!formError.khung}
										helperText={getErrorMessage(formError.khung)}
										margin='dense'
										placeholder='Công thức VD: (cao + rong) * 2'
										value={formData.khung}
										onChange={e => {
											handleFormDataInput(e, 'email');
										}}
										type='text'
										fullWidth
										variant='outlined'
										size='small'
										sx={{
											margin: 0,
										}}
									/>
									<Button
										variant='contained'
										sx={{
											display: 'flex',
											alignItems: 'center',
											minWidth: '40px',
											boxShadow: 'none',
											whiteSpace: 'nowrap',
											textTransform: 'none',
											marginLeft: '8px',
										}}
										color={'error'}
										size='small'
										elevation={0}
									>
										<DeleteIcon sx={{ lineHeight: '100%' }} />
									</Button>
								</div>
								<div className='d-flex ' style={{ marginBottom: '12px' }}>
									<p className={`m-0 text-nowrap`} style={fieldTitle}>
										Nẹp:
									</p>
									<TextField
										error={!!formError.khung}
										helperText={getErrorMessage(formError.khung)}
										margin='dense'
										placeholder='Công thức VD: (cao + rong) * 2'
										value={formData.khung}
										onChange={e => {
											handleFormDataInput(e, 'email');
										}}
										type='text'
										fullWidth
										variant='outlined'
										size='small'
										sx={{
											margin: 0,
										}}
									/>
									<Button
										variant='contained'
										sx={{
											display: 'flex',
											alignItems: 'center',
											minWidth: '40px',
											boxShadow: 'none',
											whiteSpace: 'nowrap',
											textTransform: 'none',
											marginLeft: '8px',
										}}
										color={'error'}
										size='small'
										elevation={0}
									>
										<DeleteIcon sx={{ lineHeight: '100%' }} />
									</Button>
								</div>
								<div className='d-flex ' style={{ marginBottom: '12px' }}>
									<p className={`m-0 text-nowrap`} style={fieldTitle}>
										Kính:
									</p>
									<TextField
										error={!!formError.khung}
										helperText={getErrorMessage(formError.khung)}
										margin='dense'
										placeholder='Công thức VD: (cao + rong) * 2'
										value={formData.khung}
										onChange={e => {
											handleFormDataInput(e, 'email');
										}}
										type='text'
										fullWidth
										variant='outlined'
										size='small'
										sx={{
											margin: 0,
										}}
									/>
									<Button
										variant='contained'
										sx={{
											display: 'flex',
											alignItems: 'center',
											minWidth: '40px',
											boxShadow: 'none',
											whiteSpace: 'nowrap',
											textTransform: 'none',
											marginLeft: '8px',
										}}
										color={'error'}
										size='small'
										elevation={0}
									>
										<DeleteIcon sx={{ lineHeight: '100%' }} />
									</Button>
								</div>
							</div>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='buttonCancel'>
						Đóng
					</Button>
					<Button onClick={handleCreate}>Thêm</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
