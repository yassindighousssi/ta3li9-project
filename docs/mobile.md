# تطبيق الموبايل (Mobile App)

## كيف يعمل React Native على نظامي Android و iOS؟

### المبدأ الأساسي
React Native يسمح لك بكتابة كود JavaScript/TypeScript واحد يعمل على كلا النظامين من خلال:
1. **جسر البرمجة (Bridge)**: يترجم كود JavaScript إلى مكونات أصلية للنظام
2. **المكونات الأصلية**: تُحول إلى عناصر واجهة حقيقية في كل نظام
   - Android: تتحول إلى مكونات Java/Kotlin
   - iOS: تتحول إلى مكونات Swift/Objective-C

### مثال عملي
```javascript
// كود واحد يعمل على كلا النظامين
import { Button } from 'react-native';

// سيتحول تلقائياً إلى:
// Android -> android.widget.Button
// iOS -> UIButton
<Button title="اضغط هنا" onPress={() => {}} />
```

## هيكلة المشروع
```
mobile/
├── src/
│   ├── screens/           # شاشات التطبيق
│   ├── components/        # المكونات المشتركة
│   ├── navigation/        # إعدادات التنقل
│   ├── services/         # خدمات API
│   ├── hooks/            # React Hooks
│   └── utils/            # أدوات مساعدة
├── android/              # ملفات خاصة بـ Android
└── ios/                 # ملفات خاصة بـ iOS
```

## المميزات الخاصة بكل نظام

### Android
- ملفات التكوين في مجلد `android/`
- إعدادات Gradle
- المكتبات الأصلية الخاصة بـ Android

### iOS
- ملفات التكوين في مجلد `ios/`
- إعدادات Xcode
- ملفات Podfile للمكتبات

## الكود المخصص لكل نظام
يمكن كتابة كود مخصص لكل نظام بطريقتين:

1. **ملفات منفصلة**:
```
Component.android.js  // كود خاص بالأندرويد
Component.ios.js      // كود خاص بالآيفون
```

2. **شرطيات في نفس الملف**:
```javascript
import { Platform } from 'react-native';

const styles = {
  container: {
    padding: Platform.select({
      ios: 10,
      android: 8,
    }),
  }
};
```

## إعداد بيئة التطوير

### متطلبات مشتركة:
- Node.js
- React Native CLI
- Visual Studio Code

### لتطوير Android:
1. تثبيت Android Studio
2. إعداد Android SDK
3. إنشاء جهاز وهمي

### لتطوير iOS:
1. جهاز Mac
2. تثبيت Xcode
3. تثبيت CocoaPods

## أوامر التشغيل
```bash
# تثبيت التبعيات
npm install

# تشغيل على Android
npm run android

# تشغيل على iOS
npm run ios
```

## نصائح مهمة
1. اختبر التطبيق على كلا النظامين باستمرار
2. استخدم مكونات React Native الأساسية قدر الإمكان
3. تجنب الكود المخصص إلا عند الضرورة
4. اهتم بأداء التطبيق على كلا النظامين
5. راعِ اختلافات التصميم بين النظامين
