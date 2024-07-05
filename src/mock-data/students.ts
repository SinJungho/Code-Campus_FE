// 타입 정의
interface Student {
    university: string;
    department: string;
    profilePictureUrl: string;
    name: string;
    specialties: string[];
  }
  
  // 더미 데이터
  const students: Student[] = [
    {
      university: "서울대학교",
      department: "컴퓨터공학과",
      profilePictureUrl: "https://example.com/profile1.jpg",
      name: "김철수",
      specialties: ["프론트엔드", "백엔드"]
    },
    {
      university: "연세대학교",
      department: "정보통신공학과",
      profilePictureUrl: "https://example.com/profile2.jpg",
      name: "이영희",
      specialties: ["백엔드", "데이터베이스"]
    },
    {
      university: "고려대학교",
      department: "소프트웨어학과",
      profilePictureUrl: "https://example.com/profile3.jpg",
      name: "박지수",
      specialties: ["자바", "스프링"]
    },
    {
      university: "한양대학교",
      department: "전자공학과",
      profilePictureUrl: "https://example.com/profile4.jpg",
      name: "최민호",
      specialties: ["데브옵스", "클라우드"]
    },
    {
      university: "성균관대학교",
      department: "산업공학과",
      profilePictureUrl: "https://example.com/profile5.jpg",
      name: "정혜진",
      specialties: ["데이터 사이언스", "머신러닝"]
    },
    {
      university: "이화여자대학교",
      department: "컴퓨터공학과",
      profilePictureUrl: "https://example.com/profile6.jpg",
      name: "강민지",
      specialties: ["머신러닝", "딥러닝"]
    },
    {
      university: "중앙대학교",
      department: "소프트웨어학과",
      profilePictureUrl: "https://example.com/profile7.jpg",
      name: "조현우",
      specialties: ["모바일 개발", "안드로이드"]
    },
    {
      university: "경희대학교",
      department: "컴퓨터공학과",
      profilePictureUrl: "https://example.com/profile8.jpg",
      name: "오수진",
      specialties: ["네트워크", "보안"]
    },
    {
      university: "건국대학교",
      department: "정보통신공학과",
      profilePictureUrl: "https://example.com/profile9.jpg",
      name: "임도현",
      specialties: ["시스템 아키텍처", "데이터베이스"]
    },
    {
      university: "동국대학교",
      department: "컴퓨터공학과",
      profilePictureUrl: "https://example.com/profile10.jpg",
      name: "배성훈",
      specialties: ["클라우드 컴퓨팅", "백엔드"]
    }
  ];
  
  export default students;  