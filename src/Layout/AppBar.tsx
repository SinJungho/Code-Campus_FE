import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import header_logo from "../assets/img/header_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button, Paper } from "@mui/material";
import TemporaryDrawer from "./Drawer";
import { useAuthStore, useUserStore } from "../stores/isLogined/loginStore";
import { useMyProfileStore } from "../stores/Tutor/useDetailStore";
import axios from "axios";

export default function MenuAppBar() {
  const { isLoggedIn } = useAuthStore(); // 상태에서 로그인 여부 가져오기
  const { userName, userNo } = useUserStore(); // 사용자 정보에서 userNo 가져오기
  const [auth, setAuth] = React.useState(isLoggedIn);

  // Zustand store에서 상태 가져오기
  const {
    tutorProfileImg,
    name,
    userType,
    myTuteeList,
    requestedList,
    setUserDetails,
  } = useMyProfileStore(); 

  React.useEffect(() => {
    setAuth(isLoggedIn);
  }, [isLoggedIn]); // isLoggedIn 변경 시 auth 상태 업데이트

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleUserNameClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/tutor/${userNo}/detail`, {
        headers: {
          Authorization: `Bearer ${document.cookie.split('=')[1]}`, // 쿠키에서 토큰 가져오기
          'Content-Type': 'application/json',
        },
      });

      const { tutorProfileImg, name, userType } = response.data.data.tutorDetailResponse;
      const { myTuteeList, requestedList } = response.data.data;

      // 전체 데이터를 상태에 저장
      setUserDetails({ tutorProfileImg, name, userType, myTuteeList, requestedList });

      console.log(response.data); // 서버 응답 처리

      // 데이터가 저장된 상태를 콘솔에 출력
      console.log("tutorProfileImg:", tutorProfileImg);
      console.log("name:", name);
      console.log("userType:", userType);
      console.log("myTuteeList:", myTuteeList);
      console.log("requestedList:", requestedList);
      
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          padding: "1.5rem",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <TemporaryDrawer />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, minHeight: "3rem" }}
          >
            <Link to="/">
              <img
                src={header_logo}
                alt="header_logo"
                style={{ width: "10rem" }}
              />
            </Link>
          </IconButton>
          <Box sx={{ minWidth: "4.5rem", display: "flex", justifyContent: "end" }}>
            {isLoggedIn ? (
              <Link to="/profile" onClick={handleUserNameClick}>
                <Paper sx={{ padding: "0.5rem" }}>
                  {userName} 님 {/* 사용자 이름이 여기에 표시됩니다. */}
                </Paper>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 5,
                    padding: ".2rem 1rem",
                    fontSize: "0.75rem",
                  }}
                >
                  로그인
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
