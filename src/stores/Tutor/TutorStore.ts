import { create } from "zustand";

// Tutor 상태 인터페이스 정의
interface TutorDetailType {
  keyword: string[]; // string[]로 변경
  name: string;
  classArea: string;
  classType: string;
  school: string;
  tutorMajor: string;
  tutorIntro: string;
  chatLink: string;
  portLink: string;

  setKeyword: (keyword: string[]) => void; // string[]로 변경
  setName: (name: string) => void;
  setClassArea: (area: string) => void;
  setClassType: (type: string) => void;
  setSchool: (school: string) => void;
  setTutorMajor: (major: string) => void;
  setTutorIntro: (intro: string) => void;
  setChatLink: (link: string) => void;
  setPortLink: (link: string) => void;
}

// Tutor 상태 스토어 생성
export const useTutorDetailStore = create<TutorDetailType>((set) => ({
  keyword: [], // 빈 배열로 초기화
  name: "",
  classArea: "",
  classType: "",
  school: "",
  tutorMajor: "",
  tutorIntro: "",
  chatLink: "",
  portLink: "",

  setKeyword: (keyword) => set({ keyword }), // 배열로 설정
  setName: (name) => set({ name }),
  setClassArea: (area) => set({ classArea: area }),
  setClassType: (type) => set({ classType: type }),
  setSchool: (school) => set({ school }),
  setTutorMajor: (major) => set({ tutorMajor: major }),
  setTutorIntro: (intro) => set({ tutorIntro: intro }),
  setChatLink: (link) => set({ chatLink: link }),
  setPortLink: (link) => set({ portLink: link }),
}));
