import React from "react";
import * as S from "./styled";
import * as S_detail from "./TutorDetail_styled";
import { Link } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Tab,
  Tabs,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TemporaryDrawer from "../../Layout/Drawer";
import Carousel from "react-material-ui-carousel";

const TutorDetail: React.FC = () => {
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
  ];
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
          padding: "0.3rem 24px",
        }}
      >
        <TemporaryDrawer />
        <S_detail.LogInTitle>선배 탐색</S_detail.LogInTitle>
        <Link to="/index">
          <CloseIcon sx={{ fontSize: "28px" }} />
        </Link>
      </Box>
      {/* 이미지 슬라이드 */}
      <Carousel
        cycleNavigation={true}
        navButtonsAlwaysVisible={true}
        animation="slide"
        indicators={true}
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
  );
};
export default TutorDetail;
