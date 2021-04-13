import apiClient from './apiClient';

const imageAPI = {
	uploadProductImage: (image, id) => {
		const url = `/images/${id}`;
		return apiClient.post(url, image);
	},
	setDefaultImage: id => {
		const url = `/images/default/${id}`;
		return apiClient.post(url);
	},
	delete: id => {
		const url = `/images/delete/${id}`;
		return apiClient.put(url);
	}
};

export default imageAPI;
