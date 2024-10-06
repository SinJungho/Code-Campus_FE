import React, { useState } from "react";
import * as S from "./styled";
import { Box, Avatar, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useMyProfileStore, TuteeDetail } from "../../stores/Tutor/useDetailStore";
import axios from "axios";

// 쿠키에서 토큰 가져오기
const getTokenFromCookies = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access=")) // 쿠키에서 'token='으로 시작하는 항목 찾기
    ?.split("=")[1]; // token 값만 추출
  return token;
};

export default function MenteeControl() {
  const { myTuteeList, setTuteeDetail } = useMyProfileStore(); // Zustand에서 상태 가져오기
  const [selectedTutee, setSelectedTutee] = useState<TuteeDetail | null>(null); // 선택된 멘티 상태
  const [open, setOpen] = useState(false); // 모달 상태

  const handleDetailClick = async (mentorshipNo: number, tuteeName: string) => {
    const token = getTokenFromCookies(); // 쿠키에서 토큰 가져오기

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/tutor/myTutee/detail/${mentorshipNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
            "Content-Type": "application/json",
          },
        }
      );

      // API 응답에서 가져온 데이터
      const { keywordList, mentorshipDay, mentorshipTime, note } = response.data.data;

      // Zustand 상태 업데이트
      setTuteeDetail({
        tuteeName, // 선택된 멘티 이름
        keywordList,
        mentorshipDay,
        mentorshipTime,
        note,
      });

      // 선택된 멘티 상태 업데이트
      setSelectedTutee({
        tuteeName, // 선택된 멘티 이름
        keywordList,
        mentorshipDay,
        mentorshipTime,
        note,
      });

      // 모달 열기
      setOpen(true);
      console.log(response.data); // 데이터 출력
    } catch (error) {
      // 에러 처리
      console.error("상세 정보 조회에 실패했습니다.", error);
      alert("상세 정보 조회에 실패했습니다.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTutee(null); // 모달 닫을 때 선택된 멘티 상태 초기화
  };

  if (!myTuteeList || myTuteeList.length === 0) {
    return <Typography>현재 멘티 목록이 없습니다.</Typography>; // 데이터가 없을 때
  }

  return (
    <Box>
      {myTuteeList.map((mentee, index) => (
        <S.CardWrap
          key={index}
          sx={{
            mt: "2rem",
            padding: "1.5rem",
            bgcolor: "#f5f5f5",
            borderRadius: ".8rem",
            boxShadow: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: "2.8rem",
                height: "2.8rem",
                fontSize: "1.2rem",
                color: "#999",
                bgcolor: "#fff",
                display: "flex",
                alignContent: "center",
                flexWrap: "wrap",
                justifyContent: "center",
                mr: "1.5rem",
              }}
            >
              {mentee.tuteeName.charAt(0)} {/* 멘티 이름의 첫 글자 */}
            </Avatar>
            <S.CardTextDiv>
              <p>{mentee.mentorshipTime}</p>
              <Typography sx={{ fontWeight: "bold", color: "black" }}>
                {mentee.tuteeName} 후배님
              </Typography>
            </S.CardTextDiv>
          </Box>
          <Button
            variant="contained"
            sx={{
              borderRadius: 5,
              padding: ".2rem 1rem",
              fontSize: "0.65rem",
              fontWeight: "bold",
            }}
            onClick={() => handleDetailClick(mentee.mentorshipNo, mentee.tuteeName)}
          >
            상세보기
          </Button>
        </S.CardWrap>
      ))}

{/*모달*/}
<Dialog
  open={open}
  onClose={handleClose}
  fullWidth
  maxWidth="lg" // 모달의 기본 크기를 더 키움 ('lg'는 큰 사이즈의 모달)
  sx={{
    "& .MuiDialog-paper": {
      width: "800px", // 모달 창의 너비를 커스터마이징 (800px 정도로 설정)
      maxWidth: "95%", // 화면 크기에 맞춰 반응형으로 최대 95%까지 확장 가능하게 함
    },
  }}
>
  <DialogTitle>
    <Typography variant="h6" fontWeight="bold">
      {selectedTutee?.tuteeName} 후배님의 상세 정보
    </Typography>
  </DialogTitle>
  <DialogContent>
    {selectedTutee && (
      <Box sx={{ padding: "20px" }}> {/* 전체 컨텐츠에 여유로운 패딩 추가 */}
        {/* 후배 키워드 */}
        <Box sx={{ mb: 4 }}> {/* 박스 사이 간격도 더 넓힘 */}
          <Typography variant="subtitle1" fontWeight="bold">
            후배 키워드
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              borderRadius: "10px",
              padding: "2rem", // 키워드 박스의 패딩을 1rem으로 확장
              marginLeft: "0px",
              mt: 1,
            }}
          >
            {selectedTutee.keywordList && selectedTutee.keywordList.length > 0 ? (
              selectedTutee.keywordList.map((keyword, index) => (
                <Typography
                  key={index}
                  sx={{
                    bgcolor: keyword === "입문" ? "#e0f3e3" : "#f0f0f0",
                    color: keyword === "입문" ? "#4CAF50" : "black",
                    borderRadius: "20px",
                    padding: "0.75rem", // 키워드에 패딩을 더 줘서 여유롭게 표시
                    margin: "0.5rem", // 키워드 사이의 간격도 넓힘
                    fontWeight: keyword === "입문" ? "bold" : "normal",
                  }}
                >
                  #{keyword}
                </Typography>
              ))
            ) : (
              <Typography>없음</Typography>
            )}
          </Box>
        </Box>

        {/* 선호 요일 및 시간 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            선호 요일 및 시간
          </Typography>
          <Typography sx={{ mt: 1, paddingLeft: "10px" }}> {/* 텍스트에 좌측 패딩 추가 */}
            {selectedTutee.mentorshipDay?.length > 0
              ? `매주 ${selectedTutee.mentorshipDay.join(", ")}`
              : "없음"}{" "}
            {selectedTutee.mentorshipTime || "없음"}
          </Typography>
        </Box>

        {/* 후배에 대한 한 줄 메모 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            후배에 대한 한 줄 메모
          </Typography>
          <Box
            sx={{
              bgcolor: "#f7f7f7",
              borderRadius: "10px",
              padding: "1.5rem", // 메모 박스의 패딩을 1.5rem으로 늘려 여유롭게 만듦
              mt: 1,
            }}
          >
            <Typography>{selectedTutee.note || "없음"}</Typography>
          </Box>
        </Box>
      </Box>
    )}
  </DialogContent>
  {/*정보수정, 후배목록에서 삭제 버튼 추가해야함 */}
  </Dialog>
    </Box>
  );
}
