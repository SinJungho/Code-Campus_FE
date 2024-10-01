import * as S from "../styled";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import { data } from "../../../mock-data/addrData";
import { useSignInputValueStore } from "../../../stores/isSignuped/SignUpStore";

// 선배 등록 페이지
export default function AddMentor() {
  const { setStudentType,setTutorClassNum, setSelectedKeywords, setSelectedLevel, setUserSex, setChatLink, setClassArea, setClassType, setPortLink, setSchool, setTutorProfileImg, setTutorIntro, setTutorMajor   } = useSignInputValueStore();

  const handleSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSchool(event.target.value);
  };

  const handleMajorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTutorMajor(event.target.value);
  };

  const handleStudentIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTutorClassNum(event.target.value);
  };

  return (
    <Box>
      <Box>
        <S.SignUpSubTitle>회원가입</S.SignUpSubTitle>
        <S.SignUpTitle>선배 등록</S.SignUpTitle>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
        }}
      >
        <S.SignTextInput
          fullWidth
          required
          id="school"
          label="학교"
          placeholder="학교 이름을 입력 해주세요."
          sx={{ fontSize: '0.5rem', flex: '1.7' }}
          onChange={handleSchoolChange} // 학교 변경 처리
        />
        <S.SignTextInput
          required
          id="major"
          label="전공"
          placeholder="전공 이름을 입력 해주세요."
          sx={{ fontSize: '0.5rem' }}
          onChange={handleMajorChange} // 전공 변경 처리
        />
        <S.SignTextInput
          required
          id="studentId"
          label="학번"
          placeholder="학번을 입력 해주세요."
          sx={{ fontSize: '0.5rem' }}
          onChange={handleStudentIdChange} // 학번 변경 처리
        />

        {/*학생 타입*/}
        <SelectSmall setStudentType={setStudentType} /> 
        {/* 성별 선택 */}
        <SelectGender setStudentGender={setUserSex} />
        {/* 키워드 설정 */}
        <IntroduceKeyword setSelectedKeywords={setSelectedKeywords} />
        {/* 수준 설정 */}
        <TeachLevel setSelectedLevel={setSelectedLevel} />
        {/* 수업 방식 설정 */}
        <TeachType setClassType={setClassType}/>
        {/* 거주 지역 설정 */}
        <ResidentialArea  setClassArea={setClassArea}/>
        {/* 자기 소개 */}
        <Introduce />
        {/* 오픈 채팅 링크 */}
        <InsertOpenChatingLink />
        {/* 포트폴리오 링크 */}
        <PortfolioLink />
        {/* 이미지 */}
        {/* <ImageUpload setTutorProfileImg={setTutorProfileImg} /> */}
      </Box>
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
        성별
      </InputLabel>
      <Select
        labelId="select-gender-label"
        id="select-gender"
        value={gender}
        label="성별"
        onChange={handleChange}
        sx={{ fontSize: "0.5rem", borderRadius: "10px" }}
      >
        <MenuItem value={"M"} sx={{ fontSize: "0.5rem" }}>남성</MenuItem>
        <MenuItem value={"F"} sx={{ fontSize: "0.5rem" }}>여성</MenuItem>
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
    { id: "3", content: "백엔드" },
    { id: "4", content: "리액트" },
    { id: "5", content: "자바스크립트" },
    { id: "6", content: "자바" },
    { id: "7", content: "스프링부트" },
    { id: "8", content: "C" },
    { id: "9", content: "C#" },
    { id: "10", content: "C++" },
    { id: "11", content: "타입스크립트" },

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
            border: selectedKeywords.includes(item.content) 
            ? "none"  // 선택되면 테두리 없음
            : "1px solid grey", // 선택되지 않았을 때 검정색 테두리
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
    { id: "1", content: "입문", color: "#e9fbec", border: "#158b28", darkColor: "#dddddd" },
    { id: "2", content: "초급", color: "#FFF1CE", border: "#C3951C", darkColor: "#dddddd" },
    { id: "3", content: "중급 이상", color: "#FFEAEA", border: "#FD5555", darkColor: "#dddddd"},
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
                  backgroundColor: selectedLevel === level.content ? level.darkColor : level.color, // 선택된 경우 어두운 색상
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


