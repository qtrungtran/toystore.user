// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import API from 'api';

// export const getAll = createAsyncThunk('province/getAll', async () => {
// 	const response = await API.province.getAll();
// 	return response.data.provinces;
// });

// export const getAllWithDistricts = createAsyncThunk(
// 	'province/getAllWithDistricts',
// 	async () => {
// 		const response = await API.province.getAllWithDistricts();
// 		return response.data.provinces;
// 	}
// );

// export const provinceSlice = createSlice({
// 	name: 'province',
// 	initialState: {
// 		province: {
// 			provinceData: [],
// 			loading: false,
// 			error: ''
// 		},
// 		district: {
// 			districtData: {},
// 			loading: false,
// 			error: ''
// 		}
// 	},
// 	reducers: {},
// 	extraReducers: {
// 		[getAll.pending](state) {
// 			state.province.loading = true;
// 		},
// 		[getAll.rejected](state, action) {
// 			state.province.loading = false;
// 			state.province.error = action.error;
// 		},
// 		[getAll.fulfilled](state, action) {
// 			state.province.loading = false;
// 			state.province.provinceData = action.payload;
// 		},
// 		[getAllWithDistricts.pending](state) {
// 			state.district.loading = true;
// 		},
// 		[getAllWithDistricts.rejected](state, action) {
// 			state.district.loading = false;
// 			state.district.error = action.error;
// 		},
// 		[getAllWithDistricts.fulfilled](state, action) {
// 			state.district.loading = false;
// 			state.district.districtData = action.payload;
// 		}
// 	}
// });

// export const actions = {
// 	getAll,
// 	getAllWithDistricts
// };

// export default provinceSlice.reducer;
