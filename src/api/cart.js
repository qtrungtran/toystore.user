import apiClient from './apiClient';

const cartAPI = {
	getAll: () => {
		const url = '/carts';
		return apiClient.get(url);
	},
	getByUser: () => {
		const url = '/carts/user';
		return apiClient.get(url);
	},
	get: id => {
		const url = `/carts/${id}`;
		return apiClient.get(url);
	},
	add: ({ userId }) => {
		const url = `/carts`;
		return apiClient.post(url, {
			userId
		});
	},
	// edit: ({ username, email, phoneNumber, address }, id) => {
	//   const url = `/carts/${id}`;
	//   return apiClient.put(url, {
	//     username,
	//     email,
	//     phoneNumber,
	//     address,
	//   });
	// },
	// uploadAvatar: (image, id) => {
	//   const url = `/carts/${id}/avatar`;
	//   return apiClient.put(url, image);
	// },
	delete: id => {
		const url = `/carts/delete/${id}`;
		return apiClient.put(url);
	}
};

export default cartAPI;
