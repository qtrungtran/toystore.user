import authAPI from "./auth";
import categoryAPI from "./category";
import userAPI from "./user";
import cartAPI from "./cart";
import cartDetailAPI from "./cartDetail";
import provinceAPI from "./province";

const API = {
	auth: authAPI,
	user: userAPI,
	category: categoryAPI,
	cart: cartAPI,
	cartDetail: cartDetailAPI,
	province: provinceAPI
};

export default API;
