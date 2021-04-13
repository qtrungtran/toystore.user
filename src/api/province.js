import apiClient from './apiClient';

const provinceAPI = {
	getAll: () => {
		const url = '/provinces';
		return apiClient.get(url);
	},
	getAllWithDistricts: () => {
		const url = `/provinces/districts`;
		return apiClient.get(url);
	}
};

export default provinceAPI;
