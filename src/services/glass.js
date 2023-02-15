const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const userRepo = axios => {
	return {
		getListData(payload = {}) {
			return axios
				.get(`${REACT_APP_API_BASE_URL}/glasses`, {
					params: payload,
				})
				.then(res => {
					return res;
				})
				.catch(err => {
					return err.response;
				});
		},
		create(payload) {
			return axios
				.post(`${REACT_APP_API_BASE_URL}/glasses`, payload)
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
				url: `${REACT_APP_API_BASE_URL}/glasses/${_id}`,
			})
				.then(res => {
					return res;
				})
				.catch(err => {
					return err.response;
				});
		},
		update(payload, id) {
			return axios
				.put(`${REACT_APP_API_BASE_URL}/glasses/${id}`, payload)
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
