    import { Request                                        , Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/config';

// Extend Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}               

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Not authorized to access this route'
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string };

            // Add user to request object
            req.user = await User.findById(decoded.id);
            next();
        } catch (err) {
            return res.status(401).json({
                success: false,
                error: 'Not authorized to access this route'
            });
        }
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};
                                