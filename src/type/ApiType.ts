import { create } from "zustand";

/**
 * 회원 가입 입력창 Store 타입 정의
 */
export type SignUpType = {
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

  setUserEmail: (userEmail: string) => void;
  setUserPassword: (password: string) => void;
  setUserName: (userName: string) => void;
  setUserPhone: (userPhone: string) => void;
  setUserSex: (userSex: string) => void;
  setUserType: (userType: string) => void;
  setKeyword: (keyword: string[]) => void;
  setLevel: (level: string) => void;
  setSchool: (school: string) => void;
  setClassArea: (classArea: string) => void;
  setClassType: (classType: string) => void;
  setTutorProfileImg: (tutorProfileImg: string) => void;
  setTutorMajor: (tutorMajor: string) => void;
  setTutorIntro: (tutorIntro: string) => void;
  setTutorClassNum: (tutorClassNum: string) => void;
  setChatLink: (chatLink: string) => void;
  setPortLink: (portLink: string) => void;
  setAuthYN: (authYN: string) => void;
  setTutorLikes: (tutorLikes: number) => void;
  setStudentType: (studentType: string) => void;
};

/**
 * 회원 가입 입력값 Store 함수
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
  tutorClassNum: "",
  tutorIntro: "",
  chatLink: "",
  portLink: "",
  authYN: "",
  tutorLikes: 0,
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
