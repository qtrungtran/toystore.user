import apiClient from "./apiClient";

// const url = "/user_registration";

const signup = ({ username, email, address, province, district, password }) => {
	// const formData = new FormData();
	// formData.append('username', username);
	// formData.append('email', email);
	// formData.append('password', password);
	// return apiClient.post(`/users/`, formData, {
	// 	headers: {
	// 		'Content-Type': 'multipart/form-data'
	// 	}
	// });
	return apiClient.post(`/users`, {
		username,
		email,
		address,
		province,
		district,
		password
	});
};

const signin = ({ username, password }) => {
	return apiClient.post(`/auth/login/`, { username, password });
};

const getAllUsers = () => {
	return apiClient.get(`/users/`);
};

// const activate = (key) => {
//   return apiClient.get(`${url}/activation/`, { params: { key } });
// };

const changePassword = ({ oldPassword, newPassword, confirmPassword, id }) => {
	return apiClient.put(`/users/${id}/password`, {
		oldPassword,
		newPassword,
		confirmPassword
	});
};

// const resetPassword = ({ email }) => {
//   return apiClient.post(`${url}/password-reset/`, { email });
// };

// const confirmResetPassword = ({ activation_key, password1, password2 }) => {
//   return apiClient.post(`${url}/password-reset/confirm/`, {
//     activation_key,
//     password1,
//     password2,
//   });
// };

const authAPI = {
	signup,
	signin,
	// activate,
	changePassword
	// resetPassword,
	// confirmResetPassword,
};

export default authAPI;
