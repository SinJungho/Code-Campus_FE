import React from "react";
import * as S from "./styled";
import { Link } from "react-router-dom";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

const Login: React.FC = () => {
  return (
    <S.Wrapper>
      <TextField
        id="outlined-basic"
        label=""
        placeholder="아이디"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      ></TextField>
      <TextField
        id="outlined-basic"
        label=""
        placeholder="비밀번호"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained">로그인</Button>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Checkbox />
        <FindIdOrPw />
      </Box>
    </S.Wrapper>
  );
};

function Checkbox() {
  return (
    <S.CheckLabel>
      <S.CheckInput type="checkbox" />
      <p>로그인 유지</p>
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
