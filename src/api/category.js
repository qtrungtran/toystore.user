import apiClient from './apiClient';

const categoryAPI = {
  getAll: () => {
    const url = '/categories';
    return apiClient.get(url);
  },
  get: id => {
    const url = `/categories/${id}`;
    return apiClient.get(url);
  },
  add: ({name}) => {
    const url = `/categories`;
    return apiClient.post(url, {
      name
    });
  },
  edit: ({name}, id) => {
    const url = `/categories/${id}`;
    return apiClient.put(url, {
      name
    });
  },
  delete: id => {
    const url = `/categories/delete/${id}`;
    return apiClient.put(url);
  }
};

export default categoryAPI;