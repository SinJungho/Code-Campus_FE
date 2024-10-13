import { create } from 'zustand';

interface SignInputValueStore {
  userEmail: string;
  userPassword: string;
  userName: string;
  userPhone: string;
  userSex: string;
  selectedKeywords: string[];
  selectedLevel: string;
  userType: string;
  studentType: string;
  chatLink: string;
  classArea: string;
  classType: string;
  portLink: string;
  school: string;
  tutorProfileImg: string;
  tutorIntro: string;
  tutorMajor: string;
  tutorClassNum: string;

  // Setter 메서드
  setUserEmail: (email: string) => void;
  setUserPassword: (password: string) => void;
  setUserName: (name: string) => void;
  setUserPhone: (phone: string) => void;
  setUserSex: (userSex: string) => void;
  setSelectedKeywords: (keywords: string[]) => void;
  setSelectedLevel: (level: string) => void;
  setUserType: (userType: string) => void;
  setStudentType: (studentType: string) => void;
  setChatLink: (chatLink: string) => void;
  setClassArea: (classArea: string) => void;
  setClassType: (classType: string) => void;
  setPortLink: (portLink: string) => void;
  setSchool: (school: string) => void;
  setTutorProfileImg: (tutorProfileImg: string) => void;
  setTutorIntro: (tutorIntro: string) => void;
  setTutorMajor: (tutorMajor: string) => void;
  setTutorClassNum: (classTutorNum: string) => void;

  // Getter 메서드
  getUserEmail: () => string;
  getUserPassword: () => string;
  getUserName: () => string;
  getUserPhone: () => string;
  getUserSex: () => string;
  getSelectedKeywords: () => string[];
  getSelectedLevel: () => string;
  getUserType: () => string;
  getStudentType: () => string;
  getChatLink: () => string;
  getClassArea: () => string;
  getClassType: () => string;
  getPortLink: () => string;
  getSchool: () => string;
  getTutorProfileImg: () => string;
  getTutorIntro: () => string;
  getTutorMajor: () => string;
  getTutorClassNum: () => string;
}

export const useSignInputValueStore = create<SignInputValueStore>((set, get) => ({
  userEmail: '',
  userPassword: '',
  userName: '',
  userPhone: '',
  userSex: '',
  selectedKeywords: [],
  selectedLevel: '',
  userType: '',
  studentType: '',
  chatLink: '',
  classArea: '',
  classType: '',
  portLink: '',
  school: '',
  tutorProfileImg: '',
  tutorIntro: '',
  tutorMajor: '',
  tutorClassNum: '',

  // Setter 메서드 구현
  setUserEmail: (email) => set({ userEmail: email }),
  setUserPassword: (password) => set({ userPassword: password }),
  setUserName: (name) => set({ userName: name }),
  setUserPhone: (phone) => set({ userPhone: phone }),
  setUserSex: (userSex) => set({ userSex }),
  setSelectedKeywords: (keywords) => set({ selectedKeywords: keywords }),
  setSelectedLevel: (level) => set({ selectedLevel: level }),
  setUserType: (userType) => set({ userType }),
  setStudentType: (studentType) => set({ studentType }),
  setChatLink: (chatLink) => set({ chatLink }),
  setClassArea: (classArea) => set({ classArea }),
  setClassType: (classType) => set({ classType }),
  setPortLink: (portLink) => set({ portLink }),
  setSchool: (school) => set({ school }),
  setTutorProfileImg: (tutorProfileImg) => set({ tutorProfileImg }),
  setTutorIntro: (tutorIntro) => set({ tutorIntro }),
  setTutorMajor: (tutorMajor) => set({ tutorMajor }),
  setTutorClassNum: (tutorClassNum) => set({tutorClassNum}),

  // Getter 메서드 구현
  getUserEmail: () => get().userEmail,
  getUserPassword: () => get().userPassword,
  getUserName: () => get().userName,
  getUserPhone: () => get().userPhone,
  getUserSex: () => get().userSex,
  getSelectedKeywords: () => get().selectedKeywords,
  getSelectedLevel: () => get().selectedLevel,
  getUserType: () => get().userType,
  getStudentType: () => get().studentType,
  getChatLink: () => get().chatLink,
  getClassArea: () => get().classArea,
  getClassType: () => get().classType,
  getPortLink: () => get().portLink,
  getSchool: () => get().school,
  getTutorProfileImg: () => get().tutorProfileImg,
  getTutorIntro: () => get().tutorIntro,
  getTutorMajor: () => get().tutorMajor,
  getTutorClassNum: () => get().tutorClassNum,
}));
