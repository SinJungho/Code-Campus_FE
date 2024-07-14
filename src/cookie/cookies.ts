import { useCookies } from 'react-cookie';

// 쿠키 관리 함수 정의
export const setRefreshToken = (token: string) => {
  const [, setCookie] = useCookies(['refreshToken']);
  setCookie('refreshToken', token, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }); // 7일 후 만료
};

export const getRefreshToken = (): string | undefined => {
  const [refreshToken] = useCookies(['refreshToken']);
  return refreshToken['refreshToken'];
};

export const removeRefreshToken = () => {
  const [, removeCookie] = useCookies(['refreshToken']);
  removeCookie('refreshToken', { path: '/' });
};
