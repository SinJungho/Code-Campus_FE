import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as S_detail from "./TutorDetail_styled";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Tab, Typography } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LaptopIcon from "@mui/icons-material/Laptop";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmsIcon from "@mui/icons-material/Sms";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useTutorDetailStore } from "../../../stores/Tutor/TutorStore"; // 상태 불러오기

const API_URL = process.env.REACT_APP_BASE_URL as string;

const TutorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tutorId = Number(id);
  const [loading, setLoading] = useState(true);

  // Zustand 상태 불러오기
  const {
    keyword,
    name,
    classArea,
    classType,
    school,
    tutorMajor,
    tutorIntro,
    chatLink,
    portLink,
    setKeyword,
    setName,
    setClassArea,
    setClassType,
    setSchool,
    setTutorMajor,
    setTutorIntro,
    setChatLink,
    setPortLink,
  } = useTutorDetailStore();

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const accessToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access="))
          ?.split("=")[1];
  
          if (!tutorId) {
            console.error("ID is undefined");
            setLoading(false); // 로딩 상태 종료
            return; // ID가 없으면 함수 종료
          }
        if (!accessToken) {
          console.error("Access token not found");
          return; // 토큰이 없으면 함수 종료
        }
  
        const response = await axios.get(`${API_URL}/api/tutor/profile/${tutorId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.data && response.data.data) {
          const data = response.data.data;
  
          // Zustand에 상태 저장
          setKeyword(data.keyword);
          setName(data.name);
          setClassArea(data.classArea);
          setClassType(data.classType);
          setSchool(data.school);
          setTutorMajor(data.tutorMajor);
          setTutorIntro(data.tutorIntro);
          setChatLink(data.chatLink);
          setPortLink(data.portLink);
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
  }, [id, setKeyword, setName, setClassArea, setClassType, setSchool, setTutorMajor, setTutorIntro, setChatLink, setPortLink]);
  
  console.log("Fetching tutor data for ID:", tutorId);
  if (loading) {
    return <Typography>Loading...</Typography>; // 로딩 상태 표시
  }

  const emojiInfo = [
    {
      id: 1,
      emoji: <FavoriteIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: "Like",
    },
    {
      id: 2,
      emoji: <SmsIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: "Comment",
    },
  ];

  const mentorInfo = [
    {
      id: 1,
      icon: <FmdGoodIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: classArea,
    },
    {
      id: 2,
      icon: <LaptopIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: classType,
    },
  ];

  return (
    <S_detail.Wrapper>
      <Box sx={{ padding: "24px" }}>
        {/* 선배 기술 스택 */}
        <Box>
          <MentorSkillKeyword keywords={keyword} />
        </Box>

        {/* 선배 기본 정보 & 매칭 요청 버튼 */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Box sx={{ display: "flex", marginBottom: "20px", gap: "2rem" }}>
            <Typography sx={{ fontSize: "0.75rem" }}>
              <b style={{ fontSize: "0.82rem" }}>{name}</b> 선배님
            </Typography>
            <Box>
              <Link to="/tutorMatching">
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "0.5rem",
                    fontWeight: "bold",
                    marginRight: "14px",
                  }}
                >
                  매칭 요청
                </Button>
              </Link>
              <Button variant="outlined" sx={{ fontSize: "0.5rem", fontWeight: "bold" }}>
                공유하기
              </Button>
            </Box>
          </Box>

          {/* 선배 정보 */}
          {mentorInfo.map((info) => (
            <Box
              key={info.id}
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              {info.icon}
              <Typography sx={{ fontSize: "0.6rem" }}>{info.text}</Typography>
            </Box>
          ))}

          {/* Like & Comment */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {emojiInfo.map((emoji) => (
              <Box
                key={emoji.id}
                sx={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                {emoji.emoji}
                <Typography sx={{ fontSize: "0.6rem" }}>{emoji.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* 선배 상세 페이지 탭 컴포넌트 */}
        <Box>
          <MentorTabMenu />
        </Box>
      </Box>
    </S_detail.Wrapper>
  );
};

// 기술 스택 키워드 컴포넌트
const MentorSkillKeyword = ({ keywords }: { keywords: string[] }) => {
  return (
    <Box>
      {keywords.map((keyword, index) => (
        <S_detail.KeywordChip
          key={index}
          sx={{
            fontSize: "0.5rem",
            marginRight: "0.4rem",
            marginBottom: "1rem",
          }}
          label={`# ${keyword.trim()}`} // 공백 제거 후 출력
        />
      ))}
    </Box>
  );
};

// 선배 상세 페이지 탭 메뉴
const MentorTabMenu: React.FC = () => {
  const [value, setValue] = useState("1");
  const [isSticky, setIsSticky] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (tabRef.current) {
        const tabPosition = tabRef.current.getBoundingClientRect().top;
        setIsSticky(tabPosition <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <TabContext value={value}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          position: isSticky ? "fixed" : "static",
          top: isSticky ? 0 : "auto",
          width: "100%",
          zIndex: 1000,
          backgroundColor: "white",
        }}
        ref={tabRef}
      >
        <TabList onChange={handleChange} variant="fullWidth">
          <Tab sx={{ width: "100%", fontSize: "0.5rem" }} label="선배 기본 정보" value="1" />
          <Tab sx={{ width: "100%", fontSize: "0.5rem" }} label="후배들의 한마디" value="2" />
        </TabList>
      </Box>
      {isSticky && <Box sx={{ height: "48px" }} />}
      <TabPanel value="1">
        <Typography>선배 기본 정보</Typography>
        {/* TutorDefaultInfo 컴포넌트로 대체 */}
      </TabPanel>
      <TabPanel value="2">
        <Typography>후배들의 한마디</Typography>
        {/* TutorShortAdvice 컴포넌트로 대체 */}
      </TabPanel>
    </TabContext>
  );
};

export default TutorDetail;
