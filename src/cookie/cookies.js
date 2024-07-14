import Cookies from 'js-cookie';

export const setRefreshToken = (token) => {
  Cookies.set('refreshToken', token, { expires: 7 }); // 쿠키 만료일은 필요에 따라 설정
};

export const getRefreshToken = () => {
  return Cookies.get('refreshToken');
};

export const removeRefreshToken = () => {
  Cookies.remove('refreshToken');
};