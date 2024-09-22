import axios from "axios";
import { create } from "zustand";

const API_URL = process.env.REACT_APP_BASE_URL as string;
const JWT_EXPIRY_TIME = 2400 * 1000;

type InputForm = {
  userEmail: string;
  password: string;
  userName: string;
  userPhone: string;
  userSex: string;
  userType: string;
  keyword: string[];
  level: string;
  school: string;
  classArea: string;
  classType: string;
  tutorProfileImg: string;
  tutorMajor: string;
  tutorClassNum: string;
  tutorIntro: string;
  chatLink: string;
  portLink: string;
  authYN: string;
  tutorLikes: number;
  studentType: string;
};

interface ResponseDataType {
  data: any;
}

interface SignResultStore {
  isSigning: boolean;
  isSignUpOk: boolean;
  setIsSigning: (value: boolean) => void;
  setIsSignUpOk: (value: boolean) => void;
}

interface SignInputValueStore {
  userEmail: string;
  userName: string;
  userPassword: string;
  setUserEmail: (value: string) => void;
  setUserName: (value: string) => void;
  setUserPassword: (value: string) => void;
}

export const useSignResultStore = create<SignResultStore>((set) => ({
  isSigning: false,
  isSignUpOk: false,
  setIsSigning: (value) => set({ isSigning: value }),
  setIsSignUpOk: (value) => set({ isSignUpOk: value }),
}));

export const useSignInputValueStore = create<SignInputValueStore>((set) => ({
  userEmail: "",
  userName: "",
  userPassword: "",
  setUserEmail: (value) => set({ userEmail: value }),
  setUserName: (value) => set({ userName: value }),
  setUserPassword: (value) => set({ userPassword: value }),
}));

export const useSignUp = () => {
  const { setIsSigning, setIsSignUpOk } = useSignResultStore();
  const { setUserEmail, setUserName, setUserPassword } =
    useSignInputValueStore();

  const userSignUp = async (
    inputData: InputForm
  ): Promise<ResponseDataType | void> => {
    try {
      setIsSigning(true);
      const response = await axios.post(
        `${API_URL}/api/users/signup`,
        inputData
      );
      setIsSignUpOk(true);
      setIsSigning(false);
      return response.data;
    } catch (error) {
      console.error(error);
      setIsSignUpOk(false);
      setIsSigning(false);
    }
  };

  return { userSignUp };
};

export default useSignUp;
