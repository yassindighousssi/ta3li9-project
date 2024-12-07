import express from 'express';
import {
    createComment,
    getMatchComments,
    updateComment,
    deleteComment
} from '../controllers/commentController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * /api/v1/comments/{matchId}:
 *   post:
 *     summary: Create a new comment for a match
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 */
router.post('/:matchId', protect, createComment);

/**
 * @swagger
 * /api/v1/comments/{matchId}:
 *   get:
 *     summary: Get all comments for a match
 *     tags: [Comments]
 */
router.get('/:matchId', getMatchComments);

/**
 * @swagger
 * /api/v1/comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', protect, updateComment);

/**
 * @swagger
 * /api/v1/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', protect, deleteComment);

export default router;
