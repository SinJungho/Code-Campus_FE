import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./styled";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "@mui/icons-material";
import { Avatar, Button, IconButton, InputBase, Paper } from "@mui/material";

interface Tutor {
  userNo: number;
  tutorProfileImg: string;
  userName: string;
  keyword: string[];
  school: string;
  classArea: string;
}

const Home: React.FC = () => {
  const [popularTutors, setPopularTutors] = useState<Tutor[]>([]);
  const [newTutors, setNewTutors] = useState<Tutor[]>([]);
  

  

  const fetchTutors = async (orderCondition: 'POP' | 'NEW') => {
    try {
      const response = await axios.post('http://localhost:8080/api/tutor/find', {
        orderCondition
      });
      if (response.data.result && response.status === 200) {
        if (orderCondition === 'POP') {
          setPopularTutors(response.data.data);
        } else if (orderCondition === 'NEW') {
          setNewTutors(response.data.data);
        }
      } else {
        console.error('Failed to fetch tutors:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTutors('POP');
      await fetchTutors('NEW');
    };
    fetchData();
  }, []);

  return (
    <S.Wrapper>
      {/* 인기 선배 섹션 */}
      <S.CardDiv>
        <h1>인기 선배님</h1>
        {popularTutors.map((tutor, index) => (
          <S.CardWrap
            key={index}
            sx={{
              mt: "2rem",
              padding: "1.5rem",
              bgcolor: "#f5f5f5",
              borderRadius: ".8rem",
              boxShadow: "none",
            }}
          >
            <Avatar
              sx={{
                width: "4rem",
                height: "4rem",
                fontSize: "1rem",
                color: "#999",
                bgcolor: "#fff",
                display: "flex",
                alignContent: "center",
                flexWrap: "wrap",
                justifyContent: "center",
                mr: "1.5rem",
              }}
              src={tutor.tutorProfileImg}
            >
              {tutor.userName.charAt(0)}
            </Avatar>
            <S.CardTextDiv>
              <div>
                {tutor.keyword.map((value, idx) => (
                  <span key={idx}>#{value} </span>
                ))}
              </div>
              <p>{tutor.school + " " + tutor.classArea}</p>
              <b>{tutor.userName} 선배님</b>
            </S.CardTextDiv>
            <Link to={`/TutorDetail/${tutor.userNo}`}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 5,
                  padding: ".2rem 1rem",
                  fontSize: "0.75rem",
                }}
              >
                상세보기
              </Button>
            </Link>
          </S.CardWrap>
        ))}
      </S.CardDiv>
      {/* 최신 선배 섹션 */}
      <S.CardDiv>
        <h1>최신 선배님</h1>
        {newTutors.map((tutor, index) => (
          <S.CardWrap
            key={index}
            sx={{
              mt: "2rem",
              padding: "1.5rem",
              bgcolor: "#e0e0e0",
              borderRadius: ".8rem",
              boxShadow: "none",
            }}
          >
            <Avatar
              sx={{
                width: "4rem",
                height: "4rem",
                fontSize: "1rem",
                color: "#999",
                bgcolor: "#fff",
                display: "flex",
                alignContent: "center",
                flexWrap: "wrap",
                justifyContent: "center",
                mr: "1.5rem",
              }}
              src={tutor.tutorProfileImg}
            >
              {tutor.userName.charAt(0)}
            </Avatar>
            <S.CardTextDiv>
              <div>
                {tutor.keyword.map((value, idx) => (
                  <span key={idx}>#{value} </span>
                ))}
              </div>
              <p>{tutor.school + " " + tutor.classArea}</p>
              <b>{tutor.userName} 선배님</b>
            </S.CardTextDiv>
            <Link to={`/TutorDetail/${tutor.userNo}`}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 5,
                  padding: ".2rem 1rem",
                  fontSize: "0.75rem",
                }}
              >
                상세보기
              </Button>
            </Link>
          </S.CardWrap>
        ))}
      </S.CardDiv>
    </S.Wrapper>
  );
};

export default Home;
