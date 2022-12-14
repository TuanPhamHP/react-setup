export const parseNewsStatusClass = _statusId => {
	switch (_statusId) {
		case 1:
			return 'semantic_info';
		case 2:
			return 'semantic_success';
		case 3:
			return 'semantic_warning';

		default:
			return 'unknow_color';
	}
};
export const parseNewsStatusTextClass = _statusId => {
	const prefix = parseNewsStatusClass(_statusId);
	return prefix + '--text';
};

// REPORTS
export const parseNewsReportStatus = _statusId => {
	switch (_statusId) {
		case 1:
			return 'Chưa xử lý';
		case 2:
			return 'Đã xóa';
		case 3:
			return 'Đã giữ lại';

		default:
			return 'Không rõ';
	}
};
export const getErrorMessage = _errorCode => {
	switch (_errorCode) {
		case 'required':
			return 'Trường thông tin bắt buộc';

		default:
			return '';
	}
};

export const crypt = (salt, text) => {
	const textToChars = text => text.split('').map(c => c.charCodeAt(0));
	const byteHex = n => ('0' + Number(n).toString(16)).slice(-2);
	const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

	return text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('');
};

export const decrypt = (salt, encoded) => {
	if (!encoded || typeof encoded !== 'string') {
		return encoded;
	}
	const textToChars = text => text.split('').map(c => c.charCodeAt(0));
	const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
	return String(encoded || '')
		.match(/.{1,2}/g)
		.map(hex => parseInt(hex, 16))
		.map(applySaltToChar)
		.map(charCode => String.fromCharCode(charCode))
		.join('');
};
export const jsonCopy = _data => {
	try {
		return JSON.parse(JSON.stringify(_data));
	} catch (error) {
		console.log(error);
		return _data;
	}
};
