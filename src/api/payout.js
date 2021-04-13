import apiClient from "./apiClient";

const payoutAPI = {
	payout: ({ amount }) => {
		const url = "/payout";
		return apiClient.post(url, { amount });
	}
};

export default payoutAPI;
