import { useQuery, useMutation, useQueryClient } from 'react-query';
import commentService, { Comment, CreateCommentData } from '../services/commentService';
import { useScreenReader } from './useScreenReader';

export const useComments = (matchId: string) => {
    const queryClient = useQueryClient();
    const { announce } = useScreenReader();

    // استعلام عن التعليقات
    const {
        data: comments,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useQuery(
        ['comments', matchId],
        ({ pageParam = 0 }) => commentService.getMatchComments(matchId, {
            skip: pageParam * 20,
            limit: 20
        }),
        {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.data.length < 20) return undefined;
                return pages.length;
            }
        }
    );

    // إنشاء تعليق جديد
    const createComment = useMutation(
        (data: CreateCommentData) => commentService.createComment(matchId, data),
        {
            onSuccess: (newComment) => {
                queryClient.setQueryData(['comments', matchId], (old: any) => ({
                    ...old,
                    pages: [
                        { data: [newComment, ...old.pages[0].data] },
                        ...old.pages.slice(1)
                    ]
                }));
                announce('تم إضافة تعليقك بنجاح');
            }
        }
    );

    // حذف تعليق
    const deleteComment = useMutation(
        (commentId: string) => commentService.deleteComment(commentId),
        {
            onSuccess: (_, commentId) => {
                queryClient.setQueryData(['comments', matchId], (old: any) => ({
                    ...old,
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        data: page.data.filter((comment: Comment) => comment.id !== commentId)
                    }))
                }));
                announce('تم حذف التعليق بنجاح');
            }
        }
    );

    // التفاعل مع تعليق
    const reactToComment = useMutation(
        ({ commentId, type }: { commentId: string; type: 'like' | 'share' }) =>
            commentService.reactToComment(commentId, type),
        {
            onSuccess: (updatedComment) => {
                queryClient.setQueryData(['comments', matchId], (old: any) => ({
                    ...old,
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        data: page.data.map((comment: Comment) =>
                            comment.id === updatedComment.id ? updatedComment : comment
                        )
                    }))
                }));
            }
        }
    );

    return {
        comments,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        createComment: createComment.mutate,
        deleteComment: deleteComment.mutate,
        reactToComment: reactToComment.mutate
    };
};

export default useComments;
