import axios from 'axios';

const BASE_URL = 'https://test-fe.sidak.co.id';

const api = axios.create({ baseURL: BASE_URL });

export default api;
