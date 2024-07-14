import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    isLoggedIn: false,  // 로그인 상태를 나타내는 변수.
    isLoading : true, // 로그인 로직이 끝나면 false로 바뀌는 변수.

    setIsLoggedIn: (boolean) => set({ isLoggedIn: boolean }),
    setIsLoading: (boolean) => set({ isLoading: boolean })
}));

export const useUserStore = create((set) => ({
    userName : '', // 로그인 시에 유저 이름
    userEmail : '', // 로그인 시에 유저 이메일

    setUserName: (String) => set({ userName : String }),
    setUserEmail: (String) => set({ userEmail : String }),
}));