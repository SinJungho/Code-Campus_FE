import instance from '../api/axiosInstance';
import axios from 'axios';
import { useAuthStore, useUserStore } from '../stores/isLogined/loginStore';
import { getRefreshToken } from '../cookie/cookies';

const API_URL = process.env.REACT_APP_BASE_URL;
const JWT_EXPIRY_TIME = 2400 * 1000; // 40분(2400초) * 1000(ms)

// 로그인 관련 기능 훅
const useLogin = () => {
    const { setIsLoggedIn, setIsLoading } = useAuthStore();
    const { setUserName, setUserEmail } = useUserStore();

    // axios 헤더에 액세스 토큰 담고 setTimeout으로 리프레쉬 돌리기
    const setAuthTokens = (access_TOKEN) => {
        instance.defaults.headers.common['Authorization'] = `Bearer ${access_TOKEN}`;
        setTimeout(() => refreshLogin() , JWT_EXPIRY_TIME - 300000) // 35분에 연장
        return true
    };

    const changeLoginStatus = (setAuthTokens, response) => {
        if(setAuthTokens){
            setUserName(response.data.data.user_NICK); 
            setUserEmail(response.data.data.user_EMAIL);
            setIsLoggedIn(true);
            setIsLoading(false);
        }
    }

    // 이메일 로그인(기본로그인)
    const emailLogin = async (inputForm) => {
        try {
            const response = await axios.post(`${API_URL}/api/users/login`, inputForm, {withCredentials: true});
            changeLoginStatus(setAuthTokens(response.data.data.access_TOKEN), response)
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    };

    // 로그인 갱신
    const refreshLogin = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/users/refreshToken`, {"refreshToken":getRefreshToken}, {withCredentials: true});
            changeLoginStatus(setAuthTokens(response.data.data.access_TOKEN), response)
        } catch (error) {
            setIsLoading(false);
        }
    };

    // 로그아웃
    const logout = async (navigate, location) => {
        try{
            await axios.get(`${API_URL}/api/users/logout`, {withCredentials: true});
            setIsLoading(false);
            navigate(location.pathname, { replace: true });
            window.location.reload();
        } catch (err) {
            console.log('err')
            throw err;
        } 
    }

    
    return { emailLogin, refreshLogin, logout }
}

export default useLogin;