import Cookies from "js-cookie";
import JwtDecode from "jwt-decode";

export const localAuthenticate = () => {
	// const token = Cookies.get("token");
	const token = localStorage.getItem("token");
	try {
		const tokenInfo = JwtDecode(token);
		return {
			isAuthenticated: true,
			tokenInfo
		};
	} catch (error) {
		return {
			isAuthenticated: false,
			tokenInfo: null
		};
	}
};

// export const setAccessToken = (token) => Cookies.set("token", token);
export const setAccessToken = token => localStorage.setItem("token", token);

export const getAccessToken = () => {
	// const token = Cookies.get("token");
	const token = localStorage.getItem("token");
	return token && `Bearer ${localStorage.getItem("token")}`;
};

export const removeAccessToken = () => {
	// return Cookies.remove("token");
	return localStorage.removeItem("token");
};
