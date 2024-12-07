import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// تعريف نموذج المستخدم مباشرة
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'commentator', 'admin'],
        default: 'user'
    },
    isVisuallyImpaired: {
        type: Boolean,
        default: false
    },
    preferredAudioSettings: {
        volume: { type: Number, default: 1.0 },
        speed: { type: Number, default: 1.0 },
        pitch: { type: Number, default: 1.0 }
    },
    bio: String
});

// إضافة طريقة تشفير كلمة المرور قبل الحفظ
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', UserSchema);

const users = [
    {
        username: "commentator1",
        email: "commentator@ta3li9.com",
        password: "Password123!",
        fullName: "معلق رياضي",
        role: "commentator",
        isVisuallyImpaired: false,
        bio: "معلق رياضي محترف مع خبرة 10 سنوات في التعليق على مباريات كرة القدم",
        preferredAudioSettings: {
            volume: 1.0,
            speed: 1.0,
            pitch: 1.0
        }
    },
    {
        username: "blinduser1",
        email: "blind@ta3li9.com",
        password: "Password123!",
        fullName: "مستخدم كفيف",
        role: "user",
        isVisuallyImpaired: true,
        preferredAudioSettings: {
            volume: 1.2,
            speed: 0.9,
            pitch: 1.0
        }
    },
    {
        username: "admin1",
        email: "admin@ta3li9.com",
        password: "AdminPass123!",
        fullName: "مدير النظام",
        role: "admin",
        isVisuallyImpaired: false,
        preferredAudioSettings: {
            volume: 1.0,
            speed: 1.0,
            pitch: 1.0
        }
    },
    {
        username: "user1",
        email: "user@ta3li9.com",
        password: "UserPass123!",
        fullName: "مستخدم عادي",
        role: "user",
        isVisuallyImpaired: false,
        preferredAudioSettings: {
            volume: 1.0,
            speed: 1.0,
            pitch: 1.0
        }
    }
];

const createUsers = async () => {
    try {
        // الاتصال بقاعدة البيانات
        await mongoose.connect('mongodb://127.0.0.1:27017/ta3li9');
        console.log('Connected to MongoDB');

        // حذف كل المستخدمين الموجودين (اختياري)
        await User.deleteMany({});
        console.log('Cleared existing users');

        // إنشاء المستخدمين
        for (const userData of users) {
            try {
                const user = await User.create(userData);
                console.log(`Created user: ${user.email} (${user.role})`);
            } catch (err) {
                console.error(`Error creating user ${userData.email}:`, (err as Error).message);
            }
        }

        console.log('Finished creating test users');
        process.exit(0);
    } catch (err) {
        console.error('Error:', (err as Error).message);
        process.exit(1);
    }
};

createUsers();
