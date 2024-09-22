import { SignUpType } from "../type/ApiType";
import instance from "./axiosInstance";

export const getRequest = (url: string): Promise<SignUpType> =>
  instance.get(process.env.REACT_APP_BASE_URL + url);

export const postRequest = (url: string): Promise<SignUpType> =>
  instance.post(process.env.REACT_APP_BASE_URL + url);

const Axios = {
  getRequest,
  postRequest,
};

export default Axios;
