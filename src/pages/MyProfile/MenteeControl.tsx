import React, { useState } from "react";
import * as S from "./styled";
import {
  Box,
  Avatar,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import {
  useMyProfileStore,
  TuteeDetail,
} from "../../stores/Tutor/useDetailStore";
import axios from "axios";

// 쿠키에서 토큰 가져오기
const getTokenFromCookies = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access="))
    ?.split("=")[1];
  return token;
};

export default function MenteeControl() {
  const { myTuteeList, setTuteeDetail } = useMyProfileStore();
  const [selectedTutee, setSelectedTutee] = useState<TuteeDetail | null>(null);
  const [open, setOpen] = useState(false);
  const [mentorshipNoToDelete, setMentorshipNoToDelete] = useState<
    number | null
  >(null); // 삭제할 멘토십 번호 상태
  console.log(myTuteeList);

  const handleDetailClick = async (mentorshipNo: number, tuteeName: string) => {
    const token = getTokenFromCookies();

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/tutor/myTutee/detail/${mentorshipNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      const { keywordList, classLevel, mentorshipDay, mentorshipTime, note } =
        response.data.data;

      setTuteeDetail({
        tuteeName,
        keywordList,
        classLevel,
        mentorshipDay,
        mentorshipTime,
        note,
      });

      setSelectedTutee({
        tuteeName,
        keywordList,
        classLevel,
        mentorshipDay,
        mentorshipTime,
        note,
      });

      setMentorshipNoToDelete(mentorshipNo); // 삭제할 멘토십 번호 설정
      setOpen(true);
    } catch (error) {
      console.error("상세 정보 조회에 실패했습니다.", error);
      alert("상세 정보 조회에 실패했습니다.");
    }
  };

  const handleDeleteTutee = async () => {
    const token = getTokenFromCookies();

    if (!token || mentorshipNoToDelete === null) {
      alert("로그인이 필요하거나 삭제할 멘티가 선택되지 않았습니다.");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/api/mentorship/${mentorshipNoToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 선택적으로: 스토어를 업데이트하거나 멘티 목록을 새로 고침
      alert("멘티가 성공적으로 삭제되었습니다.");
      setOpen(false);
      setSelectedTutee(null);
    } catch (error) {
      console.error("멘티 삭제에 실패했습니다.", error);
      alert("멘티 삭제에 실패했습니다.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTutee(null);
  };

  if (!myTuteeList || myTuteeList.length === 0) {
    return <Typography>현재 멘티 목록이 없습니다.</Typography>;
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
              {mentee.tuteeName.charAt(0)}
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
            onClick={() =>
              handleDetailClick(mentee.mentorshipNo, mentee.tuteeName)
            }
          >
            상세보기
          </Button>
        </S.CardWrap>
      ))}

      {/* 모달 */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        sx={{
          "& .MuiDialog-paper": {
            width: "800px",
            maxWidth: "95%",
            borderRadius: "16px",
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
            <Box sx={{ padding: "20px" }}>
              {/* 후배 키워드 및 클래스 레벨 */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  후배 키워드
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    borderRadius: "20px",
                    padding: "1rem",
                    mt: 1,
                    alignItems: "center",
                  }}
                >
                  {selectedTutee.keywordList &&
                  selectedTutee.keywordList.length > 0 ? (
                    selectedTutee.keywordList.map((keyword, index) => (
                      <Box
                        key={index}
                        sx={{
                          bgcolor: "#e0e0e0",
                          borderRadius: "20px",
                          padding: "5px 10px",
                          marginRight: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        <Typography variant="body2">#{keyword}</Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography>없음</Typography>
                  )}
                  <Box
                    sx={{
                      bgcolor:
                        selectedTutee.classLevel === "입문"
                          ? "#D4EDDA" // 연한 녹색
                          : selectedTutee.classLevel === "초급"
                          ? "#FFF3CD" // 연한 노란색
                          : selectedTutee.classLevel === "중급 이상"
                          ? "#F8D7DA" // 연한 빨간색
                          : "transparent",

                      color:
                        selectedTutee.classLevel === "입문"
                          ? "#155724" // 어두운 녹색
                          : selectedTutee.classLevel === "초급"
                          ? "#856404" // 어두운 노란색
                          : selectedTutee.classLevel === "중급 이상"
                          ? "#721C24" // 어두운 빨간색
                          : "black", // 기본값
                      borderRadius: "20px",
                      padding: "5px 10px",
                      marginLeft: "20px",
                    }}
                  >
                    {selectedTutee.classLevel || "없음"}
                  </Box>
                </Box>
              </Box>

              {/* 선호 요일 및 시간 */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  선호 요일 및 시간
                </Typography>
                <Typography sx={{ mt: 1 }}>
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
                    bgcolor: "#f5f5f5",
                    borderRadius: "8px",
                    padding: "10px",
                    mt: 1,
                  }}
                >
                  <Typography>{selectedTutee.note || "없음"}</Typography>
                </Box>
              </Box>

              {/* 삭제 버튼 */}
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteTutee} // 삭제 함수 호출
                sx={{
                  marginTop: "10px",
                  borderRadius: "5px",
                  padding: ".5rem 1.5rem",
                }}
              >
                후배 목록에서 삭제
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
