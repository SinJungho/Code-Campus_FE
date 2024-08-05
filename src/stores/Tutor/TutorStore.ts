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
