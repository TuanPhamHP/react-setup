import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import Input from '@mui/material/Input';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import ArchiveIcon from '@mui/icons-material/Archive';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListItemPreview from '../../components/Constructions/ListItemPreview';
import CreateNewDoorSetContainer from '../../components/Constructions/CreateNewDoorSetContainer';
import CreateContructionsItemsTable from '../../components/Table/CreateContructionsItemsTable';
import { useSelector, useDispatch } from 'react-redux';
import { selectDragLocal, setDroppedItem } from '../../store/dragLocal';

import styles from '../../assets/styles/ConstructPage.module.scss';
export default function ConstructionsList() {
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
	const dragLocal = useSelector(selectDragLocal);
	const [isEdit, setIsEdit] = useState([]);
	const [alType, setAlType] = useState(null);
	const [onCreateProcess, setOnCreateProcess] = useState(false);
	const [rows, setRows] = useState([
		createData('United States', 'US', 327167434, 9833520),
		createData('Canada', 'CA', 37602103, 9984670),
	]);
	const [maxHeightBottom, setMaxHeightBottom] = useState('auto');

	const dispatch = useDispatch();

	const changeAlType = (e, data) => {
		setAlType(data);
	};

	function getMaxHeightBottom() {
		const containerGrid = document.querySelector('.constructionsTopGridContainer');
		const topGrid = document.querySelector('.constructionsTopGrid');
		let r = '';
		if (containerGrid && topGrid) {
			r = `${containerGrid.clientHeight - topGrid.clientHeight}px`;
		}
		setMaxHeightBottom(r || 'auto');
	}

	const handleClickEdit = _name => {
		if (!isEdit.includes(_name)) {
			setIsEdit([...isEdit, _name]);
		}
	};
	const handleClickCancel = _name => {
		if (isEdit.includes(_name)) {
			setIsEdit(isEdit.filter(o => o !== _name));
		}
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};
	function createData(name, code, population, size) {
		const density = population / size;
		return { name, code, population, size, density };
	}

	const handleAddNewDroppedItem = item => {
		if (!item) {
			return;
		}
		handleOpenCreateNewDoorSet();
		const newRow = createData(item.title, new Date().getTime(), 327167434, 9833520);
		setRows([...rows, newRow]);
		dispatch(setDroppedItem(null));
	};
	function handleOpenCreateNewDoorSet() {
		setOnCreateProcess(true);
	}
	function handleCloseCreateNewDoorSet() {
		setOnCreateProcess(false);
	}

	useEffect(() => {
		console.log(dragLocal.droppedItem);
		handleAddNewDroppedItem(dragLocal.droppedItem);
	}, [dragLocal.droppedItem]);

	return (
		<div className='page-container'>
			<div className='page-header'>
				<h1 className='page-title'>Tạo mới dự án</h1>
			</div>

			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 12, sm: 12, md: 12 }}
				className={`constructionsTopGridContainer`}
			>
				<Grid item={true} xs={12} sm={12} md={4} lg={3} sx={{ padding: '0 12px' }}>
					<div className={`${dragLocal ? styles.listItemWrNoOf : styles.listItemWr} box-shadow-m1`}>
						<ListItemPreview />
					</div>
				</Grid>
				<Grid
					item={true}
					xs={12}
					sm={12}
					md={8}
					lg={9}
					sx={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Grid
						className={`box-shadow-m1 grid-reset-margin ${styles.constructionsFormTop} constructionsTopGrid ${
							onCreateProcess ? styles.constructionsFormTopHiding : ''
						}`}
						container
						sx={{ padding: '12px', marginBottom: 2 }}
						columns={{ xs: 12, sm: 12, md: 12 }}
					>
						<Grid item={true} xs={12} sm={6} md={4} sx={{ padding: 1 }}>
							<div className='d-flex flex-column'>
								<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Tên dự án:</p>
								<FormControl fullWidth={true} sx={{ m: 0, p: 0 }} variant='filled'>
									<Input
										type='text'
										placeholder='Tên dự án'
										readOnly={!isEdit.includes('name')}
										fullWidth={true}
										endAdornment={
											<InputAdornment position='end'>
												{isEdit.includes('name') ? (
													<IconButton
														aria-label='toggle edit visibility'
														onClick={() => {
															handleClickCancel('name');
														}}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														<ClearIcon />
													</IconButton>
												) : (
													<IconButton
														aria-label='toggle edit visibility'
														onClick={() => {
															handleClickEdit('name');
														}}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														<EditIcon />
													</IconButton>
												)}
											</InputAdornment>
										}
									/>
								</FormControl>
							</div>
						</Grid>

						<Grid item={true} xs={12} sm={6} md={4} sx={{ padding: 1 }}>
							<div className='d-flex flex-column'>
								<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Số điện thoại:</p>
								<FormControl fullWidth={true} sx={{ m: 0, p: 0 }} variant='filled'>
									<Input
										type='text'
										placeholder='Số điện thoại'
										fullWidth={true}
										readOnly={!isEdit.includes('phone')}
										endAdornment={
											<InputAdornment position='end'>
												{isEdit.includes('phone') ? (
													<IconButton
														aria-label='toggle edit visibility'
														onClick={() => {
															handleClickCancel('phone');
														}}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														<ClearIcon />
													</IconButton>
												) : (
													<IconButton
														aria-label='toggle edit visibility'
														onClick={() => {
															handleClickEdit('phone');
														}}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														<EditIcon />
													</IconButton>
												)}
											</InputAdornment>
										}
									/>
								</FormControl>
							</div>
						</Grid>

						<Grid item={true} xs={12} sm={6} md={4} sx={{ padding: 1 }}>
							<div className='d-flex  flex-column'>
								<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Địa chỉ:</p>
								<FormControl fullWidth={true} sx={{ m: 0, p: 0 }} variant='filled'>
									<Input
										type='text'
										placeholder='Địa chỉ'
										fullWidth={true}
										readOnly={!isEdit.includes('address')}
										endAdornment={
											<InputAdornment position='end'>
												{isEdit.includes('address') ? (
													<IconButton
														aria-label='toggle edit visibility'
														onClick={() => {
															handleClickCancel('address');
														}}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														<ClearIcon />
													</IconButton>
												) : (
													<IconButton
														aria-label='toggle edit visibility'
														onClick={() => {
															handleClickEdit('address');
														}}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														<EditIcon />
													</IconButton>
												)}
											</InputAdornment>
										}
									/>
								</FormControl>
							</div>
						</Grid>

						<Grid item={true} xs={12} sm={6} md={4} sx={{ padding: 1 }}>
							<div className='d-flex  flex-column'>
								<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Loại nhôm:</p>
								<Autocomplete
									{...defaultProps}
									onChange={changeAlType}
									disableClearable
									noOptionsText='Không có kết quả phù hợp'
									value={alType}
									isOptionEqualToValue={(option, value) => option.title === value.title}
									renderInput={params => <TextField {...params} placeholder='Loại nhôm' variant='standard' />}
								/>
							</div>
						</Grid>

						<Grid item={true} xs={12} sm={6} md={4} sx={{ padding: 1 }}>
							<div className='d-flex  flex-column'>
								<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Tổng diện tích:</p>
								<FormControl fullWidth={true} sx={{ m: 0, p: 0 }} variant='filled'>
									<Input
										type='text'
										placeholder='Tổng diện tích'
										fullWidth={true}
										readOnly={!isEdit.includes('totalSquare')}
										endAdornment={
											<InputAdornment position='end'>
												{isEdit.includes('totalSquare') ? (
													<IconButton
														aria-label='toggle edit visibility'
														onClick={() => {
															handleClickCancel('totalSquare');
														}}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														<ClearIcon />
													</IconButton>
												) : (
													<IconButton
														aria-label='toggle edit visibility'
														onClick={() => {
															handleClickEdit('totalSquare');
														}}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														<EditIcon />
													</IconButton>
												)}
											</InputAdornment>
										}
									/>
								</FormControl>
							</div>
						</Grid>
						<Grid item={true} xs={12} sm={6} md={4} sx={{ padding: 1, display: { xs: 'none', md: 'block' } }}></Grid>
						<Grid item={true} xs={12} sm={6} md={4} sx={{ padding: 1 }}>
							<div className='d-flex  flex-column'>
								<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Số bộ cửa:</p>
								<FormControl fullWidth={true} sx={{ m: 0, p: 0 }} variant='filled'>
									<Input
										type='text'
										placeholder='Số bộ cửa'
										fullWidth={true}
										readOnly={!isEdit.includes('noOfDoor')}
										endAdornment={
											<InputAdornment position='end'>
												{isEdit.includes('noOfDoor') ? (
													<IconButton
														aria-label='toggle edit visibility'
														onClick={() => {
															handleClickCancel('noOfDoor');
														}}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														<ClearIcon />
													</IconButton>
												) : (
													<IconButton
														aria-label='toggle edit visibility'
														onClick={() => {
															handleClickEdit('noOfDoor');
														}}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														<EditIcon />
													</IconButton>
												)}
											</InputAdornment>
										}
									/>
								</FormControl>
							</div>
						</Grid>

						<Grid item={true} xs={12} sm={6} md={4} sx={{ padding: 1 }}>
							<div className='d-flex  flex-column'>
								<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Ngày tạo</p>
								<FormControl fullWidth={true} sx={{ m: 0, p: 0 }} variant='filled'>
									<Input type='text' placeholder='Ngày tạo' fullWidth={true} readOnly={true} />
								</FormControl>
							</div>
						</Grid>
						<Grid item={true} xs={12} sm={6} md={4} sx={{ padding: 1, display: { xs: 'none', md: 'block' } }}></Grid>

						<Grid item={true} xs={12} sm={6} md={4} sx={{ padding: 1 }}>
							<div className='d-flex  flex-column'>
								<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Giá bán</p>
								<FormControl fullWidth={true} sx={{ m: 0, p: 0 }} variant='filled'>
									<Input
										type='text'
										placeholder='Giá bán'
										fullWidth={true}
										readOnly={!isEdit.includes('salePrice')}
										endAdornment={
											<InputAdornment position='end'>
												{isEdit.includes('salePrice') ? (
													<IconButton
														aria-label='toggle edit visibility'
														onClick={() => {
															handleClickCancel('salePrice');
														}}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														<ClearIcon />
													</IconButton>
												) : (
													<IconButton
														aria-label='toggle edit visibility'
														onClick={() => {
															handleClickEdit('salePrice');
														}}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														<EditIcon />
													</IconButton>
												)}
											</InputAdornment>
										}
									/>
								</FormControl>
							</div>
						</Grid>

						<Grid item={true} xs={12} sm={6} md={4} sx={{ padding: 1 }}>
							<div className='d-flex  flex-column'>
								<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Chiết khấu</p>
								<FormControl fullWidth={true} sx={{ m: 0, p: 0 }} variant='filled'>
									<Input
										type='text'
										placeholder='Chiết khấu'
										fullWidth={true}
										readOnly={!isEdit.includes('discount')}
										endAdornment={
											<InputAdornment position='end'>
												{isEdit.includes('discount') ? (
													<IconButton
														aria-label='toggle edit visibility'
														onClick={() => {
															handleClickCancel('discount');
														}}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														<ClearIcon />
													</IconButton>
												) : (
													<IconButton
														aria-label='toggle edit visibility'
														onClick={() => {
															handleClickEdit('discount');
														}}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														<EditIcon />
													</IconButton>
												)}
											</InputAdornment>
										}
									/>
								</FormControl>
							</div>
						</Grid>

						<Grid item={true} xs={12} sm={6} md={4} sx={{ padding: 1 }}>
							<div className='d-flex  flex-column'>
								<p className={`m-0 text-nowrap ${styles.fieldTitle}`}>Giá cuối</p>
								<Button
									variant='contained'
									className='no-box-shadow'
									sx={{
										display: 'block',

										whiteSpace: 'nowrap',
										textTransform: 'none',
									}}
								>
									Xuất báo giá
								</Button>
							</div>
						</Grid>
					</Grid>
					<div
						className={`box-shadow-m1 ${styles.constructionsFormBottom} mod-webkit-scroll-m1`}
						id='resultPos'
						style={{ padding: '20px', height: '100%', maxHeight: 'auto' }}
					>
						{onCreateProcess ? (
							<IconButton
								variant='contained'
								className='no-box-shadow'
								sx={{
									whiteSpace: 'nowrap',
									textTransform: 'none',
								}}
								onClick={handleCloseCreateNewDoorSet}
							>
								<ArrowBackIcon fontSize='inherit' color='dark' />
							</IconButton>
						) : (
							<></>
						)}
						{dragLocal.itemSidebarOndrag ? (
							<div className={styles.dropBox}>
								<ArchiveIcon fontSize='inherit' color='primary' />
								<h3>Kéo và thả bộ cửa tại đây để thêm mới</h3>
							</div>
						) : (
							<></>
						)}

						<div>
							{onCreateProcess ? (
								<>
									<CreateNewDoorSetContainer items={rows} />
								</>
							) : (
								<>
									<CreateContructionsItemsTable rows={rows} />
									<Button
										variant='contained'
										className='no-box-shadow'
										sx={{
											display: 'block',
											margin: 'auto',
											whiteSpace: 'nowrap',
											textTransform: 'none',
										}}
										onClick={handleOpenCreateNewDoorSet}
									>
										Thêm
									</Button>
								</>
							)}
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
