import axios from 'axios';
import user from './user';
import template from './template';
import aluminum from './aluminum';
import glass from './glass';

import { deleteCookie } from '../helpers/customizeCookie';
const onCatch = err => {
	if (
		err.response &&
		err.response.status === 400 &&
		String(err.response.data.message).toLowerCase().includes('token not')
	) {
		deleteCookie('token');
		window.location = '/login';
	}
};
// const axiosInstance = axios.create()
// console.log(axiosInstance.defaults.headers.common)

const services = (axios => {
	return {
		user: user(axios),
		template: template(axios),
		aluminum: aluminum(axios),
		glass: glass(axios),
	};
})(axios);
export default services;
