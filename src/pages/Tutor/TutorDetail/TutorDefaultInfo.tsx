import React from "react";
import * as S_detail from "./TutorDetail_styled"; // TutorDetail 스타일 컴포넌트 import
import { Box, Typography } from "@mui/material"; // MUI Box와 Typography import
import SchoolIcon from "@mui/icons-material/School"; // 학교 아이콘 import
import FmdGoodIcon from "@mui/icons-material/FmdGood"; // 위치 아이콘 import
import CheckBoxIcon from "@mui/icons-material/CheckBox"; // 인증 아이콘 import

// 튜터 데이터에 대한 타입 정의
interface TutorData {
  keyword: string;
  name: string;
  classArea: string;
  classType: string;
  school: string;
  tutorIntro: string;
  chatLink: string;
  portLink: string;
}

// 컴포넌트 props에 대한 타입 정의
interface TutorDefaultInfoProps {
  tutorData: TutorData;
}

// TutorDefaultInfo 컴포넌트 정의
export default function TutorDefaultInfo({ tutorData }: TutorDefaultInfoProps) {
  const keywords = tutorData.keyword.split(","); // 키워드를 쉼표로 분리하여 배열로 저장

  return (
    <Box>
      {/* 선배 기본 정보 타이틀 */}
      <Typography sx={{ marginBottom: "1.5rem", marginTop: "0.7rem" }}>
        <b>{tutorData.name}</b> 선배님에 대한 정보
      </Typography>
      <TutorInfo tutorData={tutorData} />
      <TutorIntroduce tutorIntro={tutorData.tutorIntro} />
      <TutorTeachTypeAndTutoringTime 
        classType={tutorData.classType}
        classArea={tutorData.classArea}
      />
      <TutorPortfolio chatLink={tutorData.chatLink} portLink={tutorData.portLink} />
    </Box>
  );
}

// 선배 기본 정보
const TutorInfo = ({ tutorData }: { tutorData: TutorData }) => {
  const mentorInfo = [
    {
      id: 1,
      icon: <SchoolIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: tutorData.school,
    },
    {
      id: 2,
      icon: <FmdGoodIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: tutorData.classArea,
    },
    {
      id: 3,
      icon: <CheckBoxIcon sx={{ color: "#1564FF", fontSize: "1.2rem" }} />,
      text: "인증된 사용자",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: "2rem" }}>
      <Box>
        {mentorInfo.map((info) => (
          <Box
            key={info.id}
            sx={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            {info.icon}
            <Typography sx={{ fontSize: "0.6rem", fontWeight: "bold" }}>
              {info.text}
            </Typography>
          </Box>
        ))}
      </Box>
      <MentorSkillTag keywords={tutorData.keyword.split(",").map((k) => k.trim())} /> {/* 키워드 태그에 전달 */}
    </Box>
  );
};

// 선배 기술 키워드
interface MentorSkillTagProps {
  keywords: string[];
}

function MentorSkillTag({ keywords }: MentorSkillTagProps) {
  return (
    <Box sx={{ marginTop: { xs: "1rem", sm: 0 } }}>
      <Typography sx={{ fontSize: "0.55rem", marginBottom: "0.4rem", fontWeight: "bold" }}>
        추천 키워드
      </Typography>
      {keywords.map((item, index) => (
        <S_detail.KeywordChip
          sx={{
            fontSize: "0.5rem",
            marginRight: "0.4rem",
            marginBottom: "1rem",
          }}
          key={index}
          label={`# ${item}`} // 키워드 앞에 # 추가
        />
      ))}
    </Box>
  );
}

// 선배 소개
const TutorIntroduce = ({ tutorIntro }: { tutorIntro: string }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "28px", marginTop: "2rem" }}>
      <S_detail.Title>소개</S_detail.Title>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <S_detail.Text>{tutorIntro}</S_detail.Text>
      </Box>
    </Box>
  );
};

// 선배 수업 방식 & 선호 튜터링 시간
const TutorTeachTypeAndTutoringTime = ({
  classType,
  classArea,
}: {
  classType: string;
  classArea: string;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, marginTop: "2rem", gap: "2rem" }}>
      <Typography sx={{ fontSize: "0.6rem" }}>수업 방식: {classType}</Typography>
      <Typography sx={{ fontSize: "0.6rem" }}>지역: {classArea}</Typography>
    </Box>
  );
};

// 튜터 포트폴리오
const TutorPortfolio = ({ chatLink, portLink }: { chatLink: string; portLink: string }) => {
  return (
    <Box sx={{ marginTop: "2rem" }}>
      <S_detail.Title>포트폴리오</S_detail.Title>
      <S_detail.LinkText to={portLink}>포트폴리오 보러 가기</S_detail.LinkText>
      <S_detail.LinkText to={chatLink}>튜터링 오픈 채팅방</S_detail.LinkText>
    </Box>
  );
};
