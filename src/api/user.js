import apiClient from "./apiClient";

const userAPI = {
	getAll: () => {
		const url = "/users";
		return apiClient.get(url);
	},
	getProfile: () => {
		const url = "/users/profile";
		return apiClient.get(url);
	},
	get: id => {
		const url = `/users/${id}`;
		return apiClient.get(url);
	},
	add: ({ username, email, password, roleId, phoneNumber, address }) => {
		const url = `/users`;
		return apiClient.post(url, {
			username,
			email,
			password,
			roleId,
			phoneNumber,
			address
		});
	},
	edit: ({ username, email, phoneNumber, address, province, district }, id) => {
		const url = `/users/${id}`;
		return apiClient.put(url, {
			username,
			email,
			phoneNumber,
			address,
			province,
			district
		});
	},
	uploadAvatar: (image, id) => {
		const url = `/users/${id}/avatar`;
		return apiClient.put(url, image);
	},
	delete: id => {
		const url = `/users/delete/${id}`;
		return apiClient.put(url);
	}
};

export default userAPI;
