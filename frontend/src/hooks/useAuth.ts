import { useQuery, useMutation, useQueryClient } from 'react-query';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // استعلام عن المستخدم الحالي
    const { data: user, isLoading: isLoadingUser } = useQuery(
        'currentUser',
        authService.getCurrentUser,
        {
            enabled: authService.isAuthenticated(),
            retry: false
        }
    );

    // تسجيل الدخول
    const login = useMutation(authService.login, {
        onSuccess: (data) => {
            queryClient.setQueryData('currentUser', data.user);
            navigate('/');
        }
    });

    // تسجيل مستخدم جديد
    const register = useMutation(authService.register, {
        onSuccess: (data) => {
            queryClient.setQueryData('currentUser', data.user);
            navigate('/');
        }
    });

    // تسجيل الخروج
    const logout = () => {
        authService.logout();
        queryClient.removeQueries('currentUser');
        navigate('/login');
    };

    return {
        user,
        isLoadingUser,
        login: login.mutate,
        register: register.mutate,
        logout,
        isAuthenticated: authService.isAuthenticated()
    };
};

export default useAuth;
