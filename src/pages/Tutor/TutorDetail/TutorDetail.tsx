import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as S_detail from "./TutorDetail_styled";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LaptopIcon from "@mui/icons-material/Laptop";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmsIcon from "@mui/icons-material/Sms";
import { useTutorDetailStore } from "../../../stores/Tutor/TutorStore";

const API_URL = process.env.REACT_APP_BASE_URL as string;

const TutorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 id 가져오기
  const [tutorData, setTutorData] = useState<any>(null); // API에서 받아온 선배 정보
  const [loading, setLoading] = useState(true); // 로딩 상태
  const { like, comment, addr, setAddr, onlineOrOffline, setOnlineOrOffline } = useTutorDetailStore();

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        console.log("Fetching tutor data...");
        const accessToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('access='))
          ?.split('=')[1]; // Optional chaining 사용

        if (!accessToken) {
          console.error("Access token not found in cookies");
          setLoading(false);
          return; // 토큰이 없으면 함수 종료
        }

        const response = await axios.get(`${API_URL}/api/tutor/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 인증 토큰 추가
          },
        });
        console.log("API response:", response.data); // 응답 전체 출력

        if (response.data && response.data.data) {
          const data = response.data.data;
          console.log("Fetched tutor data:", data); // Fetch된 tutorData 확인
          setTutorData(data);
          setAddr(data.classArea);
          setOnlineOrOffline(data.classType);
        } else {
          console.error("Invalid response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tutor data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTutorData();
    }
  }, [id, setAddr, setOnlineOrOffline]);

  if (loading) {
    return <Typography>Loading...</Typography>; // 로딩 중일 때 표시
  }

  if (!tutorData) {
    console.log("tutorData is null or undefined"); // tutorData가 null인지 확인
    return <Typography>No tutor data found.</Typography>; // 데이터가 없을 때 표시
  }

  const emojiInfo = [
    { id: 1, emoji: <FavoriteIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />, text: like },
    { id: 2, emoji: <SmsIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />, text: comment },
  ];

  const mentorInfo = [
    { id: 1, icon: <FmdGoodIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />, text: tutorData.classArea },
    { id: 2, icon: <LaptopIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />, text: tutorData.classType },
  ];

  return (
    <S_detail.Wrapper>
      {/* 선배 기본 정보 & 매칭 요청 버튼 */}
      <Box sx={{ padding: "24px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Box sx={{ display: "flex", marginBottom: "20px", gap: "2rem" }}>
            <Typography sx={{ fontSize: "0.75rem" }}>
              <b style={{ fontSize: "0.82rem" }}>{tutorData.name}</b> 선배님
            </Typography>
            <Box>
              <Link to="/tutorMatching">
                <Button variant="contained" sx={{ fontSize: "0.5rem", fontWeight: "bold", marginRight: "14px" }}>
                  매칭 요청
                </Button>
              </Link>
              <Button variant="outlined" sx={{ fontSize: "0.5rem", fontWeight: "bold" }}>
                공유하기
              </Button>
            </Box>
          </Box>
          {mentorInfo.map((item) => (
            <Box key={item.id} sx={{ display: "flex", gap: "15px", alignItems: "center", marginBottom: "15px" }}>
              {item.icon}
              <Typography sx={{ fontSize: "0.6rem" }}>{item.text}</Typography>
            </Box>
          ))}
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {emojiInfo.map((item) => (
              <Box key={item.id} sx={{ display: "flex", gap: "15px", alignItems: "center", marginBottom: "15px" }}>
                {item.emoji}
                <Typography sx={{ fontSize: "0.6rem" }}>{item.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </S_detail.Wrapper>
  );
};

export default TutorDetail;
