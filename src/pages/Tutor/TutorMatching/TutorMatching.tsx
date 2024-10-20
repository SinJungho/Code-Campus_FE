import React, { useState } from "react";
import * as S_detail from "../TutorDetail/TutorDetail_styled";
import { Link, useNavigate  } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import MentorAndMenteeKeyWord from "./MentorAndMenteeKeyWord";
import TutoringDateAndTime from "./TutoringDateAndTime";
import { useUserStore } from "../../../stores/isLogined/loginStore";
import instance from "../../../api/axiosInstance"; // Axios 인스턴스 import

export default function MantorMatching() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const queryParams = new URLSearchParams(location.search);
  const tutorNo = Number(queryParams.get("tutorNo")); // tutorNo를 숫자로 변환
  const { userNo } = useUserStore();

  // 선택된 데이터 상태 추가
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState<string>(""); // 노트 상태 추가

  // 상태를 업데이트하고 로그를 찍는 함수
  const handleDataChange = (days: string[], time: string, notes: string) => {
    setSelectedDays(days);
    setSelectedTime(time);
    setNotes(notes); // 노트 상태 업데이트
    console.log("Selected Days:", days);
    console.log("Selected Time:", time);
    console.log("Notes:", notes); // 노트 출력
  };

  const handleSubmit = async () => {
    if (!selectedDays.length || !selectedTime) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    const [startTime, endTime] = selectedTime.split("~");

    const requestData = {
      tutorNo: tutorNo,
      tuteeNo: userNo,
      mentorshipDay: selectedDays,
      mentorshipStartTime: startTime,
      mentorshipEndTime: endTime,
      note: notes, // 필요시 적절한 노트를 추가
    };

    try {
      const response = await instance.post("/api/mentorship/request", requestData);
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
      alert("매칭 요청이 완료되었습니다.");
      navigate("/"); // 홈으로 이동 (또는 다른 경로)
    } catch (error) {
      console.error("Error occurred during API request:", error);
      alert("매칭 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box sx={{ padding: "48px", marginBottom: "5rem" }}>
      <S_detail.Title>매칭 요청하기</S_detail.Title>
      {/* 일치하는 키워드 수 표시 */}
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
      <TutoringDateAndTime onDataChange={handleDataChange} />
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
          onClick={handleSubmit} // 확인 버튼 클릭 시 API 요청
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
