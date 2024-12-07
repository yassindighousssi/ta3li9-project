import api from './api';

interface Comment {
    id: string;
    content: string;
    audioUrl?: string;
    timestamp: number;
    type: 'text' | 'audio';
    user: {
        id: string;
        username: string;
        fullName: string;
    };
    match: string;
    reactions: {
        likes: number;
        shares: number;
    };
    createdAt: string;
}

interface CreateCommentData {
    content: string;
    audioUrl?: string;
    type: 'text' | 'audio';
    timestamp: number;
}

// خدمة التعليقات
const commentService = {
    // إنشاء تعليق جديد
    createComment: async (matchId: string, data: CreateCommentData): Promise<Comment> => {
        const response = await api.post(`/comments/${matchId}`, data);
        return response.data.data;
    },

    // الحصول على تعليقات المباراة
    getMatchComments: async (matchId: string, params?: {
        timestamp?: number;
        limit?: number;
        skip?: number;
    }): Promise<{ data: Comment[]; total: number }> => {
        const response = await api.get(`/comments/${matchId}`, { params });
        return response.data;
    },

    // تحديث تعليق
    updateComment: async (commentId: string, data: Partial<CreateCommentData>): Promise<Comment> => {
        const response = await api.put(`/comments/${commentId}`, data);
        return response.data.data;
    },

    // حذف تعليق
    deleteComment: async (commentId: string): Promise<void> => {
        await api.delete(`/comments/${commentId}`);
    },

    // التفاعل مع تعليق (إعجاب/مشاركة)
    reactToComment: async (commentId: string, reactionType: 'like' | 'share'): Promise<Comment> => {
        const response = await api.post(`/comments/${commentId}/reactions`, { type: reactionType });
        return response.data.data;
    }
};

export type { Comment, CreateCommentData };
export default commentService;
