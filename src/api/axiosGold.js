import axios from 'axios';

const axiosGold = axios.create({
    baseURL: 'https://vapi.vnappmob.com/api/v2/gold',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});
axiosGold.interceptors.request.use(
    (config) => {
        const tokenGold = localStorage.getItem('tokenGold');
        if (tokenGold) {
            config.headers.Authorization = `Bearer ${tokenGold}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosGold.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.get(
                    'https://vapi.vnappmob.com/api/request_api_key?scope=gold'
                );
                const tokenGold = res.data.results;
                if (tokenGold) {
                    localStorage.setItem('tokenGold', tokenGold);
                    return axiosGold(originalRequest);
                } else {
                    return Promise.reject(error);
                }
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);
export default axiosGold;
