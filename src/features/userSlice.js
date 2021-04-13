import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from 'api';

export const getProfile = createAsyncThunk('user/getProfile', async () => {
	const response = await API.user.getProfile();
	return response.data.user;
});

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: {},
		loading: false,
		error: ''
	},
	reducers: {},
	extraReducers: {
		[getProfile.pending](state) {
			state.loading = true;
		},
		[getProfile.rejected](state, action) {
			state.loading = false;
			state.error = action.error;
		},
		[getProfile.fulfilled](state, action) {
			state.loading = false;
			state.user = action.payload;
		}
	}
});

export const actions = {
	getProfile
};

export default userSlice.reducer;
