import * as S from "./styled";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { ChangeEvent, useState } from "react";
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
import { data } from "./addrData";

// 선배 등록 페이지
export default function AddMentor() {
  return (
    <Box>
      <Box>
        <S.SignUpSubTitle>회원가입</S.SignUpSubTitle>
        <S.SignUpTitle>선배 등록</S.SignUpTitle>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <S.SignTextInput
            required
            id="outlined-required"
            label="학교"
            placeholder="학교 이름을 입력 해주세요."
            sx={{
              width: "91%",
              fontSize: "0.5rem",
            }}
          />

          <Button
            variant="contained"
            sx={{
              fontSize: "0.5rem",
              fontWeight: "bold",
              padding: "12px 16px",
            }}
          >
            학교 찾기
          </Button>
        </Box>
        <S.SignTextInput
          required
          id="outlined-required"
          label="전공"
          placeholder="전공 이름을 입력 해주세요."
          sx={{ fontSize: "0.5rem" }}
        />
        <S.SignTextInput
          required
          id="outlined-required"
          label="학번"
          placeholder="학번을 입력 해주세요."
          sx={{ fontSize: "0.5rem" }}
        />
        <SelectSmall />
        <IntroduceKeyword />
        <TeachLevel />
        <TeachType />
        <ResidentialArea />
        <Introduce />
        <InsertOpenChatingLink />
        <PortfolioLink />
      </Box>
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
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={gender}
        label="성별"
        onChange={handleChange}
        sx={{ fontSize: "0.5rem", borderRadius: "10px" }}
      >
        <MenuItem value={"man"} sx={{ fontSize: "0.5rem" }}>
          남성
        </MenuItem>
        <MenuItem value={"woman"} sx={{ fontSize: "0.5rem" }}>
          여성
        </MenuItem>
        <MenuItem value={"other"} sx={{ fontSize: "0.5rem" }}>
          기타
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
          placeholder="키워드 검색"
          sx={{ width: "88%" }}
        ></S.TextInput>
        <Button
          variant="contained"
          sx={{
            fontSize: "0.5rem",
            fontWeight: "bold",
            padding: "12px 16px",
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
          <S.Title>가르칠 수 있는 수준</S.Title>
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

// 수업 방식
function TeachType() {
  const [value, setValue] = useState();
  const handleChange = () => {};
  return (
    <>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          <Box sx={{ display: "flex", marginRight: "10px" }}>
            <S.Title>수업 방식</S.Title>
            <S.Star>*</S.Star>
          </Box>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <S.TeachTypeRadio
            value="online"
            control={<Radio />}
            label="온라인 수업"
          />
          <S.TeachTypeRadio
            value="offline"
            control={<Radio />}
            label="오프라인 수업"
          />
          <S.TeachTypeRadio
            value="all"
            control={<Radio />}
            label="온라인 & 오프라인"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}

// 거주 지역
function ResidentialArea() {
  const [selectedSido, setSelectedSido] = useState<string>("");
  const [selectedSigungu, setSelectedSigungu] = useState<string>("");
  const [selectedDong, setSelectedDong] = useState<string>("");
  const [selectedDongDetail, setSelectedDongDetail] = useState<string>("");

  const handleSidoChange = (event: SelectChangeEvent) => {
    setSelectedSido(event.target.value);
    setSelectedSigungu("");
    setSelectedDong("");
    setSelectedDongDetail("");
  };

  const handleSigunguChange = (event: SelectChangeEvent) => {
    setSelectedSigungu(event.target.value);
    setSelectedDong("");
    setSelectedDongDetail("");
  };

  const handleDongChange = (event: SelectChangeEvent) => {
    setSelectedDong(event.target.value);
    setSelectedDongDetail("");
  };

  const handleDongDetailChange = (event: SelectChangeEvent) => {
    setSelectedDongDetail(event.target.value);
  };

  const sigunguOptions = selectedSido ? Object.keys(data[selectedSido]) : [];

  const dongOptions =
    selectedSido && selectedSigungu
      ? Object.keys(data[selectedSido][selectedSigungu])
      : [];

  const dongDetailsOptions =
    selectedSido && selectedSigungu && selectedDong
      ? data[selectedSido][selectedSigungu][selectedDong]
      : [];

  return (
    <Box
      sx={{
        minWidth: 120,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <S.Title>거주 지역</S.Title>
        <S.Star>*</S.Star>
      </Box>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <S.AreaDropDownMenu fullWidth>
          <InputLabel id="sido-label">시/도</InputLabel>
          <Select
            labelId="sido-label"
            id="sido-select"
            value={selectedSido}
            label="시/도"
            onChange={handleSidoChange}
          >
            {Object.keys(data).map((sido) => (
              <S.AreaDropDownMenuItem key={sido} value={sido}>
                {sido}
              </S.AreaDropDownMenuItem>
            ))}
          </Select>
        </S.AreaDropDownMenu>
        <S.AreaDropDownMenu fullWidth>
          <InputLabel id="sigungu-label">시/군/구</InputLabel>
          <Select
            labelId="sigungu-label"
            id="sigungu-select"
            value={selectedSigungu}
            label="시/군/구"
            onChange={handleSigunguChange}
            disabled={!selectedSido}
          >
            {sigunguOptions.map((sigungu) => (
              <S.AreaDropDownMenuItem key={sigungu} value={sigungu}>
                {sigungu}
              </S.AreaDropDownMenuItem>
            ))}
          </Select>
        </S.AreaDropDownMenu>
        <S.AreaDropDownMenu fullWidth>
          <InputLabel id="dong-label">동/읍/면</InputLabel>
          <Select
            labelId="dong-label"
            id="dong-select"
            value={selectedDong}
            label="동/읍/면"
            onChange={handleDongChange}
            disabled={!selectedSigungu}
          >
            {dongOptions.map((dong) => (
              <S.AreaDropDownMenuItem key={dong} value={dong}>
                {dong}
              </S.AreaDropDownMenuItem>
            ))}
          </Select>
        </S.AreaDropDownMenu>
        <S.AreaDropDownMenu fullWidth>
          <InputLabel id="dong-details-label">세부 동/읍/면</InputLabel>
          <Select
            labelId="dong-details-label"
            id="dong-details-select"
            value={selectedDongDetail}
            label="세부 동/읍/면"
            onChange={handleDongDetailChange}
            disabled={!selectedDong}
          >
            {Array.isArray(dongDetailsOptions) &&
              dongDetailsOptions.map((dongDetail) => (
                <S.AreaDropDownMenuItem key={dongDetail} value={dongDetail}>
                  {dongDetail}
                </S.AreaDropDownMenuItem>
              ))}
          </Select>
        </S.AreaDropDownMenu>
      </Box>
    </Box>
  );
}

// 자기 소개
function Introduce() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box sx={{ display: "flex" }}>
        <S.Title>자기소개</S.Title>
        <S.Star>*</S.Star>
      </Box>
      <S.TextArea
        id="introduce-textarea"
        placeholder="자기 소개를 해주세요."
        multiline
        fullWidth
        sx={{ fontSize: "0.5rem" }}
      />
    </Box>
  );
}

// 오픈 채팅 링크
function InsertOpenChatingLink() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          <S.Title>오픈채팅 링크</S.Title>
          <S.Star>*</S.Star>
        </Box>
        <S.Context>매칭 시 소통할 오픈채팅 링크</S.Context>
      </Box>
      <S.OpenChat
        id="openchat-text-input"
        placeholder="링크 주소 입력해주세요."
        variant="outlined"
        fullWidth
      />
    </Box>
  );
}

function PortfolioLink() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "0.6rem",
          gap: "10px",
        }}
      >
        <S.Title>포트폴리오 링크</S.Title>
        <S.Context>노션, 깃허브 등 유효한 링크 첨부</S.Context>
      </Box>
      <S.OpenChat
        id="openchat-text-input"
        placeholder="링크 주소 입력해주세요."
        variant="outlined"
        fullWidth
      />
    </Box>
  );
}
