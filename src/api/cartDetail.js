import apiClient from './apiClient';

const cartDetailAPI = {
	getAll: () => {
		const url = '/cart-details';
		return apiClient.get(url);
	},
	getByCart: cartId => {
		const url = `/cart-details/cart/${cartId}`;
		return apiClient.get(url);
	},
	get: id => {
		const url = `/cart-details/${id}`;
		return apiClient.get(url);
	},
	add: ({ productId, cartId, quantity, price }) => {
		const url = `/cart-details`;
		return apiClient.post(url, {
			productId,
			cartId,
			quantity,
			price
		});
	},
	editQuantity: ({ productId, cartId, quantity }) => {
		const url = `/cart-details/quantity`;
		return apiClient.put(url, {
			productId,
			cartId,
			quantity
		});
	},
	delete: ({ productId, cartId }) => {
		const url = `/cart-details/delete`;
		return apiClient.put(url, {
			productId,
			cartId
		});
	}
};

export default cartDetailAPI;
