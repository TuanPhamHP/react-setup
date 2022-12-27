function returnFileName(_name) {
	const stringName = String(_name);
	const prevDotName = stringName.slice(0, stringName.lastIndexOf('.'));
	let txt = '';
	if (prevDotName.length > 15) {
		txt = prevDotName.slice(0, 12) + '..';
	} else {
		txt = prevDotName;
	}
	return `${txt}.${stringName.split('.').pop()}`;
}
function handleSizeConvert(_size) {
	if (!_size) {
		return 0 + ' B';
	}
	if (_size < 1024) {
		return _size + ' B';
	}
	if (_size < 1024 * 1024) {
		return (_size / 1024).toFixed(2) + ' KB';
	}
	if (_size < 1024 * 1024 * 1024) {
		return (_size / (1024 * 1024)).toFixed(2) + ' MB';
	}
	return _size / (1024 * 1024 * 1024) + ' GB';
}
function getImageDimensions(img) {
	return new Promise(resolve => {
		img.onload = () => {
			resolve({ width: img.width, height: img.height });
		};
	});
}

export const onChangesImage = file => {
	return new Promise(resolve => {
		if (file.type.includes('image')) {
			const reader = new FileReader();
			reader.onload = async event => {
				const img = document.createElement('img');
				img.src = event.target.result;
				const { width, height } = await getImageDimensions(img);
				resolve({
					_id: `${new Date().getTime()}_${Math.random()}`,
					name: file.name,
					src: event.target.result,
					url: event.target.result,
					type: 'image',
					width,
					height,
					blob: file,
					sizes: file.size,
				});
			};
			reader.readAsDataURL(file);
		} else {
			resolve({
				_id: `${new Date().getTime()}_${Math.random()}`,
				name: file.name,
				type: 'file',
				blob: file,
				sizes: file.size,
			});
		}
	});
};
