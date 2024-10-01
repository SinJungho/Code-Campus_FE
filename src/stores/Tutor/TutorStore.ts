import { create } from "zustand";

type TutorDetailType = {
  like: string;
  comment: string;
  addr: string;
  onlineOrOffline: string;
  setLike: (like: string) => void;
  setComment: (comment: string) => void;
  setAddr: (addr: string) => void;
  setOnlineOrOffline: (onlineOrOffline: string) => void;
};

type TutorMatchingStoreType = {
  tutorNo: number;
  tuteeNo: number;
  mentorshipDay: string;
  mentorshipTime: string;
  category: string;

  setTutorNo: (tutorNo: number) => void;
  setTuteeNo: (tuteeNo: number) => void;
  setMentorshipDay: (mentorshipDay: string) => void;
  setMentorshipTime: (mentorshipTime: string) => void;
  setCategory: (category: string) => void;
};

export const useTutorDetailStore = create<TutorDetailType>((set) => ({
  like: "0",
  comment: "0",
  addr: "경기도 수원시",
  onlineOrOffline: "온라인 강의 / 오프라인 강의",
  setLike: (like) => ({ like }),
  setComment: (comment) => ({ comment }),
  setAddr: (addr) => ({ addr }),
  setOnlineOrOffline: (onlineOrOffline) => ({ onlineOrOffline }),
}));

export const useTutorMatchingStore = create<TutorMatchingStoreType>((set) => ({
  tutorNo: 0,
  tuteeNo: 0,
  mentorshipDay: "",
  mentorshipTime: "",
  category: "",

  setTutorNo: (tutorNo) => ({ tutorNo }),
  setTuteeNo: (tuteeNo) => ({ tuteeNo }),
  setMentorshipDay: (mentorshipDay) => ({ mentorshipDay }),
  setMentorshipTime: (mentorshipTime) => ({ mentorshipTime }),
  setCategory: (category) => ({ category }),
}));
