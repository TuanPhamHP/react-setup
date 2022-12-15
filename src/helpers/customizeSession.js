import { crypt, decrypt } from './FormatnParse';

const cryptStr = process.env.REACT_APP_KEY_CRYPTO || '';
export const setSession = (sName, sValue, shouldCrypt = false) => {
	try {
		const storedVal = shouldCrypt ? crypt(cryptStr, sValue) : sValue;
		sessionStorage.setItem(sName, storedVal);
	} catch (error) {
		console.error('Error when try to set a session via helper: setSession:', error);
	}
};
export const getSession = (sName, shouldDecrypt = false) => {
	try {
		const res = sessionStorage.getItem(sName);
		return shouldDecrypt ? decrypt(cryptStr, res) : res;
	} catch (error) {
		console.error('Error when try to get a session via helper: getSession:', error);
		return '';
	}
};
export const deleteSession = cName => {
	try {
		sessionStorage.removeItem(cName);
	} catch (error) {
		console.error('Error when try to delete a session via helper: deleteSession:', error);
	}
};
