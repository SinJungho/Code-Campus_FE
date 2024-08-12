import { create } from "zustand";

/**
 * 내 정보 페이지 상태 타입 지정
 */
type MyProfileType = {
  memberShip: string;
  matchingRequest: string;
  setMemberShip: (memberShip: string) => void;
  setMatchingRequest: (matchingRequest: string) => void;
};

/**
 * 멘티 매칭 요청 희망 시간 타입
 */
type MenteeTimeType = {
  day: string;
  amPm: string;
  startTime: number;
  endTime: number;
  profilePictureUrl: string;
  name: string;
  setDay: (day: string) => void;
  setAmPm: (amPm: string) => void;
  setStartTime: (startTime: number) => void;
  setEndTime: (endTime: number) => void;
  setProfilePictureUrl: (profilePictureUrl: string) => void;
  setName: (name: string) => void;
};

export const useMyProfileStore = create<MyProfileType>((set) => ({
  memberShip: "0",
  matchingRequest: "0",
  setMemberShip: (memberShip) => set({ memberShip }),
  setMatchingRequest: (matchingRequest) => set({ matchingRequest }),
}));

export const useMenteeTimeStore = create<MenteeTimeType>((set) => ({
  day: "평일",
  amPm: "오후",
  startTime: 4,
  endTime: 6,
  name: "김철수",
  profilePictureUrl: "https://example.com/profile1.jpg",
  setDay: (day) => set({ day }),
  setAmPm: (amPm) => set({ amPm }),
  setStartTime: (startTime) => set({ startTime }),
  setEndTime: (endTime) => set({ endTime }),
  setName: (name) => set({ name }),
  setProfilePictureUrl: (profilePictureUrl) => set({ profilePictureUrl }),
}));
