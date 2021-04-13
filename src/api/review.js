import apiClient from './apiClient';

const reviewAPI = {
	getAll: () => {
		const url = '/reviews';
		return apiClient.get(url);
	},
	getByProduct: productId => {
		const url = `/reviews/product/${productId}`;
		return apiClient.get(url);
	},
	get: id => {
		const url = `/reviews/${id}`;
		return apiClient.get(url);
	},
	add: ({ productId, content, star }) => {
		const url = `/reviews`;
		return apiClient.post(url, {
			productId,
			content,
			star
		});
	},
	delete: id => {
		const url = `/reviews/delete/${id}`;
		return apiClient.put(url);
	}
};

export default reviewAPI;
