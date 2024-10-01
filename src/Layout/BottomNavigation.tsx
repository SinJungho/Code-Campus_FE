import * as React from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Home } from "@mui/icons-material";
import { PeopleAlt } from "@mui/icons-material";
import { EmojiEvents } from "@mui/icons-material"; // awards를 올바르게 import
import { Assistant } from "@mui/icons-material"; // intro를 올바르게 import
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LabelBottomNavigation() {
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <ThemeProvider theme={theme}>
        <BottomNavigation
          showLabels
          sx={{
            height: isMobile ? "5rem" : "5rem",
            gap: isMobile ? "1rem" : "1rem",
          }}
        >
          <BottomNavigationAction
            label="home"
            onClick={() => {
              navigate("/home");
            }}
            icon={<Home sx={{ fontSize: isMobile ? "2rem" : "2rem" }} />}
          />
          {/* <BottomNavigationAction
            label="서비스 소개"
            onClick={() => {
              navigate("/intro");
            }}
            icon={<Assistant sx={{ fontSize: isMobile ? "2rem" : "2rem" }} />}
          /> */}
          <BottomNavigationAction
            label="선배 탐색"
            onClick={() => {
              navigate("/tutorList");
            }}
            icon={<PeopleAlt sx={{ fontSize: isMobile ? "2rem" : "2rem" }} />}
          />
          {/* <BottomNavigationAction
            label="코캠 공모전"
            onClick={() => {
              navigate("/awards");
            }}
            icon={<EmojiEvents sx={{ fontSize: isMobile ? "2rem" : "2rem" }} />}
          /> */}
        </BottomNavigation>
      </ThemeProvider>
    </Paper>
  );
}
