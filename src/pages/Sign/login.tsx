import React, { useState } from "react";
import * as S from "./styled";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Switch,
  Tab,
} from "@mui/material";
// Icons
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import BusinessIcon from "@mui/icons-material/Business";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/img/SNSLogo";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Login: React.FC = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <S.Wrapper>
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
        <S.LogInTitle>로그인</S.LogInTitle>
        <a href="#">
          <CloseIcon sx={{ fontSize: "28px" }} />
        </a>
      </Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} variant="fullWidth">
            <Tab
              sx={{ width: "100%", fontSize: "0.5rem" }}
              label="개인 회원"
              value="1"
            />
            <Tab
              sx={{ width: "100%", fontSize: "0.5rem" }}
              label="기업 회원"
              value="2"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <IndividualMember />
        </TabPanel>
        <TabPanel value="2">
          <CompanyMember />
        </TabPanel>
      </TabContext>
    </S.Wrapper>
  );
};

// 개인 회원 로그인 폼
function IndividualMember() {
  return (
    <S.Wrapper>
      {/* 아이디 입력창 */}
      <S.TextInput
        id="outlined-basic"
        label=""
        placeholder="아이디"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon sx={{ fontSize: 30 }} />
            </InputAdornment>
          ),
        }}
      ></S.TextInput>
      {/* 비밀 번호 입력창 */}
      <S.TextInput
        id="outlined-basic"
        label=""
        placeholder="비밀번호"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon sx={{ fontSize: 30 }} />
            </InputAdornment>
          ),
        }}
      />
      {/* 로그인 버튼 */}
      <Button
        sx={{
          borderRadius: "12px",
          fontSize: "0.5rem",
          fontWeight: "bold",
          padding: "0.4rem 0rem",
          background: "#156aff",
        }}
        variant="contained"
      >
        로그인
      </Button>
      {/* 로그인 유지 */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Checkbox />
        <FindIdOrPw />
      </Box>
      {/* SNS 회원 가입 & 로그인 */}
      <SNSLogInButton />
      {/* 개인 회원 가입 */}
      <S.TextSignUp href="#">개인 회원가입</S.TextSignUp>
    </S.Wrapper>
  );
}

function CompanyMember() {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <S.Wrapper>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <S.SwitchText>서치펌 회원</S.SwitchText>
      </Box>
      {/* 아이디 입력창 */}
      <S.TextInput
        id="outlined-basic"
        label=""
        placeholder={
          checked === true ? "서치펌 회원 아이디" : "기업회원 아이디"
        }
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BusinessIcon sx={{ fontSize: 30 }} />
            </InputAdornment>
          ),
        }}
      ></S.TextInput>
      {/* 비밀 번호 입력창 */}
      <S.TextInput
        id="outlined-basic"
        label=""
        placeholder="비밀번호"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon sx={{ fontSize: 30 }} />
            </InputAdornment>
          ),
        }}
      />
      <Button
        sx={{
          borderRadius: "12px",
          fontSize: "0.5rem",
          fontWeight: "bold",
          padding: "0.4rem 0rem",
          background: "#156aff",
        }}
        variant="contained"
      >
        로그인
      </Button>
      {/* 아이디, 비밀번호 찾기 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <FindIdOrPw />
      </Box>
      {/* 개인 회원 가입 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "36px",
        }}
      >
        <S.CompanySignUpLink href="#">기업 회원가입</S.CompanySignUpLink>
        <S.Line />
        <S.CompanySignUpLink href="#">서치펌 회원가입</S.CompanySignUpLink>
      </Box>
    </S.Wrapper>
  );
}

function SNSLogInButton() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "12rem",
        margin: "36px auto",
      }}
    >
      <S.NaverButton>
        <Logo.NaverLogo />
      </S.NaverButton>
      <S.KakaoButton>
        <Logo.KakaoLogo />
      </S.KakaoButton>
      <S.XButton>
        <Logo.XLogo />
      </S.XButton>
      <S.GoogleButton>
        <Logo.GoogleLogo />
      </S.GoogleButton>
      <S.AppleButton>
        <Logo.AppleLogo />
      </S.AppleButton>
    </Box>
  );
}

function Checkbox() {
  return (
    <S.CheckLabel>
      <S.CheckInput type="checkbox" />
      <S.CheckSubText>로그인 유지</S.CheckSubText>
    </S.CheckLabel>
  );
}

function FindIdOrPw() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <S.FindId href="#">아이디 찾기</S.FindId>
      <S.Line />
      <S.FindPw href="#">비밀번호 찾기</S.FindPw>
    </Box>
  );
}

export default Login;
