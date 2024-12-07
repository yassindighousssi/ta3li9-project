import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/config';

// Generate JWT Token
const generateToken = (id: string): string => {
    return jwt.sign({ id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRE
    });
};

// Register User
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, fullName, isVisuallyImpaired } = req.body;

        // Create user
        const user = await User.create({
            username,
            email,
            password,
            fullName,
            isVisuallyImpaired,
            preferredAudioSettings: {
                volume: 1.0,
                speed: 1.0,
                pitch: 1.0
            }
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                isVisuallyImpaired: user.isVisuallyImpaired
            }
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Login User
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide email and password'
            });
        }

        // Check if user exists
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                isVisuallyImpaired: user.isVisuallyImpaired
            }
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get Current User
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};
