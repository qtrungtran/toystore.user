import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "api";

export const getByUser = createAsyncThunk("cart/getByUser", async () => {
	const response = await API.cart.getByUser();
	return response.data.cart;
});

export const addCartDetail = createAsyncThunk(
	"cart/addCartDetail",
	async ({ productId, cartId, quantity, price }) => {
		const response = await API.cartDetail.add({
			productId,
			cartId,
			quantity,
			price
		});
		return response.data;
	}
);

export const editCartDetail = createAsyncThunk(
	"cart/editCartDetail",
	async ({ productId, cartId, quantity }) => {
		const response = await API.cartDetail.editQuantity({
			productId,
			cartId,
			quantity
		});
		return response.data;
	}
);

export const deleteCartDetail = createAsyncThunk(
	"cart/deleteCartDetail",
	async ({ productId, cartId }) => {
		const response = await API.cartDetail.delete({ productId, cartId });
		return response.data;
	}
);

export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cart: {},
		loading: false,
		error: ""
	},
	reducers: {},
	extraReducers: {
		[getByUser.pending](state) {
			state.loading = true;
		},
		[getByUser.rejected](state, action) {
			state.loading = false;
			state.error = action.error;
		},
		[getByUser.fulfilled](state, action) {
			state.loading = false;
			state.cart = action.payload;
		},
		// add
		[addCartDetail.pending](state) {
			state.loading = true;
		},
		[addCartDetail.rejected](state, action) {
			state.loading = false;
			state.error = action.error;
		},
		[addCartDetail.fulfilled](state, action) {
			state.loading = false;
			// state.cart = action.payload;
			const index = state.cart.cartDetails.findIndex(
				detail =>
					detail.productId === action.payload.productId &&
					detail.cartId === action.payload.cartId
			);
			if (index !== -1) {
				state.cart = {
					...state.cart,
					cartDetails: state.cart.cartDetails.map((detail, i) => {
						if (i === index) {
							return { ...action.payload };
						} else {
							return { ...detail };
						}
					})
				};
			} else {
				const cartDetails = state.cart.cartDetails;
				cartDetails.push(action.payload);
				state.cart = {
					...state.cart,
					cartDetails: cartDetails
				};
			}
		},
		// delete
		[deleteCartDetail.pending](state) {
			state.loading = true;
		},
		[deleteCartDetail.rejected](state, action) {
			state.loading = false;
			state.error = action.error;
		},
		[deleteCartDetail.fulfilled](state, action) {
			state.loading = false;
			const index = state.cart.cartDetails.findIndex(
				detail =>
					detail.productId === action.payload.productId &&
					detail.cartId === action.payload.cartId
			);
			state.cart.cartDetails.splice(index, 1);
			state.cart = {
				...state.cart,
				cartDetails: state.cart.cartDetails
			};
		},
		// edit
		[editCartDetail.pending](state) {
			state.loading = true;
		},
		[editCartDetail.rejected](state, action) {
			state.loading = false;
			state.error = action.error;
		},
		[editCartDetail.fulfilled](state, action) {
			state.loading = false;
			const index = state.cart.cartDetails.findIndex(
				detail =>
					detail.productId === action.payload.productId &&
					detail.cartId === action.payload.cartId
			);
			state.cart = {
				...state.cart,
				cartDetails: state.cart.cartDetails.map((detail, i) => {
					if (i === index) {
						return { ...detail, quantity: action.payload.quantity };
					} else {
						return { ...detail };
					}
				})
			};
		}
	}
});

export const actions = {
	getByUser,
	addCartDetail,
	deleteCartDetail,
	editCartDetail
};

export default cartSlice.reducer;
