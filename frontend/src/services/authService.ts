import api from './api';

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData extends LoginCredentials {
    username: string;
    fullName: string;
    isVisuallyImpaired: boolean;
}

interface UserResponse {
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
        fullName: string;
        role: string;
        isVisuallyImpaired: boolean;
    };
}

// خدمة المصادقة
const authService = {
    // تسجيل الدخول
    login: async (credentials: LoginCredentials): Promise<UserResponse> => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    // تسجيل مستخدم جديد
    register: async (data: RegisterData): Promise<UserResponse> => {
        const response = await api.post('/auth/register', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    // تسجيل الخروج
    logout: () => {
        localStorage.removeItem('token');
    },

    // الحصول على معلومات المستخدم الحالي
    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    // التحقق من حالة المصادقة
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('token');
    }
};

export default authService;
