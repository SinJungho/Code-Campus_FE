import React, { useState } from "react";
import * as S from "../styled";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, InputAdornment } from "@mui/material";
// Icons
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../../assets/img/SNSLogo";
import useLogin from "../../../hooks/useLogin";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState({ userEmail: "", password: "" });
  const { emailLogin } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await emailLogin(inputForm);
      navigate("/"); // 로그인 성공 시 이동할 페이지
    } catch (error) {
      console.error("로그인 실패:", error);
    }
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
        <Link to="/index"> {/* 홈으로 가는 링크 추가 */}
          <S.LogInTitle>홈</S.LogInTitle>
        </Link>
        <Link to="/index">
          <CloseIcon sx={{ fontSize: "28px" }} />
        </Link>
      </Box>
      <S.Wrapper className="padding">
        {/* 아이디 입력창 */}
        <S.TextInput
          id="outlined-basic"
          label=""
          placeholder="아이디"
          variant="outlined"
          name="userEmail"
          value={inputForm.userEmail}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ fontSize: 30 }} />
              </InputAdornment>
            ),
          }}
        />
        {/* 비밀번호 입력창 */}
        <S.TextInput
          id="outlined-basic"
          label=""
          placeholder="비밀번호"
          variant="outlined"
          name="password"
          value={inputForm.password}
          onChange={handleChange}
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
          onClick={handleSubmit}
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
        <S.TextSignUp to="/signup">멘티 회원가입</S.TextSignUp>
      </S.Wrapper>
    </S.Wrapper>
  );
};

const SNSLogInButton = () => {
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
};

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
