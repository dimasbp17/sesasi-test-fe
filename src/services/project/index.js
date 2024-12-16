import api from '../../lib/axios';

export const getProject = async () => {
  try {
    const response = await api.get('/api/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetch:', error);
  }
};

export const createProject = async (data) => {
  try {
    const response = await api.post('/api/projects', data);
    return response.data;
  } catch (error) {
    console.error('Error create project:', error);
  }
};
