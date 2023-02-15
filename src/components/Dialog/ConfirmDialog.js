import * as React from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
	const [open, setOpen] = React.useState(props.openDialog);

	const clearData = () => {};
	const handleSubmit = () => {
		props.onSubmit();
	};

	const handleClose = () => {
		props.closeDialog();
	};
	React.useEffect(() => {
		setOpen(props.openDialog);
		clearData();
	}, [props.openDialog]);

	return (
		<div>
			<Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth={true}>
				<DialogTitle>{props.title || 'Xác nhận'}</DialogTitle>
				<DialogContent>
					{props.isRawHtml ? (
						<div>{props.message || 'Bạn chắc chắn muốn tiếp tục?'}</div>
					) : (
						<DialogContentText>{props.message || 'Bạn chắc chắn muốn tiếp tục?'}</DialogContentText>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} disabled={props.loading}>
						Hủy
					</Button>
					<LoadingButton onClick={handleSubmit} color='buttonCancel' loading={props.loading}>
						Đồng ý
					</LoadingButton>
				</DialogActions>
			</Dialog>
		</div>
	);
}
