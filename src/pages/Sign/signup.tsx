import React, { useState } from "react";
import * as S from "./styled";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
// Icons
import WestIcon from "@mui/icons-material/West";
import AddMentor from "./AddMentor";
import ChooseMemberType from "./ChooseMemberType";
import PrivacyInput, {
  PrivacyInputContent,
  StateProvider,
} from "./PrivacyInput";
import AddMentee from "./AddMentee";
import SuccessSign from "./SuccessSign";

const steps = ["회원 유형 선택", "개인 정보 입력", "선배 등록"];

const SignUp: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [type, setType] = React.useState<"mentor" | "mentee" | null>(null);

  const isStepOptional = (step: number) => {
    return step === 2;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("현재 단계에서 건너뛰기를 할 수 없습니다.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <StateProvider>
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
        {/* stepper */}
        <Box sx={{ padding: "0px 24px" }}>
          <S.SignStepper activeStep={activeStep} sx={{ margin: "1.5rem 0" }}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <S.StepperLabel {...labelProps}>{label}</S.StepperLabel>
                </Step>
              );
            })}
          </S.SignStepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <SuccessSign />
              <Button
                sx={{
                  borderRadius: "10px",
                  fontSize: "0.5rem",
                  fontWeight: "bold",
                  padding: "0.5rem",
                  marginTop: "3.5rem",
                }}
                fullWidth
                variant="contained"
                onClick={handleReset}
              >
                홈으로 돌아가기
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box sx={{ mt: 2, mb: 1 }}>
                {/* 회원 유형 선택 */}
                {activeStep === 0 && <ChooseMemberType setType={setType} />}
                {/* 개인 정보 입력 */}
                {activeStep === 1 && <PrivacyInput />}
                {/* 선배 등록 */}
                {activeStep === 2 && type === "mentor" && <AddMentor />}
                {activeStep === 2 && type === "mentee" && <AddMentee />}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  pt: 2,
                  gap: "10px",
                }}
              >
                <Button
                  variant="contained"
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{
                    fontSize: "0.5rem",
                    fontWeight: "bold",
                    padding: "0.5rem 0",
                    borderRadius: "10px",
                  }}
                >
                  이전
                </Button>
                <Box
                  sx={{
                    flex: "1 1 auto",
                    fontSize: "0.5rem",
                    fontWeight: "bold",
                  }}
                />

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    fontSize: "0.5rem",
                    fontWeight: "bold",
                    padding: "0.5rem 0px",
                    borderRadius: "10px",
                  }}
                >
                  {activeStep === steps.length - 1 ? "완료" : "다음으로"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </S.Wrapper>
    </StateProvider>
  );
};

export default SignUp;
