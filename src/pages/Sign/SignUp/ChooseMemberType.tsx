import { Box } from "@mui/material";
import React, { useState } from "react";
import * as S from "../styled";
// import useSignUp from "../../../hooks/useSignUp";
import { useNavigate } from "react-router-dom";

interface ChooseMemberTypeProps {
  setType: React.Dispatch<React.SetStateAction<"mentor" | "mentee" | null>>;
}

export default function ChooseMemberType({ setType }: ChooseMemberTypeProps) {
  // const { userSignUp } = useSignUp();
  const navigate = useNavigate();

  const [inputForm, setInputForm] = useState({
    userEmail: "",
    password: "",
    userName: "",
    userPhone: "",
    userSex: "",
    userType: "" as "mentee" | "mentor",
    keyword: [""],
    level: "",
    school: "",
    classArea: "",
    classType: "",
    tutorProfileImg: "",
    tutorMajor: "",
    tutorClassNum: "",
    tutorIntro: "",
    chatLink: "",
    portLink: "",
    authYN: "",
    tutorLikes: 0,
    studentType: "",
  });

  const handleSubmit = async () => {
    try {
      // await userSignUp(inputForm);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (type: "mentor" | "mentee") => {
    setType(type);
    setInputForm({ ...inputForm, userType: type });
  };

  return (
    <Box>
      <S.SignUpSubTitle>회원가입</S.SignUpSubTitle>
      <S.SignUpTitle>회원 유형 선택</S.SignUpTitle>
      <Box>
        <RadioButton
          type="mentor"
          id="mentor"
          selectedType={inputForm.userType}
          onChange={handleCheckboxChange}
        />
        <RadioButton
          type="mentee"
          id="mentee"
          selectedType={inputForm.userType}
          onChange={handleCheckboxChange}
        />
      </Box>
    </Box>
  );
}

interface RadioButtonProps {
  type: "mentor" | "mentee";
  id: string;
  selectedType: string;
  onChange: (type: "mentor" | "mentee") => void;
}

function RadioButton({ type, id, selectedType, onChange }: RadioButtonProps) {
  const handleClick = () => {
    onChange(type);
  };

  return (
    <S.SignUpLabel className={selectedType === type ? "active" : ""}>
      <S.CheckInput
        type="radio"
        onChange={handleClick}
        name="member"
        value={type}
        checked={selectedType === type}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          fontSize: "0.5rem",
          marginLeft: "0.7rem",
        }}
      >
        <S.ChooseMemberTypeTitle>
          {type === "mentor" ? "선배" : "후배"}
        </S.ChooseMemberTypeTitle>
        <S.ChooseMemberTypeContext>
          {type === "mentor"
            ? "코딩을 가르쳐 줄거에요! (대학생만 가능합니다!)"
            : "코딩을 배울거에요!"}
        </S.ChooseMemberTypeContext>
      </Box>
    </S.SignUpLabel>
  );
}
