import * as S from "../styled";
import React, { ChangeEvent } from "react";
import { Box } from "@mui/material";
import { useUserNameStore } from "../../../stores/isSignuped/userSucess";
import { useSignInputValueStore } from "../../../stores/isSignuped/SignUpStore"; // 추가된 import

interface PrivacyInputProps {
  inputForm: {
    userEmail: string;
    password: string;
    userName: string;
    userPhone: string;
    confirmPassword: string;
  };
  setInputForm: React.Dispatch<React.SetStateAction<{
    userEmail: string;
    password: string;
    userName: string;
    userPhone: string;
    confirmPassword: string;
  }>>;
}

export default function PrivacyInput({ inputForm, setInputForm }: PrivacyInputProps) {
  const { setName } = useUserNameStore();
  const { setUserEmail, setUserPassword, setUserName, setUserPhone } = useSignInputValueStore(); // 스토어에서 setter 함수 가져오기

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // 각 필드에 대해 스토어 업데이트
    if (name === "userName") {
      setName(value);
    } else if (name === "userEmail") {
      setUserEmail(value);
    } else if (name === "password") {
      setUserPassword(value);
    } else if (name === "userPhone") {
      setUserPhone(value);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <S.SignTextInput
        fullWidth
        required
        type="email"
        id="email-required"
        label="이메일"
        variant="outlined"
        name="userEmail"
        value={inputForm.userEmail}
        onChange={handleChange}
      />
      <S.SignTextInput
        fullWidth
        required
        type="password"
        id="password-required"
        label="비밀번호"
        variant="outlined"
        name="password"
        value={inputForm.password}
        onChange={handleChange}
      />
      <S.SignTextInput
        fullWidth
        required
        type="password"
        id="repeatPassword-required"
        label="비밀번호 확인"
        variant="outlined"
        name="confirmPassword"
        value={inputForm.confirmPassword}
        onChange={handleChange}
      />
      <S.SignTextInput
        fullWidth
        required
        type="text"
        id="name-required"
        label="이름"
        variant="outlined"
        name="userName"
        value={inputForm.userName}
        onChange={handleChange}
      />
      <S.SignTextInput
        fullWidth
        required
        type="tel"
        id="phone-required"
        label="전화번호"
        variant="outlined"
        name="userPhone"
        value={inputForm.userPhone}
        onChange={handleChange}
      />
    </Box>
  );
}
