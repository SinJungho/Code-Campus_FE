import { create } from "zustand";

/**
 * 회원 가입 결과 타입
 */
type SignResult = {
  isSignUpOk: boolean;
  isSigning: boolean;
  setIsSignUpOk: (isSignUpOk: boolean) => void;
  setIsSigning: (isSigning: boolean) => void;
};

/**
 * 회원 가입 결과 Store 함수
 */
export const useSignResultStore = create<SignResult>((set) => ({
  isSignUpOk: false,
  isSigning: true,

  setIsSignUpOk: (isSignUpOk: boolean) => set({ isSignUpOk }),
  setIsSigning: (isSigning: boolean) => set({ isSigning }),
}));

/***
 *  회원 가입 입력창 타입
 */
type SignInputValue = {
  userEmail: string;
  userName: string;
  userPassword: string;
  userPasswordRepeat: string;
  userPhone: string;
  indeterminateCheckbox: boolean;

  setUserEmail: (userEmail: string) => void;
  setUserName: (userName: string) => void;
  setUserPassword: (userPassword: string) => void;
  setUserPasswordRepeat: (userPasswordRepeat: string) => void;
  setUserPhone: (userPhone: string) => void;
  setIndeterminateCheckbox: (indeterminateCheckbox: boolean) => void;
};

/***
 * 회원 가입 입력창 Store 함수
 */
export const useSignInputValueStore = create<SignInputValue>((set) => ({
  userEmail: "",
  userName: "",
  userPassword: "",
  userPasswordRepeat: "",
  userPhone: "",
  indeterminateCheckbox: false,

  setUserEmail: (userEmail: string) => set({ userEmail }),
  setUserName: (userName: string) => set({ userName }),
  setUserPassword: (userPassword: string) => set({ userPassword }),
  setUserPasswordRepeat: (userPasswordRepeat: string) =>
    set({ userPasswordRepeat }),
  setUserPhone: (userPhone: string) => set({ userPhone }),
  setIndeterminateCheckbox: (indeterminateCheckbox: boolean) =>
    set({ indeterminateCheckbox }),
}));
