import React from "react";
import * as S from "../styled";
import * as S_detail from "./TutorDetail_styled";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function TutorDefaultInfo() {
  return (
    <Box>
      {/* 선배 기본 정보 타이틀 */}
      <Typography sx={{ marginBottom: "1.5rem", marginTop: "0.7rem" }}>
        <b>맹승열</b> 선배님에 대한 정보
      </Typography>
      <TutorInfo />
      <TutorIntroduce />
      <TutorTeachTypeAndTutoringTime />
      <TutorProtfilo />
    </Box>
  );
}

// 선배 기본 정보
const TutorInfo = () => {
  const mentorInfo = [
    {
      id: 1,
      icon: <SchoolIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: "대림대학교 컴퓨터 정보학부 재학",
    },
    {
      id: 2,
      icon: <FmdGoodIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: "경기도 안양시",
    },
    {
      id: 2,
      icon: <CheckBoxIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: "인증된 사용자",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "2rem",
      }}
    >
      <Box>
        {mentorInfo.map((index) => {
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
              {index.icon}
              <Typography sx={{ fontSize: "0.6rem", fontWeight: "bold" }}>
                {index.text}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <MentorSkillTag />
    </Box>
  );
};

// 선배 기술 키워드
function MentorSkillTag() {
  const keyword = [
    { id: "1", content: "# 웹 개발" },
    { id: "2", content: "# 프론트엔드" },
    { id: "3", content: "# 리액트" },
  ];
  return (
    <Box sx={{ marginTop: { xs: "1rem", sm: 0 } }}>
      <Typography
        sx={{ fontSize: "0.55rem", marginBottom: "0.4rem", fontWeight: "bold" }}
      >
        추천 키워드
      </Typography>
      {keyword.map((item) => {
        return (
          <S_detail.KeywordChip
            sx={{
              fontSize: "0.5rem",
              marginRight: "0.4rem",
              marginBottom: "1rem",
            }}
            key={item.id}
            label={item.content}
          ></S_detail.KeywordChip>
        );
      })}
    </Box>
  );
}

// 선배 소개
const TutorIntroduce = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        marginTop: "2rem",
      }}
    >
      <S_detail.Title>소개</S_detail.Title>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <S_detail.Text>안녕하세요!</S_detail.Text>
        <S_detail.Text>
          현재 대림대학교 컴퓨터 정보 학부에 재학중이며, 프론트엔드 개발자가
          되기 위해 공부중입니다.
        </S_detail.Text>
        <S_detail.Text>함께 공부해요! :)</S_detail.Text>
        <S_detail.LinkText to="https://open.kakao.com/o/skgspJac">
          튜터링 오픈 채팅방
        </S_detail.LinkText>
      </Box>
    </Box>
  );
};

// 선배 수업 방식 & 선호 튜터링 시간
const TutorTeachTypeAndTutoringTime = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        marginTop: "2rem",
        gap: "2rem",
      }}
    >
      <TutorTeachType />
      <TutoringTime />
    </Box>
  );
};

// 튜터링 수업 방식
const TutorTeachType = () => {
  const teachType = [
    {
      id: 1,
      text: "이론보단 실습 위주",
    },
    {
      id: 2,
      text: "매주 사이드 프로젝트 과제",
    },
    {
      id: 2,
      text: "차분하고 조용한 수업 분위기",
    },
  ];
  return (
    <Box>
      <S_detail.Title>수업 방식</S_detail.Title>
      {teachType.map((index) => {
        return (
          <Box
            key={index.id}
            sx={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              marginBottom: "15px",
              marginTop: "20px",
            }}
          >
            <ul>
              <S_detail.ListText>{index.text}</S_detail.ListText>
            </ul>
          </Box>
        );
      })}
    </Box>
  );
};

// 튜터링 선호 시간
const TutoringTime = () => {
  const time = [{ id: 1, text: "평일 (월~금), 오후 7-11 시" }];
  return (
    <Box>
      <S_detail.Title>선호 튜터링 시간</S_detail.Title>
      {time.map((index) => {
        return (
          <Typography sx={{ fontSize: "0.65rem", marginTop: "20px" }}>
            {index.text}
          </Typography>
        );
      })}
    </Box>
  );
};

// 튜터 포트폴리오
const TutorProtfilo = () => {
  return (
    <Box sx={{ marginTop: "2rem" }}>
      <S_detail.Title>포트폴리오</S_detail.Title>
      <S_detail.LinkText to="https://www.notion.so/ko-kr">
        포트폴리오 보러 가기
      </S_detail.LinkText>
    </Box>
  );
};
