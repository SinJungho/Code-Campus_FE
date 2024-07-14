import instance from "./axiosInstance";

// 데이터를 가져오는 함수 (GET 요청)
export const fetchData = async () => {
  try {
    const response = await instance.get('/endpoint'); // 엔드포인트 변경
    return response.data;
  } catch (error: any) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// 데이터를 보내는 함수 (POST 요청)
export const sendData = async (data: any) => {
  try {
    const response = await instance.post('/endpoint', data); // 엔드포인트 변경
    return response.data;
  } catch (error: any) {
    console.error('Error sending data:', error);
    throw error;
  }
};
