import Tts from 'react-native-tts';

// تهيئة خدمة التحدث
Tts.setDefaultLanguage('ar');
Tts.setDefaultRate(0.5);
Tts.setDefaultPitch(1.0);

export const AccessibilityService = {
  // نطق نص معين
  speak: async (text: string) => {
    try {
      await Tts.speak(text);
    } catch (error) {
      console.error('خطأ في نطق النص:', error);
    }
  },

  // تغيير سرعة النطق
  setSpeed: async (rate: number) => {
    try {
      await Tts.setDefaultRate(rate);
    } catch (error) {
      console.error('خطأ في تغيير السرعة:', error);
    }
  },

  // إيقاف النطق
  stop: async () => {
    try {
      await Tts.stop();
    } catch (error) {
      console.error('خطأ في إيقاف النطق:', error);
    }
  },

  // التحقق من حالة النطق
  isSpeaking: async (): Promise<boolean> => {
    try {
      const speaking = await Tts.isSpeaking();
      return speaking;
    } catch (error) {
      console.error('خطأ في التحقق من حالة النطق:', error);
      return false;
    }
  }
};