// 수업 방식
function TeachType({ setClassType }: { setClassType: (level: string) => void }) {
  const [classType, setClassTypeLocal] = React.useState("");

  const teachType = [
    { id: "1", content: "온라인 수업", value: "ON" },
    { id: "2", content: "오프라인 수업", value: "OFF" },
    { id: "3", content: "온&오프라인 수업", value: "BOTH" },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const level = event.target.value;
    setClassTypeLocal(level);
    setClassType(level); // Zustand 스토어에 선택된 방식 저장
  };

  return (
    <>
      <FormControl>
        <FormLabel id="teach-type-radio-buttons-group-label">
          <Box sx={{ display: "flex", marginRight: "10px" }}>
            <S.Title>수업 방식</S.Title>
            <S.Star>*</S.Star>
          </Box>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="teach-type-radio-buttons-group-label"
          name="teach-type-radio-buttons-group"
          value={classType}
          onChange={handleChange}
        >
          {teachType.map((type) => (
            <S.TeachTypeRadio
              key={type.id}
              value={type.value}
              control={<Radio />}
              label={type.content}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
}

// 거주 지역
function ResidentialArea({ setClassArea }: { setClassArea: (gender: string) => void }) {
  const [classArea, setClassAreaLocal] = React.useState("");

  const [selectedSido, setSelectedSido] = useState<string>("");
  const [selectedSigungu, setSelectedSigungu] = useState<string>("");
  const [selectedDong, setSelectedDong] = useState<string>("");
  const [selectedDongDetail, setSelectedDongDetail] = useState<string>("");

  useEffect(() => {
    // 선택된 지역이 변경될 때마다 classArea를 업데이트
    const classArea = [selectedSido, selectedSigungu, selectedDong, selectedDongDetail].filter(Boolean);
    setClassArea(classArea.join(" ")); // 공백으로 연결하여 저장
  }, [selectedSido, selectedSigungu, selectedDong, selectedDongDetail, setClassArea]);

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
  const { setTutorIntro } = useSignInputValueStore(); // 스토어에서 setTutorIntro 가져오기

  const handleIntroChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTutorIntro(event.target.value); // 텍스트 영역의 값으로 스토어 업데이트
  };

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
        onChange={handleIntroChange} // 텍스트 변경 시 핸들러 호출
      />
    </Box>
  );
}

// 오픈 채팅 링크
function InsertOpenChatingLink() {
  const { setChatLink } = useSignInputValueStore(); // 스토어에서 setChatLink 가져오기

  const handleChatLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatLink(event.target.value); // 입력 필드의 값으로 스토어 업데이트
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
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
        onChange={handleChatLinkChange} // 링크 입력 시 핸들러 호출
      />
    </Box>
  );
}

// 포트폴리오 링크
function PortfolioLink() {
  const { setPortLink } = useSignInputValueStore(); // 스토어에서 setPortLink 가져오기

  const handlePortLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPortLink(event.target.value); // 입력 필드의 값으로 스토어 업데이트
  };

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
        onChange={handlePortLinkChange} // 링크 입력 시 핸들러 호출
      />
    </Box>
  );
}

// // 이미지 업로드 컴포넌트
// function ImageUpload({ setTutorProfileImg }: { setTutorProfileImg: (img: string) => void }) {
//   const [image, setImage] = useState<string | null>(null);

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result as string);
//         setTutorProfileImg(reader.result as string); // 이미지 저장
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Box sx={{ marginBottom: "1rem" }}>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         style={{ display: "none" }} // 기본 input 숨김
//         id="image-upload" // id를 사용해 label과 연결
//       />
//       <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
//         <Typography sx={{ fontSize: "0.5rem", color: "blue" }}>이미지 업로드</Typography>
//       </label>
//       {image && (
//         <Box
//           component="img"
//           src={image}
//           alt="Selected"
//           sx={{ marginTop: "0.5rem", maxWidth: "100px", maxHeight: "100px" }} // 미리보기 크기 조정
//         />
//       )}
//     </Box>
//   );
// }