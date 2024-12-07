import axios from 'axios';
import { API_CONFIG } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// إنشاء نسخة من axios مع الإعدادات الأساسية
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.DEFAULT_HEADERS
});

// إضافة معترض للطلبات
api.interceptors.request.use(
  async (config) => {
    // إضافة رمز المصادقة إلى رأس الطلب
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// واجهة لتسجيل الدخول
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// واجهة للحصول على المباريات المباشرة
export const getLiveMatches = async () => {
  try {
    const response = await api.get('/matches/live');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// واجهة للحصول على المعلقين المتاحين
export const getAvailableCommentators = async (matchId: string) => {
  try {
    const response = await api.get(`/matches/${matchId}/commentators`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
