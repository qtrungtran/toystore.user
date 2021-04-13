import apiClient from './apiClient';

const statusAPI = {
  getAll: () => {
    const url = '/statuses';
    return apiClient.get(url);
  },
  get: id => {
    const url = `/statuses/${id}`;
    return apiClient.get(url);
  },
  add: ({name}) => {
    const url = `/statuses`;
    return apiClient.post(url, {
      name
    });
  },
  edit: ({name}, id) => {
    const url = `/statuses/${id}`;
    return apiClient.put(url, {
      name
    });
  },
  delete: id => {
    const url = `/statuses/delete/${id}`;
    return apiClient.put(url);
  }
};

export default statusAPI;