import * as S from "../styled";
import React, { ChangeEvent } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useUserNameStore } from "../../../stores/isSignuped/userSucess";
import { useSignInputValueStore } from "../../../stores/isSignuped/SignUpStore";

interface PrivacyInputProps {
  inputForm: {
    userEmail: string;
    password: string;
    userName: string;
    userPhone: string;
    confirmPassword: string;
  };
  setInputForm: React.Dispatch<
    React.SetStateAction<{
      userEmail: string;
      password: string;
      userName: string;
      userPhone: string;
      confirmPassword: string;
    }>
  >;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 이메일 변경 함수
  checkEmailDuplicate: () => Promise<void>; // 이메일 중복 체크 함수
  isEmailDuplicate: boolean | null; // 이메일 중복 여부 상태
}

export default function PrivacyInput({
  inputForm,
  setInputForm,
  onEmailChange,
  checkEmailDuplicate, // 중복 체크 함수 추가
  isEmailDuplicate, // 중복 여부 상태 추가
}: PrivacyInputProps) {
  const { setUserEmail, setUserPassword, setUserName, setUserPhone } =
    useSignInputValueStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // 각 필드에 대해 스토어 업데이트
    if (name === "userName") {
      setUserName(value);
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
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <S.SignTextInput
          fullWidth
          required
          type="email"
          id="email-required"
          label="이메일"
          variant="outlined"
          name="userEmail"
          value={inputForm.userEmail}
          onChange={onEmailChange}
          sx={{ flex: 1, height: '56px' }} // Set height to match the button
        />
        <Button
          onClick={checkEmailDuplicate}
          variant="contained"
          size="small"
          sx={{ 
            marginLeft: "10px", 
            height: '46px',
            borderRadius: "8px",
            fontSize: '0.6rem'
          }}
        >
          이메일 중복 확인
        </Button>
      </Box>
      {isEmailDuplicate === false && (
        <S.ErrorMessage>
          중복된 이메일입니다. 다른 이메일을 입력해주세요.
        </S.ErrorMessage>
      )}
      {isEmailDuplicate === true && (
        <S.SuccessMessage>
          사용 가능한 이메일입니다.
        </S.SuccessMessage>
      )}

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
