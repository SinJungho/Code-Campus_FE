import React from "react";
import * as S_detail from "../TutorDetail/TutorDetail_styled";
import { Link } from "react-router-dom";
import { Box, Button, Tab, Typography } from "@mui/material";
import MentorAndMenteeKeyWord from "./MentorAndMenteeKeyWord";
import TutoringDateAndTime from "./TutoringDateAndTime";

// 멘토 매칭 페이지
export default function MantorMatching() {
  return (
    <Box sx={{ padding: "48px", marginBottom: "5rem" }}>
      <S_detail.Title>매칭 요청하기</S_detail.Title>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "0.7rem",
          margin: "1rem 0",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#1564FF",
            fontSize: "0.7rem",
          }}
        >
          3
        </Typography>
        개의 키워드가 일치합니다.
      </Typography>
      {/* 선배 키워드 */}
      <MentorAndMenteeKeyWord />
      {/* 선호 요일 및 시간 */}
      <TutoringDateAndTime />
      {/* 매칭 확인 버튼 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            fontSize: "0.65rem",
            fontWeight: "bold",
            padding: "0.5rem 2rem",
            marginTop: "2rem",
            borderRadius: "10px",
          }}
        >
          확인
        </Button>

        <Link to="/tutorDetail">
          <Button
            variant="contained"
            size="large"
            sx={{
              fontSize: "0.65rem",
              fontWeight: "bold",
              padding: "0.5rem 2rem",
              marginTop: "2rem",
              borderRadius: "10px",
            }}
          >
            취소
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
