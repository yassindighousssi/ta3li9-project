import { Request, Response, NextFunction } from 'express';
import Comment from '../models/Comment';
import Match from '../models/Match';

// Create Comment
export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { matchId } = req.params;
        const userId = req.user.id;

        // Check if match exists
        const match = await Match.findById(matchId);
        if (!match) {
            return res.status(404).json({
                success: false,
                error: 'Match not found'
            });
        }

        // Create comment
        const comment = await Comment.create({
            ...req.body,
            user: userId,
            match: matchId
        });

        res.status(201).json({
            success: true,
            data: comment
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get Comments for Match
export const getMatchComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { matchId } = req.params;
        const { timestamp, limit = 20, skip = 0 } = req.query;

        let query: any = { match: matchId };
        
        // Add timestamp filter if provided
        if (timestamp) {
            query.timestamp = { $lte: Number(timestamp) };
        }

        const comments = await Comment.find(query)
            .sort({ timestamp: -1, createdAt: -1 })
            .skip(Number(skip))
            .limit(Number(limit))
            .populate('user', 'username fullName profileImage');

        const total = await Comment.countDocuments(query);

        res.status(200).json({
            success: true,
            count: comments.length,
            total,
            data: comments
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Update Comment
export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        let comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: 'Comment not found'
            });
        }

        // Check if user owns the comment
        if (comment.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to update this comment'
            });
        }

        comment = await Comment.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: comment
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete Comment
export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: 'Comment not found'
            });
        }

        // Check if user owns the comment
        if (comment.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to delete this comment'
            });
        }

        await comment.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};
