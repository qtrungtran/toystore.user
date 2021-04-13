import apiClient from './apiClient';

const transportationAPI = {
	getAll: () => {
		const url = '/transportation';
		return apiClient.get(url);
	}
};

export default transportationAPI;
