import { create } from "zustand";

type UserName = {
  name: string;
  setName: (name: string) => void;
};

export const useUserNameStore = create<UserName>((set) => ({
  name: "",
  setName: (name: string) => set({ name }),
}));
