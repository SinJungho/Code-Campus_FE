import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S_detail from "./TutorDetail_styled";
import { Box, Button, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";  // for dynamic tutor id

const API_URL = process.env.REACT_APP_BASE_URL as string;

const TutorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // URL 파라미터로부터 id를 받아옴
  const [tutorDetail, setTutorDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // API 호출
    const fetchTutorDetail = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/tutor/${id}/detail`);
        setTutorDetail(response.data.data);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching tutor detail:", error.response || error.message);
        setTutorDetail(null);  // 데이터를 못 가져왔을 경우 대비
        setIsLoading(false);
      }
    };

    fetchTutorDetail();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!tutorDetail) {
    return <div>Failed to load tutor details.</div>;
  }

  // API에서 가져온 응답 데이터 구조에 맞추어 데이터를 분리를 했는데 일단 좀 더 이해하자
  const {
    tutorDetailResponse, // 선배 상세 정보
    myTuteeListResponse, // 후배 관리 - 수업 진행 중인 후배 리스트
    requestedMentorshipListResponse, // 매칭 요청 리스트
  } = tutorDetail;

  const { tutorProfileImg, name } = tutorDetailResponse;

  return (
    <S_detail.Wrapper>
      {/* 이미지 슬라이드 */}
      <Box>
        <Carousel height={464} navButtonsAlwaysVisible={true} animation="slide">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img src={tutorProfileImg} alt={`${name}'s profile`} />
          </Box>
        </Carousel>
      </Box>

      <Box sx={{ padding: "24px" }}>
        {/* 선배 기본 정보 */}
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          {name}
        </Typography>

        {/* 내 튜티 리스트 */}
        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h6">내 후배 목록</Typography>
          {myTuteeListResponse.map((tutee: any) => (
            <Box key={tutee.tuteeNo}>
              <Typography>{tutee.tuteeName}</Typography>
              <Typography>{tutee.mentorshipTime}</Typography>
            </Box>
          ))}
        </Box>

        {/* 매칭 요청 리스트 */}
        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h6">매칭 요청 목록</Typography>
          {requestedMentorshipListResponse.map((request: any) => (
            <Box key={request.tuteeNo}>
              <Typography>{request.tuteeName}</Typography>
              <Typography>{request.mentorshipTime}</Typography>
              <Typography>{request.note}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </S_detail.Wrapper>
  );
};

export default TutorDetail;
