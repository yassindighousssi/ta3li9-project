// تكوين الاتصال بالخادم
export const API_CONFIG = {
  // عنوان الخادم الرئيسي
  BASE_URL: 'http://localhost:3000/api',
  
  // الإعدادات الافتراضية للطلبات
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  
  // مهلة الاتصال (بالمللي ثانية)
  TIMEOUT: 10000
};
