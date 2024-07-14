import React from "react";
import * as S from "../styled";
import * as S_detail from "./TutorDetail_styled";
import { Link } from "react-router-dom";
import { Box, Button, Tab, Typography } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LaptopIcon from "@mui/icons-material/Laptop";
import Carousel from "react-material-ui-carousel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmsIcon from "@mui/icons-material/Sms";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TutorDefaultInfo from "./TutorDefaultInfo";
import TutorShortAdvice from "./TutorShortAdvice";

const TutorDetail: React.FC = () => {
  const emojiInfo = [
    {
      id: 1,
      emoji: <FavoriteIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: "129",
    },
    {
      id: 2,
      emoji: <SmsIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: "129",
    },
  ];
  const mentorInfo = [
    {
      id: 1,
      icon: <FmdGoodIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: "경기도 안양시",
    },
    {
      id: 2,
      icon: <LaptopIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: "온라인 강의 / 오프라인 강의",
    },
  ];
  const stepFourCarousel = [
    {
      id: 1,
      url: "https://via.placeholder.com/824x464?text=Mentor1.png",
      alt: "멘토 사진 1",
    },
    {
      id: 2,
      url: "https://via.placeholder.com/824x464?text=Mentor2.png",
      alt: "멘토 사진 2",
    },
    {
      id: 3,
      url: "https://via.placeholder.com/824x464?text=Mentor3.png",
      alt: "멘토 사진 2",
    },
  ];
  return (
    <S_detail.Wrapper>
      {/* 이미지 슬라이드 */}
      <Box>
        <Carousel
          height={464}
          navButtonsAlwaysVisible={true}
          animation="slide"
          indicatorIconButtonProps={{
            style: {
              padding: "10px",
              color: "#D9D9D9",
              border: "none",
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: "#1564FF",
              border: "none",
            },
          }}
          navButtonsAlwaysInvisible={true}
        >
          {stepFourCarousel.map((content) => (
            <Box
              key={content.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <img src={content.url} alt={content.alt} />
            </Box>
          ))}
        </Carousel>
      </Box>
      <Box sx={{ padding: "24px" }}>
        {/* 선배 기술 스택 */}
        <Box>
          <MentorSkillKeyword />
        </Box>
        {/* 선배 기본 정보 & 매칭 요청 버튼 */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Box sx={{ display: "flex", marginBottom: "20px", gap: "2rem" }}>
            <Typography sx={{ fontSize: "0.75rem" }}>
              <b style={{ fontSize: "0.82rem" }}>맹승열</b> 선배님
            </Typography>
            <Box>
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
              <Button
                variant="outlined"
                sx={{ fontSize: "0.5rem", fontWeight: "bold" }}
              >
                공유하기
              </Button>
            </Box>
          </Box>
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
                <Typography sx={{ fontSize: "0.6rem" }}>
                  {index.text}
                </Typography>
              </Box>
            );
          })}
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {emojiInfo.map((index) => {
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
                  {index.emoji}
                  <Typography sx={{ fontSize: "0.6rem" }}>
                    {index.text}
                  </Typography>
                </Box>
              );
            })}
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

// 날 소개하는 키워드 설정
const MentorSkillKeyword = () => {
  const keyword = [
    { id: "1", content: "# 웹 개발" },
    { id: "2", content: "# 프론트엔드" },
    { id: "3", content: "# 리액트" },
  ];
  return (
    <Box>
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
};

const MentorTabMenu = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
      <TabPanel value="1">
        <TutorDefaultInfo />
      </TabPanel>
      <TabPanel value="2">
        <TutorShortAdvice />
      </TabPanel>
    </TabContext>
  );
};

export default TutorDetail;
