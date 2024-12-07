import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import app from './app';

// Application will be started from app.ts
// This file exists to provide a clean entry point for the application

const startServer = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Start Express server
        const PORT = config.PORT;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
