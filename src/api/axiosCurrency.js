import axios from 'axios';

const axiosCurrency = axios.create({
    baseURL: 'https://vapi.vnappmob.com/api/v2/exchange_rate',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Chỉ thêm Authorization header nếu token tồn tại
axiosCurrency.interceptors.request.use(
    (config) => {
        const tokenCurrency = localStorage.getItem('tokenCurrency');
        if (tokenCurrency) {
            config.headers.Authorization = `Bearer ${tokenCurrency}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosCurrency.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // Kiểm tra kỹ hơn để tránh lỗi nếu error.response không tồn tại
        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.get(
                    'https://vapi.vnappmob.com/api/request_api_key?scope=exchange_rate'
                );
                const tokenCurrency = res.data.results;
                if (tokenCurrency) {
                    localStorage.setItem('tokenCurrency', tokenCurrency);
                    return axiosCurrency(originalRequest);
                }
                return Promise.reject(error);
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);
export default axiosCurrency;
