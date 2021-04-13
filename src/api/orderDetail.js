import apiClient from './apiClient';

const orderDetailAPI = {
	getAll: () => {
		const url = '/order-details';
		return apiClient.get(url);
	},
	get: id => {
		const url = `/order-details/${id}`;
		return apiClient.get(url);
	},
	add: ({ productId, orderId, quantity, price }) => {
		const url = `/order-details`;
		return apiClient.post(url, {
			productId,
			orderId,
			quantity,
			price
		});
	}
	//   edit: ({categoryId, name, description, quantity, price}, id) => {
	//     const url = `/order-details/${id}`;
	//     return apiClient.put(url, {
	//       categoryId,
	// 			name,
	// 			description,
	// 			quantity,
	// 			price
	//     });
	//   },
};

export default orderDetailAPI;
