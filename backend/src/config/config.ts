import dotenv from 'dotenv';

dotenv.config();

const config = {
    // Server Configuration
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    // MongoDB Configuration
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ta3li9',
    
    // JWT Configuration
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
    
    // CORS Configuration
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
    
    // API Configuration
    API_PREFIX: '/api/v1',
    
    // Swagger Configuration
    SWAGGER_TITLE: 'Ta3li9 API Documentation',
    SWAGGER_DESCRIPTION: 'API documentation for Ta3li9 - Sports Commentary Platform',
    SWAGGER_VERSION: '1.0.0',
};

export default config;
