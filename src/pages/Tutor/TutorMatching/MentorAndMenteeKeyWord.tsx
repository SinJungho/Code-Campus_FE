import React, { useState, useEffect } from "react";
import * as S_detail from "../TutorDetail/TutorDetail_styled";
import { Box } from "@mui/material";
import { useUserStore } from "../../../stores/isLogined/loginStore";
import axios from "axios";

// 쿠키에서 accessToken 가져오는 함수
const getAccessTokenFromCookies = () => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access="));
  return cookie ? cookie.split("=")[1] : null;
};

/*** 키워드 타입 정의 ***/
type Keyword = {
  name: string; // 키워드 이름
};

/*** 키워드 상태 타입 정의 ***/
type Keywords = {
  mentorKeywords: Keyword[];
  menteeKeywords: Keyword[];
};

/*** 선배 & 멘티 키워드 ***/
export const MentorAndMenteeKeyWord = () => {
  const queryParams = new URLSearchParams(location.search);
  const tutorNo = queryParams.get("tutorNo");
  const { userNo } = useUserStore();
  const [keywords, setKeywords] = useState<Keywords>({
    mentorKeywords: [],
    menteeKeywords: [],
  });
  const [tutorLevel, setTutorLevel] = useState<string>(""); // 멘토 레벨 상태
  const [tuteeLevel, setTuteeLevel] = useState<string>(""); // 멘티 레벨 상태

  // 컴포넌트가 마운트될 때 API 요청을 보냅니다.
  useEffect(() => {
    const fetchKeywords = async () => {
      const accessToken = getAccessTokenFromCookies(); // 쿠키에서 accessToken 가져오기
      
      try {
        const response = await axios.get(
          `http://localhost:8080/api/mentorship/show-keyword?tutorNo=${tutorNo}&tuteeNo=${userNo}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
            },
          }
        );

        // 예상하는 데이터 구조에 맞게 키워드 배열과 난이도를 설정합니다.
        if (response.data) {
          const { tutorKeywords, tuteeKeywords, tutorLevel, tuteeLevel } = response.data;
          setKeywords({
            mentorKeywords: tutorKeywords.map((name: string) => ({ name })), // 문자열 배열을 객체 배열로 변환
            menteeKeywords: tuteeKeywords.map((name: string) => ({ name })), // 문자열 배열을 객체 배열로 변환
          });
          setTutorLevel(tutorLevel); // 멘토 레벨 업데이트
          setTuteeLevel(tuteeLevel); // 멘티 레벨 업데이트
        } else {
          console.error("예상치 못한 응답 구조:", response.data);
        }
      } catch (error) {
        console.error("매칭 요청 상세보기 실패", error);
      }
    };

    if (tutorNo && userNo) {
      fetchKeywords();
    }

    console.log("userNo = ",userNo, "  tutorNo = ",tutorNo)
  }, [tutorNo, userNo]);

  // 키워드 일치 개수 계산
  const matchedKeywordsCount = keywords.mentorKeywords.filter(mentorKeyword =>
    keywords.menteeKeywords.some(menteeKeyword => menteeKeyword.name === mentorKeyword.name)
  ).length;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        marginTop: "2rem",
        gap: "2rem",
      }}
    >
      <Box sx={{ display: "flex", gap: "25px", flexDirection: "column" }}>
        <S_detail.Title>선배의 키워드</S_detail.Title>
        <KeyWordButton keywords={keywords.mentorKeywords} />
        <TeachLevel isMentor={true} level={tutorLevel} /> {/* 난이도 전달 */}
      </Box>
      <Box sx={{ display: "flex", gap: "25px", flexDirection: "column" }}>
        <S_detail.Title>나의 키워드</S_detail.Title>
        <KeyWordButton keywords={keywords.menteeKeywords} />
        <TeachLevel isMentor={false} level={tuteeLevel} /> {/* 난이도 전달 */}
      </Box>
      {/* 일치하는 키워드 수 표시 */}
      <S_detail.Title>{matchedKeywordsCount}개의 키워드가 일치합니다.</S_detail.Title>
    </Box>
  );
};

/*** 선배 & 멘티 키워드 버튼 ***/
const KeyWordButton: React.FC<{ keywords: Keyword[] }> = ({ keywords }) => {
  return (
    <Box sx={{ display: "flex", gap: "20px" }}>
      {keywords.map((keyword, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <S_detail.MatchingButton variant="outlined">
            {`# ${keyword.name}`}
          </S_detail.MatchingButton>
        </Box>
      ))}
    </Box>
  );
}

/**
 * 선배 & 멘티 난이도 버튼
 *  */
type TeachLevelType = {
  isMentor: boolean;
  level: string; // level prop 추가
};

/**
 * 선배 & 멘티 난이도 버튼
 *  */
function TeachLevel({ isMentor, level }: TeachLevelType) {
  const levels = [
    { id: 1, content: "입문", color: "#e9fbec", border: "#158b28" },
    { id: 2, content: "초급", color: "#FFF1CE", border: "#C3951C" },
    { id: 3, content: "중급 이상", color: "#FFEAEA", border: "#FD5555" },
  ];

  const selectedLevel = levels.find(item => item.content === level); // level에 따라 선택

  return (
    <Box
      sx={{
        display: "flex",
        marginBottom: "0.6rem",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box sx={{ display: "flex", gap: "10px" }}>
        {selectedLevel && (
          <S_detail.LevelChip
            key={selectedLevel.id}
            label={selectedLevel.content}
            sx={{
              backgroundColor: selectedLevel.color,
              border: "1px solid",
              borderColor: selectedLevel.border,
              color: selectedLevel.border,
              padding: "0px 0.2rem",
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default MentorAndMenteeKeyWord;
