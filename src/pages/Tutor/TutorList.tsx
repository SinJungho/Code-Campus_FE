import React, { useState } from "react";
import * as S from "./styled";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import students from "../../mock-data/students";

const Home: React.FC = () => {
  const [filterMode, setFilterMode] = useState<string>("all");

  const handleModeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterMode(event.target.value as string);
  };

  return (
    <S.Wrapper>
      <S.select_wrap>
        <S.FilterDiv>
          <FormControl
            variant="outlined"
            sx={{
              position: "relative",
              left: "-20rem",
              width: "10rem",
              border: "1px solid #BBBBBB",
              borderRadius: "10px",
              mt: "3rem",
            }}
          >
            <Select value={filterMode} label="Mode">
              <MenuItem value="all">전체</MenuItem>
              <MenuItem value="online">온라인</MenuItem>
              <MenuItem value="offline">오프라인</MenuItem>
            </Select>
          </FormControl>
        </S.FilterDiv>
        <S.FilterDiv>
          <FormControl
            variant="outlined"
            sx={{
              position: "relative",
              left: "-20rem",
              width: "10rem",
              border: "1px solid #BBBBBB",
              borderRadius: "10px",
              mt: "1rem",
            }}
          >
            <Select value={filterMode} label="Mode">
              <MenuItem value="all">지역</MenuItem>
              <MenuItem value="online">경기/인천</MenuItem>
              <MenuItem value="offline">서울특별시</MenuItem>
              <MenuItem value="offline">부산광역시</MenuItem>
              <MenuItem value="offline">대전광역시</MenuItem>
            </Select>
          </FormControl>
        </S.FilterDiv>
      </S.select_wrap>
      <S.CardDiv>
        {students.map((student, index) => (
          <S.CardWrap
            key={index}
            sx={{
              width: "100%",
              mt: "2rem",
              padding: "1.5rem",
              bgcolor: "#f5f5f5",
              borderRadius: ".8rem",
              boxShadow: "none",
              boxSizing: "border-box",
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
            >
              {student.name.charAt(0)}
            </Avatar>
            <S.CardTextDiv>
              <div>
                {student.specialties.map((value, idx) => (
                  <span key={idx}>#{value} </span>
                ))}
              </div>
              <p>{student.university + " " + student.department}</p>
              <b>{student.name} 선배님</b>
            </S.CardTextDiv>
            <Link to="/tutorDetail">
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
