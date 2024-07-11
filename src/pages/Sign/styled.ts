import styled from "styled-components";
import { Link } from "react-router-dom";
import { Box, TextField, StepLabel, Stepper } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { CheckBox } from "@mui/icons-material";

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const LogInTitle = styled.h4`
  font-size: 0.55rem;
`;

// 아이디, 비밀번호 입력창
export const TextInput = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 14px;
  }

  & .MuiOutlinedInput-input {
    padding: 0.5rem 0rem;
    font-size: 0.5rem;
    font-weight: bold;
  }
`;

// checkbox
const checkIconSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="20" viewBox="0 96 960 960" width="20">
    <path d="M384 840l-240-240 56-56 184 184 392-392 56 56-448 448z"/>
  </svg>
`);

export const CheckInput = styled.input`
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 1.5px solid gainsboro;
  border-radius: 50%;
  background-color: #a6a6a6;
  background-image: url("data:image/svg+xml,${checkIconSvg}");
  background-repeat: no-repeat;
  background-position: 50%;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,${checkIconSvg}");
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #156aff;
  }
`;

export const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`;

export const CheckSubText = styled.p`
  font-size: 0.5rem;
  margin-left: 0.2rem;
`;

export const CheckText = styled.p`
  margin-left: 1.5rem;
`;

export const FindId = styled.a`
  font-size: 0.5rem;
`;

export const Line = styled.span`
  display: inline-block;
  background-color: gray;
  margin: 0rem 0.3rem;
  height: 0.6rem;
  width: 1px;
  opacity: 0.2;
`;

export const FindPw = styled.a`
  font-size: 0.5rem;
`;

export const NaverButton = styled.button`
  width: 40px;
  height: 40px;
  background: #11d166;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const KakaoButton = styled.button`
  width: 40px;
  height: 40px;
  background: #ffe812;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const XButton = styled.button`
  width: 40px;
  height: 40px;
  background: #222;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GoogleButton = styled.button`
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  border: 0.5px solid #dadce0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AppleButton = styled.button`
  width: 40px;
  height: 40px;
  background: #222;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 개인 회원 가입
export const TextSignUp = styled(Link)`
  text-align: center;
  font-size: 0.5rem;
`;

/**
 * 졸업생, 멘토 회원
 */

// 졸업생 회원 스위치
export const SwitchText = styled.p`
  font-size: 0.5rem;
`;

export const MentorSignUpLink = styled(Link)`
  font-size: 0.5rem;
`;

/*
 * * 회원 가입
 */

export const SignUpLabel = styled.label`
      display: flex;
    align-items: center;
    user-select: none;
    background-color: #f9f9f9;
    padding: 1.3rem 0.5rem;
    margin-bottom: 1rem;
    border-radius: 14px;
`;

export const SignUpSubTitle = styled.span`
  display: block;
  font-size: 0.5rem;
  opacity: 0.5;
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

export const SignUpTitle = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const ChooseMemberTypeTitle = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

export const ChooseMemberTypeContext = styled.span`
  font-size: 0.5rem;
`;

/***
 * Stepper
 */

export const StepperLabel = styled(StepLabel)`
  && .MuiStepIcon-text {
    font-size: 0.35rem;
  }

  && .MuiStepLabel-label {
    font-size: 0.5rem;
  }
`;

export const SignStepper = styled(Stepper)`
  & .MuiStepConnector-line {
    display: block;
    border-color: #bdbdbd;
    border-top-style: dotted;
    border-top-width: 1.5px;
  }
`;
