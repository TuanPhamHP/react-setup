const objectMarker = (obj, value) => {
	if (typeof obj !== 'object' || Array.isArray(obj.rules)) {
		return null;
	}

	const err = [];
	obj.rules.forEach(o => {
		const type = typeof value;
		let msg = '';
		if (o === 'required') {
			if (type === 'string') {
				msg += String(value).trim() ? '' : 'Không được để trống trường này';
			} else {
				msg += value || value === 0 ? '' : 'Không được để trống trường này';
			}
		}
		if (String(o).includes('length_')) {
			const count = Number.parseInt(o.replace('length_', ''));
			msg += String(value).trim().length < count ? '' : `Tối đa ${count} kí tự`;
		}
		if (String(o).includes('max_')) {
			const max = Number.parseInt(o.replace('max_', ''));
			msg += value < max ? '' : `Tối đa ${max}`;
		}
		if (String(o).includes('min_')) {
			const min = Number.parseInt(o.replace('min_', ''));
			msg += value > min ? '' : `Tối thiểu ${min}`;
		}
		if (msg) {
			err.push(msg);
		}
	});
};
