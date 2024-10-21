import React, { useState } from "react";
import {
  Box,
  Avatar,
  Badge,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import axios from "axios";
import { useMyProfileStore } from "../../stores/Tutor/useDetailStore";

// 쿠키에서 accessToken 가져오는 함수
const getAccessTokenFromCookies = () => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access="));
  return cookie ? cookie.split("=")[1] : null;
};

export default function MatchRequest() {
  const { requestedList } = useMyProfileStore(); // Zustand 스토어에서 요청 리스트 가져오기
  const [open, setOpen] = useState(false);
  const [selectedMentee, setSelectedMentee] = useState<any>(null); // 선택된 멘티 정보 저장
  const [menteeDetail, setMenteeDetail] = useState<any>(null); // 멘티 상세 정보 저장

  // 다이얼로그 열기 및 멘티 상세 정보 요청
  const handleClickOpen = async (mentorshipNo: number, mentee: any) => {
    setSelectedMentee(mentee); // 선택한 멘티 설정
    const accessToken = getAccessTokenFromCookies(); // 쿠키에서 accessToken 가져오기

    try {
      const response = await axios.get(
        `http://localhost:8080/api/tutor/myTutee/detail/${mentorshipNo}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
          },
        }
      );

      // API 응답 데이터를 상태에 저장
      setMenteeDetail(response.data.data);
      console.log(response.data.data);
      setOpen(true); // 다이얼로그 열기
    } catch (error) {
      console.error("상세 정보 조회에 실패했습니다.", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = async () => {
    const accessToken = getAccessTokenFromCookies();

    try {
      await axios.post(
        `http://localhost:8080/api/mentorship/update-status`, // 수락 API
        {
          mentorshipNo: selectedMentee.mentorshipNo, // mentorshipNo 추가
          status: "OK", // 수락 상태
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
          },
        }
      );
      alert("멘티 요청이 수락되었습니다.");
      setOpen(false);
    } catch (error) {
      console.error("멘티 요청 수락에 실패했습니다.", error);
      alert("멘티 요청 수락에 실패했습니다.");
    }
  };

  const handleReject = async () => {
    const accessToken = getAccessTokenFromCookies();

    try {
      await axios.post(
        `http://localhost:8080/api/mentorship/update-status`, // 거절 API
        {
          mentorshipNo: selectedMentee.mentorshipNo, // mentorshipNo 추가
          status: "NO", // 거절 상태
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
          },
        }
      );
      alert("멘티 요청이 거절되었습니다.");
      setOpen(false);
    } catch (error) {
      console.error("멘티 요청 거절에 실패했습니다.", error);
      alert("멘티 요청 거절에 실패했습니다.");
    }
  };

  return (
    <Box>
      {requestedList.map((mentee, index) => (
        <Box
          key={index}
          sx={{
            mt: "2rem",
            padding: "1.5rem",
            bgcolor: "#f5f5f5",
            borderRadius: ".8rem",
            boxShadow: "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
                mr: "1.5rem",
              }}
            >
              {mentee.tuteeName.charAt(0)}
            </Avatar>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "4rem",
                justifyContent: "space-around",
              }}
            >
              <Typography component="span" sx={{ fontSize: "0.85rem" }}>
                {mentee.mentorshipTime}
              </Typography>
              <Typography
                component="span"
                sx={{ fontWeight: "bold", color: "black" }}
              >
                {mentee.tuteeName} 후배님
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={{
              borderRadius: 5,
              padding: ".2rem 1rem",
              fontSize: "0.65rem",
              fontWeight: "bold",
              height: "45px",
            }}
            onClick={() => handleClickOpen(mentee.mentorshipNo, mentee)} // mentorshipNo 사용
          >
            상세보기
          </Button>
        </Box>
      ))}

      {/* 다이얼로그로 상세 정보 표시 */}
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            padding: "1.5rem",
            borderRadius: "20px",
          },
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            width: "45px",
            position: "absolute",
            right: "0px",
            top: "0px",
            color: "black",
          }}
          variant="text"
          color="error"
        >
          X
        </Button>
        <DialogTitle
          sx={{ fontSize: "1.2rem", fontWeight: "bold", textAlign: "center" }}
        >
          {selectedMentee?.tuteeName}님의 상세 정보
        </DialogTitle>
        <DialogContent>
          {menteeDetail ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1rem",
                  gap: "0.5rem",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    display: "inline-block",
                    marginRight: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  후배 키워드
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <Chip
                    sx={{
                      // width: "120px",
                      padding: "0.78rem",
                      color: "black",
                      "& .MuiChip-label": {
                        fontSize: "0.85rem",
                      },
                    }}
                    label={
                      menteeDetail.keywordList.length > 0
                        ? menteeDetail.keywordList.join(", ")
                        : "없음"
                    }
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1rem",
                  gap: "0.5rem",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    display: "inline-block",
                    marginRight: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  선호 요일 및 시간
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    color: "#1564FF",
                    display: "inline-block",
                  }}
                >
                  {menteeDetail.mentorshipDay.length > 0
                    ? menteeDetail.mentorshipDay.join(", ")
                    : "없음"}{" "}
                  {menteeDetail.mentorshipTime || "없음"}
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    display: "inline-block",
                    marginRight: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  선배에게 하고 싶은 말
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5",
                    borderRadius: "20px",
                    padding: "1rem",
                  }}
                >
                  <Typography
                    component="div"
                    sx={{
                      fontSize: "0.85rem",
                      color: "black",
                      display: "inline-block",
                    }}
                  >
                    {menteeDetail.note || "없음"}
                  </Typography>
                </Box>
              </Box>
            </>
          ) : (
            <Typography component="div">로딩 중...</Typography>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            "&.MuiDialogActions-root": {
              display: "flex",
              justifyContent: "space-between",
            },
          }}
        >
          <Button
            onClick={handleAccept}
            sx={{ fontSize: "0.85rem" }}
            variant="contained"
            color="primary"
          >
            수락하기
          </Button>
          <Button
            onClick={handleReject}
            sx={{ fontSize: "0.85rem" }}
            variant="contained"
            color="primary"
          >
            거절하기
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
