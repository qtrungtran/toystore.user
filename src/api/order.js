import apiClient from "./apiClient";

const orderAPI = {
	getAll: () => {
		const url = "/orders";
		return apiClient.get(url);
	},
	getPerPage: (options = {}) => {
		const url = "/orders/pagination";
		return apiClient.get(url, options);
	},
	get: id => {
		const url = `/orders/${id}`;
		return apiClient.get(url);
	},
	getByUser: (options = {}) => {
		const url = `/orders/user`;
		return apiClient.get(url, options);
	},
	getByOwner: (options = {}) => {
		const url = `/orders/owner`;
		return apiClient.get(url, options);
	},
	add: ({
		statusId,
		paymentMethod,
		deliveryPhoneNumber,
		deliveryAddress,
		province,
		district,
		transId
	}) => {
		const url = `/orders`;
		return apiClient.post(url, {
			statusId,
			paymentMethod,
			deliveryPhoneNumber,
			deliveryAddress,
			province,
			district,
			transId
		});
	},
	//   edit: ({categoryId, name, description, quantity, price}, id) => {
	//     const url = `/orders/${id}`;
	//     return apiClient.put(url, {
	//       categoryId,
	// 			name,
	// 			description,
	// 			quantity,
	// 			price
	//     });
	//   },
	editStatus: ({ statusId }, id) => {
		const url = `/orders/${id}/status`;
		return apiClient.put(url, {
			statusId
		});
	},
	delete: id => {
		const url = `/orders/delete/${id}`;
		return apiClient.put(url);
	}
};

export default orderAPI;
