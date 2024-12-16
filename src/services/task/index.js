import api from '../../lib/axios';

export const getTask = async (id) => {
  try {
    const response = await api.get(`/api/projects/${id}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetch task:', error);
  }
};

export const createTask = async (id, data) => {
  try {
    const response = await api.post(`/api/projects/${id}/tasks`, data);
    return response.data;
  } catch (error) {
    console.error('Error create task:', error);
  }
};

export const updateStatus = async (id, status) => {
  try {
    const response = await api.put(`/api/tasks/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error update status task:', error);
  }
};
