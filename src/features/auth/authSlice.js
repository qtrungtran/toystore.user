import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "api";
import {
	localAuthenticate,
	removeAccessToken,
	setAccessToken
} from "utils/localAuth";

export const signup = createAsyncThunk(
	"auth/signup",
	({ username, email, address, province, district, password, onComplete }) => {
		return API.auth
			.signup({ username, email, address, province, district, password })
			.then(({ data }) => {
				onComplete(null, data);
				return data;
			})
			.catch(error => {
				onComplete(error.response.data, null);
				throw new Error(error.response.data);
			});
	}
);

export const activate = createAsyncThunk(
	"auth/activate",
	({ key, onComplete }) => {
		return API.auth
			.activate(key)
			.then(({ data }) => {
				onComplete(null, data);
				return data;
			})
			.catch(error => {
				onComplete(error.response.data, null);
				throw new Error(error.response.data);
			});
	}
);

export const signin = createAsyncThunk(
	"auth/signin",
	({ username, password, onComplete }, { dispatch }) => {
		return API.auth
			.signin({ username, password })
			.then(({ data }) => {
				setAccessToken(data.token);
				dispatch(authSlice.actions.localAuthenticate());
				onComplete(null, data);
				return data;
			})
			.catch(error => {
				onComplete(error.response.data, null);
				throw new Error(error.response.data);
			});
	}
);

// export const signout = createAsyncThunk(
// 	'auth/signout', () => {
// 		removeAccessToken();
// 	}
// )

export const changePassword = createAsyncThunk(
	"auth/password-change",
	({ oldPassword, newPassword, confirmPassword, id, onComplete }) => {
		return API.auth
			.changePassword({
				oldPassword,
				newPassword,
				confirmPassword,
				id
			})
			.then(({ data }) => {
				onComplete(null, data);
				return data;
			})
			.catch(error => {
				onComplete(error.response.data, null);
				throw new Error(error.response.data);
			});
	}
);

export const resetPassword = createAsyncThunk(
	"auth/resetPassword",
	({ email, onComplete }) => {
		return API.auth
			.resetPassword({ email })
			.then(({ data }) => {
				onComplete(null, data);
				return data;
			})
			.catch(error => {
				onComplete(error.response.data, null);
				throw new Error(error.response.data);
			});
	}
);

export const confirmResetPassword = createAsyncThunk(
	"auth/confirmResetPassword",
	({ activation_key, password1, password2, onComplete }) => {
		return API.auth
			.confirmResetPassword({ activation_key, password1, password2 })
			.then(({ data }) => {
				onComplete(null, data);
				return data;
			})
			.catch(error => {
				onComplete(error.response.data, null);
				throw new Error(error.response.data);
			});
	}
);

export const getAllUsers = createAsyncThunk("user/getAll", ({ onComplete }) => {
	return API.auth
		.getAllUsers()
		.then(({ data }) => {
			onComplete(null, data);
			return data;
		})
		.catch(error => {
			onComplete(error.response.data, null);
			throw new Error(error.response.data);
		});
});

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		authState: {
			...localAuthenticate()
		},
		signup: {
			submitting: false,
			errors: {}
		},
		activation: {
			activating: false
		},
		signin: {
			submitting: false,
			errors: {}
		},
		changePassword: {
			submitting: false,
			errors: {}
		},
		resetPassword: {
			submitting: false,
			error: {}
		},
		confirmResetPassword: {
			submitting: false,
			error: {}
		},
		getAllUsers: {
			users: [],
			loading: false,
			error: ""
		}
	},
	reducers: {
		localAuthenticate(state) {
			state.authState = localAuthenticate();
		},
		logout(state) {
			removeAccessToken();
			state.authState = localAuthenticate();
		}
	},
	extraReducers: {
		// signup
		[signup.fulfilled](state) {
			state.signup.submitting = false;
		},
		[signup.pending](state) {
			state.signup.submitting = true;
		},
		[signup.rejected](state, action) {
			state.signup.submitting = false;
			state.signup.errors = action.error;
		},
		// activation
		[activate.pending](state) {
			state.activation.activating = true;
		},
		[activate.fulfilled](state) {
			state.activation.activating = false;
		},
		[activate.rejected](state) {
			state.activation.activating = false;
		},
		// sign-in
		[signin.pending](state) {
			state.signin.submitting = true;
		},
		[signin.fulfilled](state) {
			state.signin.submitting = false;
		},
		[signin.rejected](state) {
			state.signin.submitting = false;
		},
		// change-password
		[changePassword.pending](state) {
			state.changePassword.submitting = true;
		},
		[changePassword.fulfilled](state) {
			state.changePassword.submitting = false;
		},
		[changePassword.rejected](state) {
			state.changePassword.submitting = false;
		},
		// reset password
		[resetPassword.pending](state) {
			state.resetPassword.submitting = true;
		},
		[resetPassword.fulfilled](state) {
			state.resetPassword.submitting = false;
		},
		[resetPassword.rejected](state, action) {
			state.resetPassword.submitting = false;
			state.resetPassword.errors = action.error;
		},
		// confirm reset password
		[confirmResetPassword.pending](state) {
			state.confirmResetPassword.submitting = true;
		},
		[confirmResetPassword.fulfilled](state) {
			state.confirmResetPassword.submitting = false;
		},
		[confirmResetPassword.rejected](state, action) {
			state.confirmResetPassword.submitting = false;
			state.confirmResetPassword.errors = action.error;
		},
		// get all users
		[getAllUsers.pending](state) {
			state.getAllUsers.loading = true;
		},
		[getAllUsers.rejected](state, action) {
			state.getAllUsers.loading = false;
			state.getAllUsers.error = action.error;
		},
		[getAllUsers.fulfilled](state, action) {
			state.getAllUsers.loading = false;
			state.getAllUsers.users = action.payload;
		}
	}
});

export const actions = {
	...authSlice.actions,
	signin,
	signup,
	activate,
	changePassword,
	resetPassword,
	confirmResetPassword,
	getAllUsers
};

export default authSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit'

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     isAuthenticate: false
//   },
//   reducers: {}
// })

// export const authActions = {
//   ...authSlice.actions
// }
// export default authSlice.reducer
