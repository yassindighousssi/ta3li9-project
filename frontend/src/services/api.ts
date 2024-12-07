import axios from 'axios';

// إنشاء نسخة من axios مع الإعدادات الأساسية
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

// إضافة interceptor للتعامل مع التوكن
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// إضافة interceptor للتعامل مع الأخطاء
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // التعامل مع أخطاء المصادقة
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
