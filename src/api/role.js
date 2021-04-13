import apiClient from "./apiClient";

const roleAPI = {
  getAll: () => {
    const url = "/roles";
    return apiClient.get(url);
  },
  get: (id) => {
    const url = `/roles/${id}`;
    return apiClient.get(url);
  },
};

export default roleAPI;
