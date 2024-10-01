import React from "react";
import * as S from "../styled";
import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useSignInputValueStore } from "../../../stores/isSignuped/SignUpStore"; // 스토어 임포트

export default function AddMentee() {
  const { setStudentType, setSelectedKeywords, setSelectedLevel, setUserSex } = useSignInputValueStore();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <S.SignUpSubTitle>회원가입</S.SignUpSubTitle>
      <S.SignUpTitle>후배 등록</S.SignUpTitle>
      <SelectSmall setStudentType={setStudentType} />
      <SelectGender setStudentGender={setUserSex} />
      <IntroduceKeyword setSelectedKeywords={setSelectedKeywords} />
      <TeachLevel setSelectedLevel={setSelectedLevel} />
    </Box>
  );
}

// 학생 선택 드롭다운 메뉴
function SelectSmall({ setStudentType }: { setStudentType: (type: string) => void }) {
  const [studentType, setLocalStudentType] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setLocalStudentType(value);
    setStudentType(value); // Zustand 스토어에 값 저장
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
        value={studentType}
        label="학생구분"
        onChange={handleChange}
        sx={{ fontSize: "0.5rem", borderRadius: "10px" }}
      >
        <MenuItem value={"대학생"} sx={{ fontSize: "0.5rem" }}>
          대학생
        </MenuItem>
      </Select>
    </S.DropDownMenu>
  );
}

// 성별 선택 드롭다운 메뉴
function SelectGender({ setStudentGender }: { setStudentGender: (gender: string) => void }) {
  const [gender, setLocalGender] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setLocalGender(value);
    setStudentGender(value); // Zustand 스토어에 값 저장
  };

  return (
    <S.DropDownMenu sx={{ minWidth: 150 }} size="small">
      <InputLabel
        id="select-gender-label"
        sx={{
          fontSize: "0.5rem",
        }}
      >
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Typography sx={{ fontSize: "0.5rem", fontWeight: "bold" }}>
            성별
          </Typography>
          <Typography
            sx={{ fontSize: "0.5rem", fontWeight: "bold", color: "red" }}
          >
            *
          </Typography>
        </Box>
      </InputLabel>
      <Select
        labelId="select-gender-label"
        id="select-gender"
        value={gender}
        label="성별"
        onChange={handleChange}
        sx={{ fontSize: "0.5rem", borderRadius: "10px" }}
      >
        <MenuItem value={"M"} sx={{ fontSize: "0.5rem" }}>
          남성
        </MenuItem>
        <MenuItem value={"F"} sx={{ fontSize: "0.5rem" }}>
          여성
        </MenuItem>
      </Select>
    </S.DropDownMenu>
  );
}

// 날 소개하는 키워드 설정
function IntroduceKeyword({ setSelectedKeywords }: { setSelectedKeywords: (keywords: string[]) => void }) {
  const [selectedKeywords, setSelectedKeywordsLocal] = React.useState<string[]>([]);
  const keyword = [
    { id: "1", content: "웹개발" },
    { id: "2", content: "프론트엔드" },
    { id: "3", content: "리액트" },
  ];

  const toggleKeyword = (content: string) => {
    setSelectedKeywordsLocal((prev) => {
      const newKeywords = prev.includes(content)
        ? prev.filter((keyword) => keyword !== content)
        : [...prev, content];
      setSelectedKeywords(newKeywords); // Zustand 스토어에 최신 값 저장
      return newKeywords; // 업데이트된 로컬 상태값 반환
    });
  };

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
      {keyword.map((item) => (
        <S.KeywordChip
          key={item.id}
          label={item.content}
          onClick={() => toggleKeyword(item.content)}
          sx={{
            cursor: "pointer",
            backgroundColor: selectedKeywords.includes(item.content)
              ? "#d3d3d3"
              : "transparent", // 선택되면 배경색 변경
            fontSize: "0.5rem",
            marginRight: "0.4rem",
            marginBottom: "1rem",
          }}
        />
      ))}
    </Box>
  );
}


// 가르칠 수 있는 수준
function TeachLevel({ setSelectedLevel }: { setSelectedLevel: (level: string) => void }) {
  const [selectedLevel, setSelectedLevelLocal] = React.useState("");

  const levels = [
    { id: "1", content: "입문", color: "#e9fbec", border: "#158b28" },
    { id: "2", content: "초급", color: "#FFF1CE", border: "#C3951C" },
    { id: "3", content: "중급 이상", color: "#FFEAEA", border: "#FD5555" },
  ];

  const handleLevelChange = (level: string) => {
    setSelectedLevelLocal(level);
    setSelectedLevel(level); // Zustand 스토어에 선택된 수준 저장
  };

  return (
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
        {levels.map((level) => (
          <FormControlLabel
            key={level.id}
            control={
              <Radio
                checked={selectedLevel === level.content}
                onChange={() => handleLevelChange(level.content)}
                sx={{ display: "none" }} // 기본 라디오 버튼 숨김
              />
            }
            label={
              <S.KeywordChip
                label={level.content}
                sx={{
                  backgroundColor: level.color,
                  border: "1px solid",
                  borderColor: level.border,
                  color: level.border,
                  padding: "0px 0.2rem",
                  cursor: "pointer",
                }}
                onClick={() => handleLevelChange(level.content)} // 클릭 시 선택
              />
            }
          />
        ))}
      </Box>
    </Box>
  );
}
