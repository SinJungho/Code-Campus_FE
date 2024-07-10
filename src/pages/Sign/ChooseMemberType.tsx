import { Box } from "@mui/material";
import React, { useState } from "react";
import * as S from "./styled";

interface CheckboxTypes {
  type: "mentor" | "mentee";
  id: string;
}
export default function ChooseMemberType() {
  return (
    <Box>
      <S.SignUpSubTitle>회원가입</S.SignUpSubTitle>
      <S.SignUpTitle>회원 유형 선택</S.SignUpTitle>
      <Box>
        <Checkbox type="mentor" id="mentor" />
        <Checkbox type="mentee" id="mentee" />
      </Box>
    </Box>
  );
}

function Checkbox({ type, id }: CheckboxTypes) {
  const [activeCheck, setActiveCheck] = React.useState<string | null>(null);

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setActiveCheck(id);
    } else {
      setActiveCheck(null);
    }
  };

  return (
    <S.SignUpLabel className={activeCheck === id ? "active" : ""}>
      <S.CheckInput
        type="checkbox"
        onChange={handleClick}
        name="member"
        checked={activeCheck === id}
      />
      {/* <S.CheckSubText> */}
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
      {/* </S.CheckSubText> */}
    </S.SignUpLabel>
  );
}
