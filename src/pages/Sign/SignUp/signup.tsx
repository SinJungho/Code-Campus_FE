import React, { useState } from "react";
import * as S from "../styled";
import { Link,useNavigate } from "react-router-dom";
import { Box, Button, Stepper, Step } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import AddMentor from "./AddMentor";
import ChooseMemberType from "./ChooseMemberType";
import PrivacyInput from "./PrivacyInput";
import AddMentee from "./AddMentee";
import SuccessSign from "./SuccessSign";
import { useSignInputValueStore } from "../../../stores/isSignuped/SignUpStore";
import { sendData } from "../../../api/sign"; // sendData 함수 임포트

const steps = ["회원 유형 선택", "개인 정보 입력", "선배 등록", "완료"];

const SignUp: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [type, setType] = useState<"TUTOR" | "BASIC" | null>(null);
  const {setChatLink, setClassArea, setClassType,setPortLink, setSchool,setTutorIntro, setTutorMajor,
    setTutorProfileImg, setSelectedKeywords, setUserSex ,setSelectedLevel, setStudentType, setUserEmail, 
    setUserPassword, setUserName, setUserPhone, setTutorClassNum,
    getUserPassword, getTutorClassNum, getUserEmail, getUserName, getUserPhone, getUserSex ,getUserType, getStudentType,
    getSelectedKeywords, getSelectedLevel, getChatLink,getClassArea, getClassType, getPortLink, getSchool, 
    getTutorProfileImg, getTutorIntro, getTutorMajor}
    = useSignInputValueStore();

  const [inputForm, setInputForm] = useState({
    userEmail: "",
    password: "",
    userName: "",
    userPhone: "",
    confirmPassword: "",
  });

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
      
      // 입력값을 스토어에 저장
      setUserEmail(userEmail);
      setUserPassword(password);
      setUserName(userName);
      setUserPhone(userPhone);
    }

    // AddMentee 또는 AddMentor에서 유효성 검사
    if (activeStep === 2) {
      // 후배 등록 (AddMentee)
      if (type === "BASIC") {
        const selectedKeywords = getSelectedKeywords();
        const selectedLevel = getSelectedLevel();
        const studentType = getStudentType();
        const gender = getUserSex();

        if (!studentType) {
          alert("학생 유형을 선택해주세요.");
          return;
        }
        if (!gender) {
          alert("성별을 선택해주세요.");
          return;
        }
        if (selectedKeywords.length ===-1) {
          alert("소개 키워드를 선택해주세요.");
          return;
        }
        if (!selectedLevel) {
          alert("현재 자신의 수준을 선택해주세요.");
          return;
        }

        setSelectedKeywords(selectedKeywords);
        setStudentType(studentType);
        setSelectedLevel(selectedLevel);
        setUserSex(gender);
      }

      // 선배 등록 (AddMentor)
      if (type === "TUTOR") {
        const school = getSchool();
        const tutorMajor = getTutorMajor();
        const tutorClassNum = getTutorClassNum();
        const classType = getClassType();
        const classArea = getClassArea();
        const tutorIntro = getTutorIntro();
        const chatLink = getChatLink();
        const portLink = getPortLink();
        const selectedKeywords = getSelectedKeywords();
        const selectedLevel = getSelectedLevel();
        const studentType = getStudentType();
        const gender = getUserSex();

        if (!school) {
          alert("학교를 입력해주세요.");
          return;
        }
        if (!tutorMajor) {
          alert("전공을 입력해주세요.");
          return;
        }
        if (!tutorClassNum) {
          alert("학번을 입력해주세요.");
          return;
        }
        if (!studentType) {
          alert("학생 유형을 선택해주세요.");
          return;
        }
        if (!gender) {
          alert("성별을 선택해주세요.");
          return;
        }
        if (selectedKeywords.length ===-1) {
          alert("소개 키워드를 선택해주세요.");
          return;
        }
        if (!selectedLevel) {
          alert("현재 자신의 수준을 선택해주세요.");
          return;
        }
        if (!classType) {
          alert("수업 방식을 선택해주세요.");
          return;
        }
        if (!classArea) {
          alert("지역을 입력해주세요.");
          return;
        }
        if (!tutorIntro) {
          alert("자기소개를 해주세요.");
          return;
        }
        if (!chatLink) {
          alert("오픈채팅 링크를 입력해주세요.");
          return;
        }
        if (!portLink) {
          alert("포트폴리오 링크를 입력해주세요.");
          return;
        }
      }
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
        // tutoprofileImg: getTutorProfileImg(),
      };

      console.log("최종 데이터 전송:", finalData);

      // API 호출
      try {
        await sendData(finalData); // sendData 함수 호출
        console.log("회원가입 성공:", finalData); // 응답 데이터 확인
        // 성공 처리 로직 추가 (예: 성공 메시지 표시, 리다이렉션 등)
        setActiveStep((prev) => prev + 1);
      } catch (error) {
        console.error("회원가입 실패:", error);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
      return; // 더 이상 진행하지 않음
    }

    // 다음 단계로 진행
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const navigate = useNavigate(); // useNavigate 훅 사용

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
            {activeStep === 1 && <PrivacyInput inputForm={inputForm} setInputForm={setInputForm} />}
            {activeStep === 2 && type === "TUTOR" && <AddMentor />}
            {activeStep === 2 && type === "BASIC" && <AddMentee />}
            <Box sx={{ display: "flex", flexDirection: "column", pt: 2, gap: "10px" }}>
              <Button variant="contained" color="inherit" disabled={activeStep === 0} onClick={handleBack}>
                이전
              </Button>
              <Button variant="contained" onClick={handleNext}>
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
