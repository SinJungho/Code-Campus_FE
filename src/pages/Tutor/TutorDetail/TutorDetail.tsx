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
import TutorDefaultInfo from "./TutorDefaultInfo";
import TutorShortAdvice from "./TutorShortAdvice";
import { useMyProfileStore } from "../../../stores/Tutor/useDetailStore";
import { useUserStore } from "../../../stores/isLogined/loginStore";

const API_URL = process.env.REACT_APP_BASE_URL as string;

interface TutorData {
  keyword: string;
  name: string;
  classArea: string;
  classType: string;
  school: string;
  tutorIntro: string;
  chatLink: string;
  portLink: string;
}

const TutorDetail: React.FC = () => {
  const { userNo } = useParams<{ userNo: string }>();
  const tutorId = Number(userNo);
  const [loading, setLoading] = useState(true);
  const [tutorData, setTutorData] = useState<TutorData | null>(null); // tutorData 상태 추가
  const [keywords, setKeywords] = useState<string>(""); // 기본값을 빈 문자열로 설정
  const { userType } = useUserStore();

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

        const response = await axios.get(
          `${API_URL}/api/tutor/profile/${tutorId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.data) {
          const data = response.data.data;

          // tutorData 상태에 API 응답 데이터 저장
          setTutorData(data);
          setKeywords(data.keyword || ""); // keyword는 문자열이므로 기본값을 빈 문자열로 설정
        } else {
          console.error("Invalid response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tutor data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userNo) {
      fetchTutorData();
    }
  }, [userNo]);

  if (loading) {
    return <Typography>Loading...</Typography>; // 로딩 상태 표시
  }

  // const emojiInfo = [
  //   {
  //     id: 1,
  //     emoji: <FavoriteIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
  //     text: "Like",
  //   },
  //   {
  //     id: 2,
  //     emoji: <SmsIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
  //     text: "Comment",
  //   },
  // ];

  const mentorInfo = [
    {
      id: 1,
      icon: <FmdGoodIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: "컴퓨터공학", // 예시로 고정된 값을 사용
    },
    {
      id: 2,
      icon: <LaptopIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: "개인", // 예시로 고정된 값을 사용
    },
  ];
  
  return (
    <S_detail.Wrapper>
      <Box sx={{ padding: "24px" }}>
        {/* 선배 기술 스택 */}
        <Box>
          <MentorSkillKeyword keywords={keywords} />
        </Box>

        {/* 선배 기본 정보 & 매칭 요청 버튼 */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Box sx={{ display: "flex", marginBottom: "20px", gap: "2rem" }}>
  <Typography sx={{ fontSize: "0.75rem" }}>
    <b style={{ fontSize: "0.82rem" }}>{tutorData?.name}</b> 선배님
  </Typography>
  <Box>
    {userType === "BASIC" && ( 
      <Link to={`/tutorMatching?tutorNo=${tutorId}`}>
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
    )}
    <Button
      variant="outlined"
      sx={{ fontSize: "0.5rem", fontWeight: "bold" }}
    >
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
          {/* <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
          </Box> */}
        </Box>

        {/* 선배 상세 페이지 탭 컴포넌트 */}
        <Box>
          <MentorTabMenu tutorData={tutorData} /> {/* tutorData 전달 */}
        </Box>
      </Box>
    </S_detail.Wrapper>
  );
};

// 기술 스택 키워드 컴포넌트
const MentorSkillKeyword = ({ keywords }: { keywords: string }) => {
  const keywordArray = keywords.split(",").map((keyword) => keyword.trim()); // 문자열을 배열로 변환

  return (
    <Box>
      {keywordArray.map((keyword, index) => (
        <S_detail.KeywordChip
          key={index}
          sx={{
            fontSize: "0.5rem",
            marginRight: "0.4rem",
            marginBottom: "1rem",
          }}
          label={`# ${keyword}`} // 공백 제거 후 출력
        />
      ))}
    </Box>
  );
};

// 선배 상세 페이지 탭 메뉴
const MentorTabMenu: React.FC<{ tutorData: TutorData | null }> = ({
  tutorData,
}) => {
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
          <Tab
            sx={{ width: "100%", fontSize: "0.5rem" }}
            label="선배 기본 정보"
            value="1"
          />
          <Tab
            sx={{ width: "100%", fontSize: "0.5rem" }}
            label="후배들의 한마디"
            value="2"
          />
        </TabList>
      </Box>
      {isSticky && <Box sx={{ height: "48px" }} />}
      <TabPanel value="1">
        <Typography>선배 기본 정보</Typography>
        {tutorData && <TutorDefaultInfo tutorData={tutorData} />}
      </TabPanel>
      <TabPanel value="2">
        <Typography>후배들의 한마디</Typography>
        <TutorShortAdvice />
      </TabPanel>
    </TabContext>
  );
};

export default TutorDetail;
