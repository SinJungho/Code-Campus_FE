import create from 'zustand';

interface RequestedMentee {
  mentorshipNo: number;
  tuteeNo: number;
  tuteeName: string;
  mentorshipTime: string;
  note: string | null;
}

interface MyTutee {
  mentorshipNo: number;
  tuteeNo: number;
  tuteeName: string;
  mentorshipTime: string;
}

interface TutorDetailResponse {
  tutorProfileImg: string;
  name: string;
  userType: string;
}

interface UserDetailStore {
  tutorProfileImg: string;
  name: string;
  userType: string;
  myTuteeList: MyTutee[];
  requestedList: RequestedMentee[];
  setTutorProfileImg: (img: string) => void;
  setName: (name: string) => void;
  setUserType: (type: string) => void;
  setMyTuteeList: (list: MyTutee[]) => void;
  setRequestedList: (list: RequestedMentee[]) => void;
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
  setTutorProfileImg: (img) => set({ tutorProfileImg: img }),
  setName: (name) => set({ name }),
  setUserType: (type) => set({ userType: type }),
  setMyTuteeList: (list) => set({ myTuteeList: list }),
  setRequestedList: (list) => set({ requestedList: list }),
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
