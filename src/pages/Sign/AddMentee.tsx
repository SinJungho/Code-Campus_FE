//import * as S_signOk from "./AddMentee_styled";
import * as S from "./styled";
import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export default function AddMentee() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <S.SignUpSubTitle>회원가입</S.SignUpSubTitle>
      <S.SignUpTitle>후배 등록</S.SignUpTitle>
      <SelectSmall />
      <IntroduceKeyword />
      <TeachLevel />
    </Box>
  );
}

// 성별 선택 드롭다운 메뉴
function SelectSmall() {
  const [gender, setGender] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  };

  return (
    <S.DropDownMenu sx={{ minWidth: 150 }} size="small">
      <InputLabel
        id="demo-select-small-label"
        sx={{
          fontSize: "0.5rem",
        }}
      >
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Typography sx={{ fontSize: "0.5rem", fontWeight: "bold" }}>
            학생 구분
          </Typography>
          <Typography
            sx={{ fontSize: "0.5rem", fontWeight: "bold", color: "red" }}
          >
            *
          </Typography>
        </Box>
      </InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={gender}
        label="학생구분"
        onChange={handleChange}
        sx={{ fontSize: "0.5rem", borderRadius: "10px" }}
      >
        <MenuItem value={"student"} sx={{ fontSize: "0.5rem" }}>
          대학생
        </MenuItem>
      </Select>
    </S.DropDownMenu>
  );
}

// 날 소개하는 키워드 설정
function IntroduceKeyword() {
  const keyword = [
    { id: "1", content: "# 웹 개발" },
    { id: "2", content: "# 프론트엔드" },
    { id: "3", content: "# 리액트" },
  ];
  return (
    <Box>
      <Box sx={{ display: "flex", marginBottom: "0.6rem" }}>
        <Box sx={{ display: "flex", marginRight: "10px" }}>
          <S.Title>날 소개하는 키워드 설정</S.Title>
          <S.Star>*</S.Star>
        </Box>
        <S.Context>중복 선택 가능</S.Context>
      </Box>
      <Typography
        sx={{ fontSize: "0.55rem", marginBottom: "0.4rem", fontWeight: "bold" }}
      >
        추천 키워드
      </Typography>
      {keyword.map((item) => {
        return (
          <S.KeywordChip
            sx={{
              fontSize: "0.5rem",
              marginRight: "0.4rem",
              marginBottom: "1rem",
            }}
            key={item.id}
            label={item.content}
          ></S.KeywordChip>
        );
      })}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <S.TextInput
          fullWidth
          placeholder="키워드 검색"
          sx={{
            flex: "1.7",
            padding: "0.5rem",
            "& .MuiOutlinedInput-input": {
              padding: "0.5rem",
            },
          }}
        ></S.TextInput>
        <Button
          variant="contained"
          sx={{
            fontSize: "0.5rem",
            fontWeight: "bold",
            padding: "12px 16px",
            marginLeft: "0.5rem",
            flex: "0.1",
          }}
        >
          검색하기
        </Button>
      </Box>
    </Box>
  );
}

// 가르칠 수 있는 수준
function TeachLevel() {
  const level = [
    { id: "1", content: "입문", color: "#e9fbec", border: "#158b28" },
    { id: "2", content: "초급", color: "#FFF1CE", border: "#C3951C" },
    { id: "3", content: "중급 이상", color: "#FFEAEA", border: "#FD5555" },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          marginBottom: "0.6rem",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box sx={{ display: "flex", marginRight: "10px" }}>
          <S.Title>현재 자신의 수준</S.Title>
          <S.Star>*</S.Star>
        </Box>
        <Box sx={{ display: "flex", gap: "10px" }}>
          {level.map((level) => {
            return (
              <S.KeywordChip
                key={level.id}
                label={level.content}
                sx={{
                  backgroundColor: level.color,
                  border: "1px solid",
                  borderColor: level.border,
                  color: level.border,
                  padding: "0px 0.2rem",
                }}
              ></S.KeywordChip>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
