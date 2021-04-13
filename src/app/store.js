import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import cartReducer from 'features/cartSlice';
import userReducer from 'features/userSlice';
import provinceReducer from 'features/provinceSlice';

export default configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
		user: userReducer,
		province: provinceReducer
	}
});
