import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/userAuth';
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});
export default function FormDialog(props) {
	const [open, setOpen] = React.useState(props.openDialog);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClickOpen = () => {
		props.setOpenDialog(true);
	};
	const clearData = () => {};
	const handleSubmit = () => {
		dispatch(logOut());
		navigate('/login');
		props.setOpenDialog(false);
	};

	const handleClose = () => {
		props.setOpenDialog(false);
	};
	React.useEffect(() => {
		setOpen(props.openDialog);
		clearData();
	}, [props.openDialog]);

	return (
		<div>
			<Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth={true}>
				<DialogTitle>Đăng xuất</DialogTitle>
				<DialogContent>
					<DialogContentText>Bạn chắc chắn muốn đăng xuất chứ?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Hủy</Button>
					<Button onClick={handleSubmit} color='buttonCancel'>
						Đồng ý
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
