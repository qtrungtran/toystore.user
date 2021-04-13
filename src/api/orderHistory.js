import apiClient from "./apiClient";

const orderHistoryAPI = {
	getAll: () => {
		const url = "/order-histories";
		return apiClient.get(url);
	},
	getByOrder: orderId => {
		const url = `/order-histories/order/${orderId}`;
		return apiClient.get(url);
	},
	get: id => {
		const url = `/order-histories/${id}`;
		return apiClient.get(url);
	},
	add: ({ orderId, name, note }) => {
		const url = `/order-histories`;
		return apiClient.post(url, {
			orderId,
			name,
			note
		});
	}

	// editStatus: ({ statusId }, id) => {
	//   const url = `/orders/${id}/status`;
	//   return apiClient.put(url, {
	//     statusId,
	//   });
	// },
	// delete: (id) => {
	//   const url = `/orders/delete/${id}`;
	//   return apiClient.put(url);
	// },
};

export default orderHistoryAPI;
