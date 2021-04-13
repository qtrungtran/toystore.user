import axios from 'axios';
import ENV_VARS from 'env';
import { getAccessToken } from 'utils/localAuth';

const apiClient = axios.create({
	baseURL: ENV_VARS.apiURL
});

// Add a request interceptor
apiClient.interceptors.request.use(
	config => {
		// Do something before request is sent
		config.headers['Authorization'] = getAccessToken();
		return config;
	},
	error =>
		// Do something with request error
		Promise.reject(error)
);

// Add a response interceptor
apiClient.interceptors.response.use(
	response =>
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		response,
	error =>
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		Promise.reject(error)
);

export default apiClient;
