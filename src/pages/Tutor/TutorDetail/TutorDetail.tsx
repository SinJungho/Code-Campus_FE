import React, { useEffect, useState } from "react";
import * as S_detail from "./TutorDetail_styled"; // 스타일 컴포넌트 import
import axios from 'axios'; // axios import
import { Box } from "@mui/material"; // MUI Box import
import TutorDefaultInfo from "./TutorDefaultInfo"; // TutorDefaultInfo 컴포넌트 import

const API_URL = process.env.REACT_APP_BASE_URL as string;

// 튜터 데이터를 담을 타입 정의
interface TutorData {
  tutorProfileImg: string;
  keyword: string;
  name: string;
  classArea: string;
  classType: string;
  school: string;
  tutorIntro: string;
  chatLink: string;
  portLink: string;
}

const TutorDetail: React.FC = () => {
  const [tutorData, setTutorData] = useState<TutorData | null>(null); // 타입 정의 추가
  const id = 2; // 가져올 tutor ID

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/tutor/${id}/detail`); 
        if (response.data.result) {
          setTutorData(response.data.data); // API에서 가져온 데이터 저장
        }
      } catch (error) {
        console.error("Failed to fetch tutor data:", error);
      }
    };

    fetchTutorData();
  }, [id]);

  // 로딩 중일 때 처리
  if (!tutorData) {
    return <div>Loading...</div>;
  }

  return (
    <S_detail.Wrapper>
      <TutorDefaultInfo tutorData={tutorData} /> {/* TutorDefaultInfo에 tutorData 전달 */}
    </S_detail.Wrapper>
  );
};

// 기술 키워드 컴포넌트
interface MentorSkillKeywordProps {
  keywords: string[]; // string 배열로 타입 정의
}

const MentorSkillKeyword: React.FC<MentorSkillKeywordProps> = ({ keywords }) => {
  return (
    <Box>
      {keywords.map((item, index) => {
        return (
          <S_detail.KeywordChip
            sx={{
              fontSize: "0.5rem",
              marginRight: "0.4rem",
              marginBottom: "1rem",
            }}
            key={index} // key를 id 대신 index로 설정
            label={`# ${item}`} // 키워드 앞에 # 추가
          />
        );
      })}
    </Box>
  );
};

export default TutorDetail;