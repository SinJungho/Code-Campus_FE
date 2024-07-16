import React from "react";
import * as S_detail from "./TutorDetail_styled";
import { Box } from "@mui/material";

/***
 * 선배 & 멘티 키워드
 *
 * */
export const MentorAndMenteeKeyWord = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        marginTop: "2rem",
      }}
    >
      <Box sx={{ display: "flex", gap: "25px", flexDirection: "column" }}>
        <S_detail.Title>선배의 키워드</S_detail.Title>
        <KeyWordButton />
        <TeachLevel isMentor={true} />
      </Box>
      <Box sx={{ display: "flex", gap: "25px", flexDirection: "column" }}>
        <S_detail.Title>나의 키워드</S_detail.Title>
        <KeyWordButton />
        <TeachLevel isMentor={false} />
      </Box>
    </Box>
  );
};

/***
 * 선배 & 멘티 키워드 버튼
 *  */
const KeyWordButton = () => {
  const matchKeyword = [
    {
      id: 1,
      button: (
        <S_detail.MatchingButton variant="outlined">
          # 웹 개발
        </S_detail.MatchingButton>
      ),
      text: "",
    },
    {
      id: 2,
      button: (
        <S_detail.MatchingButton variant="outlined">
          # 프론트엔드
        </S_detail.MatchingButton>
      ),
      text: "",
    },
    {
      id: 3,
      button: (
        <S_detail.MatchingButton variant="outlined">
          # 리액트
        </S_detail.MatchingButton>
      ),
      text: "",
    },
  ];

  return (
    <Box sx={{ display: "flex", gap: "20px" }}>
      {matchKeyword.map((index) => {
        return (
          <Box
            key={index.id}
            sx={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            {index.button}
          </Box>
        );
      })}
    </Box>
  );
};

/**
 * 선배 & 멘티 키워드 타입 지정
 *  */
type TeachLevelType = {
  isMentor: boolean;
};

/**
 * 선배 & 멘티 난이도 버튼
 *  */
function TeachLevel({ isMentor }: TeachLevelType) {
  const level = [
    { id: 1, content: "입문", color: "#e9fbec", border: "#158b28" },
    { id: 2, content: "초급", color: "#FFF1CE", border: "#C3951C" },
    { id: 3, content: "중급 이상", color: "#FFEAEA", border: "#FD5555" },
  ];

  // find 메소드를 사용하여 특정 id에 해당하는 level 객체를 찾습니다.
  const selectId = isMentor ? 3 : 1;

  const selectedLevel = level.find((item) => item.id === selectId);
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
