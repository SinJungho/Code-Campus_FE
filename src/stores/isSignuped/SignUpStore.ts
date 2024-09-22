import { create } from "zustand";
import instance from "../../api/axiosInstance";
import { SignUpType } from "../../type/ApiType";

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
  isSigning: false,

  setIsSignUpOk: (isSignUpOk: boolean) => set({ isSignUpOk }),
  setIsSigning: (isSigning: boolean) => set({ isSigning }),
}));

/***
 * 회원 가입 입력창 Store 함수
 */
export const useSignInputValueStore = create<SignUpType>((set) => ({
  userEmail: "",
  password: "",
  userName: "",
  userPhone: "",
  userSex: "",
  userType: "",
  keyword: [],
  level: "",
  school: "",
  classArea: "",
  classType: "",
  tutorProfileImg: "",
  tutorMajor: "",
  tutorIntro: "",
  tutorLikes: 0,
  tutorClassNum: "",
  chatLink: "",
  portLink: "",
  authYN: "",
  studentType: "",

  setUserEmail: (userEmail: string) => set({ userEmail }),
  setUserPassword: (password: string) => set({ password }),
  setUserName: (userName: string) => set({ userName }),
  setUserPhone: (userPhone: string) => set({ userPhone }),
  setUserSex: (userSex: string) => set({ userSex }),
  setUserType: (userType: string) => set({ userType }),
  setKeyword: (keyword: string[]) => set({ keyword }),
  setLevel: (level: string) => set({ level }),
  setSchool: (school: string) => set({ school }),
  setClassArea: (classArea: string) => set({ classArea }),
  setClassType: (classType: string) => set({ classType }),
  setTutorProfileImg: (tutorProfileImg: string) => set({ tutorProfileImg }),
  setTutorMajor: (tutorMajor: string) => set({ tutorMajor }),
  setTutorClassNum: (tutorClassNum: string) => set({ tutorClassNum }),
  setTutorIntro: (tutorIntro: string) => set({ tutorIntro }),
  setChatLink: (chatLink: string) => set({ chatLink }),
  setPortLink: (portLink: string) => set({ portLink }),
  setAuthYN: (authYN: string) => set({ authYN }),
  setTutorLikes: (tutorLikes: number) => set({ tutorLikes }),
  setStudentType: (studentType: string) => set({ studentType }),
}));
