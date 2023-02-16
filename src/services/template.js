const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const userRepo = axios => {
	return {
		getListData(payload = {}) {
			return axios
				.get(`${REACT_APP_API_BASE_URL}/templates`, {
					params: payload,
				})
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
				url: `${REACT_APP_API_BASE_URL}/templates/${_id}`,
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
				.put(`${REACT_APP_API_BASE_URL}/templates/${id}`, payload)
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
