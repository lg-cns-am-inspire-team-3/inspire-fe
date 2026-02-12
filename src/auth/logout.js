import api from '../api/axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from './token';

export const useLogout = () => {
    const { setIsLogin, setRole } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        try {

            e.preventDefault();

            // logout은 사실 refresh token 삭제를 요청하는 것
            await api.post('/api/v1/auth/logout');

            setAccessToken(null);
            setIsLogin(false);
            setRole(null);

            navigate("/login")
        } catch (error) {
            // 
            setIsLogin(false);
            setRole(null);
            navigate('/login');
        }
    };

    return handleLogout;
};