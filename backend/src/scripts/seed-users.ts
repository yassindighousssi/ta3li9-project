import mongoose from 'mongoose';
import User from '../models/User';
import config from '../config/config';
import * as fs from 'fs';
import * as path from 'path';

const seedUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Read test users data
        const usersData = JSON.parse(
            fs.readFileSync(
                path.join(__dirname, '../data/test-users.json'),
                'utf-8'
            )
        );

        // Create users
        for (const userData of usersData.users) {
            try {
                const existingUser = await User.findOne({ email: userData.email });
                if (!existingUser) {
                    await User.create(userData);
                    console.log(`Created user: ${userData.email}`);
                } else {
                    console.log(`User already exists: ${userData.email}`);
                }
            } catch (error) {
                console.error(`Error creating user ${userData.email}:`, error.message);
            }
        }

        console.log('Finished seeding users');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

seedUsers();
