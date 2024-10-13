import React, { useState } from "react";
import * as S from "../styled";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Stepper, Step } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import AddMentor from "./AddMentor";
import ChooseMemberType from "./ChooseMemberType";
import PrivacyInput from "./PrivacyInput";
import AddMentee from "./AddMentee";
import SuccessSign from "./SuccessSign";
import { useSignInputValueStore } from "../../../stores/isSignuped/SignUpStore";
import { sendData } from "../../../api/sign"; 
import axios, { AxiosError } from "axios"; // axios 임포트

const steps = ["회원 유형 선택", "개인 정보 입력", "선배 등록", "완료"];
const API_URL = process.env.REACT_APP_BASE_URL as string;

const SignUp: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [type, setType] = useState<"TUTOR" | "BASIC" | null>(null);

  const {
    setUserEmail,
    setUserPassword,
    setUserName,
    setUserPhone,
    getUserEmail,
    getUserPassword,
    getUserName,
    getUserPhone,
    getUserType,
    getStudentType,
    getSelectedKeywords,
    getSelectedLevel,
    getChatLink,
    getClassArea,
    getClassType,
    getUserSex,
    getPortLink,
    getSchool,
    getTutorProfileImg,
    getTutorIntro,
    getTutorMajor,
    getTutorClassNum
  } = useSignInputValueStore();

  const [inputForm, setInputForm] = useState({
    userEmail: "",
    password: "",
    userName: "",
    userPhone: "",
    confirmPassword: "",
  });

  const [isEmailDuplicate, setIsEmailDuplicate] = useState<boolean | null>(null); // 이메일 중복 체크 상태 추가

  // 이메일 중복 체크 함수
  const checkEmailDuplicate = async (email: string) => {
    try {
      const response = await axios.get(`${API_URL}/api/users/isDuplicate/${email}`);
      setIsEmailDuplicate(response.data); // true: 사용 가능, false: 중복
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          console.warn("403 Forbidden: 중복 체크 API 접근이 제한되었습니다.");
          setIsEmailDuplicate(false); // 403 오류 발생 시 중복으로 설정
          alert('중복된 이메일입니다.');
        } else {
          console.error("Error checking email duplicate:", error.message);
          setIsEmailDuplicate(null);
        }
      } else {
        console.error("Unexpected error:", error);
        setIsEmailDuplicate(null);
      }
    }
  };
  
  // 이메일 입력 시 중복 체크
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setInputForm((prevState) => ({ ...prevState, userEmail: email }));
    checkEmailDuplicate(email); // 이메일 중복 체크
  };

  const handleNext = async () => {
    if (activeStep === 0 && !type) {
      alert("회원 유형을 선택해주세요.");
      return;
    }

    if (activeStep === 1) {
      const { userEmail, password, userName, userPhone, confirmPassword } = inputForm;

      if (!userEmail) {
        alert("이메일을 입력해주세요.");
        return;
      }
      
      if (!password) {
        alert("비밀번호를 입력해주세요.");
        return;
      }
      if (!confirmPassword) {
        alert("비밀번호 확인을 입력해주세요.");
        return;
      }
      if (!userName) {
        alert("이름을 입력해주세요.");
        return;
      }
      if (!userPhone) {
        alert("전화번호를 입력해주세요.");
        return;
      }
      if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 이메일 중복 확인 후 다음 단계로 진행
      if (isEmailDuplicate === false) {
        alert("중복된 이메일입니다. 다른 이메일을 입력해주세요.");
        return;
      }

      // 입력값을 스토어에 저장
      setUserEmail(userEmail);
      setUserPassword(password);
      setUserName(userName);
      setUserPhone(userPhone);
    }

    if (activeStep === 2) {
      // AddMentee 또는 AddMentor에서 유효성 검사 로직 (후배 또는 선배 등록)
      // 기존 로직 유지
    }

    // 마지막 단계에서 데이터 서버로 전송
    if (activeStep === steps.length - 1) {
      const finalData = {
        userEmail: getUserEmail(),
        password: getUserPassword(),
        userName: getUserName(),
        userPhone: getUserPhone(),
        userType: getUserType(),
        studentType: getStudentType(),
        keyword: getSelectedKeywords(),
        level: getSelectedLevel(),
        userSex: getUserSex(),
        chatLink: getChatLink(),
        classArea: getClassArea(),
        classType: getClassType(),
        portLink: getPortLink(),
        school: getSchool(),
        tutorProfileImg: getTutorProfileImg(),
        tutorIntro: getTutorIntro(),
        tutorMajor: getTutorMajor(),
        tutorClassNum: getTutorClassNum(),
      };

      console.log("최종 데이터 전송:", finalData);

      try {
        await sendData(finalData); // API 호출
        console.log("회원가입 성공:", finalData);
        setActiveStep((prev) => prev + 1);
      } catch (error) {
        console.error("회원가입 실패:", error);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const navigate = useNavigate(); 

  return (
    <S.Wrapper sx={{ marginBottom: "5rem" }} className="margin-bottom">
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
        <S.LogInTitle>회원가입</S.LogInTitle>
        <Link to="/index">
          <WestIcon sx={{ fontSize: "28px" }} />
        </Link>
      </Box>
      <Box sx={{ padding: "0px 24px" }}>
        <S.SignStepper activeStep={activeStep} sx={{ margin: "1.5rem 0" }}>
          {steps.map((label) => (
            <Step key={label}>
              <S.StepperLabel>{label}</S.StepperLabel>
            </Step>
          ))}
        </S.SignStepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <SuccessSign />
            <Button onClick={() => navigate('/')}>홈으로 돌아가기</Button>
          </React.Fragment>
        ) : (
          <Box sx={{ mt: 2, mb: 1 }}>
            {activeStep === 0 && <ChooseMemberType setType={setType} />}
            {activeStep === 1 && <PrivacyInput inputForm={inputForm} setInputForm={setInputForm} onEmailChange={handleEmailChange} />} {/* 이메일 입력 필드에 onEmailChange 추가 */}
            {activeStep === 2 && type === "TUTOR" && <AddMentor />}
            {activeStep === 2 && type === "BASIC" && <AddMentee />}
            <Box sx={{ display: "flex", flexDirection: "column", pt: 2, gap: "10px" }}>
              <Button variant="contained" color="inherit" disabled={activeStep === 0} onClick={handleBack}>
                이전
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "완료" : "다음"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </S.Wrapper>
  );
};

export default SignUp;
