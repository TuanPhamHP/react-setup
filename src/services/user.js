import Axios from 'axios';
// import { setCookie } from '@/helpers/customizeCookie.js';
// import store from '@/store';

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const userRepo = axios => {
	return {
		loginUser(payload) {
			return axios
				.post(`${REACT_APP_API_BASE_URL}/auth/login`, payload, {
					headers: {
						Authorization: '',
						'Access-Control-Allow-Origin': '*',
					},
				})
				.then(res => {
					return res;
				})
				.catch(err => {
					return err.response;
				});
		},

		getUserInfo(_token = '') {
			if (_token) {
				Axios.defaults.headers = { Authorization: `Bearer ${_token}` };
			}
			return _token
				? axios
						.get(`${REACT_APP_API_BASE_URL}/admins/profile`, {
							headers: {
								Authorization: `Bearer ${_token}`,
							},
						})
						.then(res => {
							return res;
						})
						.catch(err => {
							return err.response;
						})
				: axios
						.get(`${REACT_APP_API_BASE_URL}/admins/profile`)
						.then(res => {
							return res;
						})
						.catch(err => {
							return err.response;
						});
		},
		create(payload = {}) {
			return axios
				.post(`${REACT_APP_API_BASE_URL}/roles?include=permissions`, payload)
				.then(res => {
					return res;
				})
				.catch(err => {
					return err.response;
				});
		},

		delete(_id) {
			return axios({
				method: 'DELETE',
				url: `api/roles/${_id}`,
			})
				.then(res => {
					return res;
				})
				.catch(err => {
					return err.response;
				});
		},

		register(payload) {
			return axios
				.post(`${REACT_APP_API_BASE_URL}/user/register`, payload)
				.then(res => {
					return res;
				})
				.catch(err => {
					return err.response;
				});
		},
		resetPassword(payload) {
			return axios
				.post(`${REACT_APP_API_BASE_URL}/user/reset-password`, payload)
				.then(res => {
					return res;
				})
				.catch(err => {
					return err.response;
				});
		},
		updatePassword(token, payload) {
			return axios
				.post(`${REACT_APP_API_BASE_URL}/user/reset-password/${token}`, payload)
				.then(res => {
					return res;
				})
				.catch(err => {
					return err.response;
				});
		},
		changePassword(payload) {
			return axios
				.post(`${REACT_APP_API_BASE_URL}/user/me/change-password`, payload)
				.then(res => {
					return res;
				})
				.catch(err => {
					return err.response;
				});
		},
		update(payload, id) {
			return axios
				.post(`${REACT_APP_API_BASE_URL}/roles/${id}?include=permissions`, payload)
				.then(res => {
					return res;
				})
				.catch(err => {
					return err.response;
				});
		},
		updateAvatar(payload, id) {
			return axios
				.post(`${REACT_APP_API_BASE_URL}/user/me/upload-avatar`, payload)
				.then(res => {
					return res;
				})
				.catch(err => {
					return err.response;
				});
		},
	};
};
export default userRepo;
