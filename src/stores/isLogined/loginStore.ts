import { create } from 'zustand';

// Auth 상태 인터페이스 정의
interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  accessToken: string | null; // accessToken 추가
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setAccessToken: (token: string | null) => void; // accessToken 설정 메서드 추가
}

// Auth 상태 스토어 생성
export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,  // 로그인 상태를 나타내는 변수
  isLoading: true,    // 로그인 로직이 끝나면 false로 바뀌는 변수

  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setAccessToken: (token: string | null) => set({ accessToken: token }), // accessToken 설정 메서드
}));

// User 상태 인터페이스 정의
interface UserState {
  userName: string;
  userEmail: string;
  userNo: number; // userNo의 타입을 number로 추가
  setUserName: (userName: string) => void;
  setUserEmail: (userEmail: string) => void;
  setUserNo: (userNo: number) => void; // setUserNo 추가
}

// User 상태 스토어 생성
export const useUserStore = create<UserState>((set) => ({
  userName: '', // 로그인 시에 유저 이름
  userEmail: '', // 로그인 시에 유저 이메일
  userNo: 0, // 초기값 설정

  setUserName: (userName: string) => set({ userName }),
  setUserEmail: (userEmail: string) => set({ userEmail }),
  setUserNo: (userNo: number) => set({ userNo }), // userNo 설정
}));
