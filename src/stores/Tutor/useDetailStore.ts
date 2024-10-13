// useDetailStore.ts 파일

import { create } from 'zustand';

export interface RequestedMentee {
  mentorshipNo: number;
  tuteeNo: number;
  tuteeName: string;
  mentorshipTime: string;
  note: string | null;
}

export interface MyTutee {
  mentorshipNo: number;
  tuteeNo: number;
  tuteeName: string;
  mentorshipTime: string;
}

export interface TutorDetailResponse {
  tutorProfileImg: string;
  name: string;
  userType: string;
}

// useDetailStore.ts 파일에서 TuteeDetail 인터페이스 수정
export interface TuteeDetail {
  tuteeName: string;
  keywordList: string[];
  mentorshipDay: string[];
  mentorshipTime: string;
  note: string | null;
}


export interface UserDetailStore {
  tutorProfileImg: string;
  name: string;
  userType: string;
  myTuteeList: MyTutee[];
  requestedList: RequestedMentee[];
  tuteeDetail: TuteeDetail | null;
  setTutorProfileImg: (img: string) => void;
  setName: (name: string) => void;
  setUserType: (type: string) => void;
  setMyTuteeList: (list: MyTutee[]) => void;
  setRequestedList: (list: RequestedMentee[]) => void;
  setTuteeDetail: (detail: TuteeDetail) => void;
  setUserDetails: (details: {
    tutorProfileImg: string;
    name: string;
    userType: string;
    myTuteeList: MyTutee[];
    requestedList: RequestedMentee[];
  }) => void;
}

export const useMyProfileStore = create<UserDetailStore>((set) => ({
  tutorProfileImg: '',
  name: '',
  userType: '',
  myTuteeList: [],
  requestedList: [],
  tuteeDetail: null,
  setTutorProfileImg: (img) => set({ tutorProfileImg: img }),
  setName: (name) => set({ name }),
  setUserType: (type) => set({ userType: type }),
  setMyTuteeList: (list) => set({ myTuteeList: list }),
  setRequestedList: (list) => set({ requestedList: list }),
  setTuteeDetail: (detail) => set({ tuteeDetail: detail }),
  setUserDetails: (details) => {
    set({
      tutorProfileImg: details.tutorProfileImg,
      name: details.name,
      userType: details.userType,
      myTuteeList: details.myTuteeList,
      requestedList: details.requestedList,
    });
  },
}));
