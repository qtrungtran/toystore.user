import apiClient from "./apiClient";

const transactionAPI = {
	getAll: () => {
		const url = "/transactions";
		return apiClient.get(url);
	},
	add: ({ userId, orderId, payoutId, amount, status }) => {
		const url = "/transactions";
		return apiClient.post(url, {
			userId,
			orderId,
			payoutId,
			amount,
			status
		});
	}
};

export default transactionAPI;
