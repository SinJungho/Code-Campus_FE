import instance from '../api/axiosInstance';
import axios from 'axios';
import { useAuthStore, useUserStore } from '../stores/isLogined/loginStore';
import { getRefreshToken, setRefreshToken } from '../cookie/cookies';

const API_URL = process.env.REACT_APP_BASE_URL as string;
const JWT_EXPIRY_TIME = 2400 * 1000; // 40분(2400초) * 1000(ms)

interface InputForm {
  userEmail: string;
  password: string;
}

interface ResponseData {
  data: any
}

const useLogin = () => {
  const { setIsLoggedIn, setIsLoading } = useAuthStore();
  const { setUserName, setUserEmail } = useUserStore();

  // axios 헤더에 액세스 토큰 담고 setTimeout으로 리프레쉬 돌리기
  const setAuthTokens = (data: any): boolean => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${data.accessTOKEN}`;
    setRefreshToken(data.refreshToken);
    setTimeout(() => refreshLogin(), JWT_EXPIRY_TIME - 300000); // 35분에 연장
    return true;
  };

  const changeLoginStatus = (setAuthTokens: boolean, response: any) => {
    if (setAuthTokens) {
      setUserName(response.user_NICK);
      setUserEmail(response.user_EMAIL);
      setIsLoggedIn(true);
      setIsLoading(false);
    }
  };

  // 이메일 로그인(기본로그인)
  const emailLogin = async (inputForm: InputForm): Promise<void> => {
    try {
      const response = await axios.post<ResponseData>(`${API_URL}/api/users/login`, inputForm, { withCredentials: true });
      changeLoginStatus(setAuthTokens(response.data), response.data);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  // 로그인 갱신
  const refreshLogin = async (): Promise<void> => {
    try {
      const response = await axios.get<ResponseData>(`${API_URL}/api/users/refreshToken`, { params: { refreshToken: getRefreshToken() }, withCredentials: true });
      changeLoginStatus(setAuthTokens(response.data), response.data);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // 로그아웃
  const logout = async (navigate: (path: string, options?: { replace?: boolean }) => void, location: { pathname: string }): Promise<void> => {
    try {
      await axios.get(`${API_URL}/api/users/logout`, { withCredentials: true });
      setIsLoading(false);
      navigate(location.pathname, { replace: true });
      window.location.reload();
    } catch (err) {
      console.log('err');
      throw err;
    }
  };

  return { emailLogin, refreshLogin, logout };
};

export default useLogin;
