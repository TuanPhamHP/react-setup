import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router';
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});
export default function FormDialog(props) {
	const [open, setOpen] = React.useState(props.openDialogCreate);
	const [name, setName] = React.useState('');
	const [formError, setFormError] = React.useState([]);

	const navigate = useNavigate();
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

	const handleClose = () => {
		props.setOpenDialogCreate(false);
	};
	React.useEffect(() => {
		setOpen(props.openDialogCreate);
		clearData();
	}, [props.openDialogCreate]);

	return (
		<div>
			<Dialog TransitionComponent={Transition} open={open} onClose={handleClose} maxWidth='sm' fullWidth={true}>
				<DialogTitle>Thêm mẫu cửa</DialogTitle>
				<DialogContent>
					<TextField
						error={formError.includes('name')}
						helperText={formError.includes('name') ? 'Trường thông tin bắt buộc' : ''}
						autoFocus
						margin='dense'
						id='contructionName'
						label='Tên công trình'
						value={name}
						onChange={handleChange}
						type='text'
						fullWidth
						variant='standard'
					/>
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
