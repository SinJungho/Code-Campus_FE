import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as S from "../styled";
import { useSignInputValueStore } from "../../../stores/isSignuped/SignUpStore"; // 상태 저장소 import
import { useNavigate } from "react-router-dom";

interface ChooseMemberTypeProps {
  setType: React.Dispatch<React.SetStateAction<"TUTOR" | "BASIC" | null>>;
}

export default function ChooseMemberType({ setType }: ChooseMemberTypeProps) {
  const { setUserType, userType } = useSignInputValueStore(); // Zustand에서 setUserType과 userType 가져오기
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState<"TUTOR" | "BASIC" | null>(null);

  const handleCheckboxChange = (type: "TUTOR" | "BASIC") => {
    setType(type);
    setUserType(type); // Zustand에 userType 저장
    setSelectedType(type); // 로컬 상태에 선택된 유형 저장
  };

  // Zustand에 있는 userType을 콘솔에 로그로 찍기
  useEffect(() => {
    console.log("현재 사용자 유형:", userType);
  }, [userType]); // userType이 변경될 때마다 로그 출력

  return (
    <Box>
      <S.SignUpSubTitle>회원가입</S.SignUpSubTitle>
      <S.SignUpTitle>회원 유형 선택</S.SignUpTitle>
      <Box>
        <RadioButton
          type="TUTOR"
          id="TUTOR"
          selectedType={selectedType}
          onChange={handleCheckboxChange}
        />
        <RadioButton
          type="BASIC"
          id="TUTEE"
          selectedType={selectedType}
          onChange={handleCheckboxChange}
        />
      </Box>
    </Box>
  );
}

interface RadioButtonProps {
  type: "TUTOR" | "BASIC";
  id: string;
  selectedType: "TUTOR" | "BASIC" | null;
  onChange: (type: "TUTOR" | "BASIC") => void;
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
          {type === "TUTOR" ? "선배" : "후배"}
        </S.ChooseMemberTypeTitle>
        <S.ChooseMemberTypeContext>
          {type === "TUTOR"
            ? "코딩을 가르쳐 줄거에요! (대학생만 가능합니다!)"
            : "코딩을 배울거에요!"}
        </S.ChooseMemberTypeContext>
      </Box>
    </S.SignUpLabel>
  );
}
