import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import config from './config/config';
import mongoose from 'mongoose';

// Import Routes (will create these next)
import userRoutes from './routes/userRoutes';
import commentRoutes from './routes/commentRoutes';
import matchRoutes from './routes/matchRoutes';

const app: Application = express();

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: config.SWAGGER_TITLE,
            version: config.SWAGGER_VERSION,
            description: config.SWAGGER_DESCRIPTION,
        },
        servers: [
            {
                url: `http://localhost:${config.PORT}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware
app.use(cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use(`${config.API_PREFIX}/users`, userRoutes);
app.use(`${config.API_PREFIX}/comments`, commentRoutes);
app.use(`${config.API_PREFIX}/matches`, matchRoutes);

// Health Check
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Internal Server Error',
    });
});

// Database Connection
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`);
            console.log(`Swagger documentation available at http://localhost:${config.PORT}/api-docs`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

export default app;
