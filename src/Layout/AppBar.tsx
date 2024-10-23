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
import { Button, Paper, Typography } from "@mui/material";
import TemporaryDrawer from "./Drawer";
import { useAuthStore, useUserStore } from "../stores/isLogined/loginStore";
import { useMyProfileStore } from "../stores/Tutor/useDetailStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

export default function MenuAppBar() {
  const { isLoggedIn, setIsLoggedIn } = useAuthStore(); // 상태에서 로그인 여부 가져오기
  const { userName, userNo } = useUserStore(); // 사용자 정보에서 userNo 가져오기
  const [auth, setAuth] = React.useState(isLoggedIn);

  // Zustand store에서 상태 가져오기
  const {
    tutorProfileImg,
    name,
    myTuteeList,
    requestedList,
    setUserDetails,
    setTuteeDetail,
  } = useMyProfileStore();

  const { 
    userType,
  }= useUserStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleLogOut = async () => {
    try {
      // Retrieve the accessToken from the cookie
      const accessToken = document.cookie.split("=")[1]; // Adjust according to how your cookie is set

      // Optional: If you have an API endpoint to handle logout on the server
      await axios.post(
        "http://localhost:8080/api/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Clear the cookie
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("refresh");
      // Update auth state
      setAuth(false);
      setIsLoggedIn(false);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleTutorNameClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tutor/${userNo}/detail`,
        {
          headers: {
            Authorization: `Bearer ${document.cookie.split("=")[1]}`, // 쿠키에서 토큰 가져오기
            "Content-Type": "application/json",
          },
        }
      );

      console.log("튜터 호출 성공")

      const { tutorProfileImg, name, userType } =
        response.data.data.tutorDetailResponse;
      const { myTuteeList, requestedList } = response.data.data;

      // 전체 데이터를 상태에 저장
      setUserDetails({
        tutorProfileImg,
        name,
        userType,
        myTuteeList,
        requestedList,
      });

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


  //튜티일때 
  const handleTuteeNameClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tutee/${userNo}/mypage`,
        {
          headers: {
            Authorization: `Bearer ${document.cookie.split("=")[1]}`, // 쿠키에서 토큰 가져오기
            "Content-Type": "application/json",
          },
        }
      );
      console.log("튜티 호출 성공")
      console.log(response.data); // 서버 응답 처리

      const { ongoingMentorshipList, requestedMentorshipList, tuteeDetailResponse } = response.data.data;

      // 상태에 저장
      setTuteeDetail({
        tuteeName: tuteeDetailResponse.name,
        keywordList: [], // 필요시 추가
        classLevel: "", // 필요시 추가
        mentorshipDay: [], // 필요시 추가
        mentorshipTime: ongoingMentorshipList.length > 0 ? ongoingMentorshipList[0].mentorshipTime : '', // 예시로 첫 번째 멘토링 시간 사용
        note: ongoingMentorshipList.length > 0 ? ongoingMentorshipList[0].note : null, // 예시로 첫 번째 멘토링 노트 사용
      });

      
    } catch (error) {
      console.error("튜티 호출 실패:", error);
    }
  };

  React.useEffect(() => {
    setAuth(isLoggedIn);
    console.log(userType);
  }, [isLoggedIn, userType]); // isLoggedIn 변경 시 auth 상태 업데이트

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
          <Box
            sx={{ minWidth: "4.5rem", display: "flex", justifyContent: "end" }}
          >
          {isLoggedIn ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Typography> {userName}님</Typography>
              <Link
                to={userType === "BASIC" ? "/profileTutee" : "/profile"}
                onClick={async () => {
                  if (userType === "TUTOR") {
                    await handleTutorNameClick(); // 기존 함수 호출
                  } else if (userType === "BASIC") {
                    await handleTuteeNameClick();
                  }
                }}
              >
                <AccountCircleIcon />
              </Link>
              <Button variant="contained" onClick={() => handleLogOut()}>
                로그아웃
              </Button>
            </Box>
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
