import React, { useState } from "react";
import * as S from "./styled";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import students from "../../mock-data/students";
import { Search } from "@mui/icons-material";

const Home: React.FC = () => {
  // const [filterMode, setFilterMode] = useState<string>("all");

  // const handleModeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setFilterMode(event.target.value as string);
  // };

  const [online, setOnline] = React.useState("");
  const [gender, setGender] = React.useState("");

  const handleOnlineChange = (event: SelectChangeEvent) => {
    setOnline(event.target.value);
  };
  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  };
  return (
    <S.Wrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* online & offline dropdown menu */}
        <FormControl
          sx={{
            m: 1,
            minWidth: 170,
            marginTop: "1rem",
            textAlign: "center",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#BBBBBB", // Default border color
                borderRadius: "20px",
              },
              "&:hover fieldset": {
                borderColor: "#BBBBBB", // Border color when hovered
              },
              "&.Mui-focused fieldset": {
                borderColor: "#BBBBBB", // Border color when focused (clicked)
                borderWidth: "2px", // Change the border width when focused
              },
            },
          }}
        >
          <InputLabel id="demo-simple-select-autowidth-label">
            오프라인
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={online}
            onChange={handleOnlineChange}
            autoWidth
            label="오프라인"
          >
            <MenuItem value={"오프라인"}>오프라인</MenuItem>
            <MenuItem value={"온라인"}>온라인</MenuItem>
          </Select>
        </FormControl>
        {/* campus level button */}
        <Box
          sx={{ display: "flex", alignItems: "center", marginTop: "0.6rem" }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#E9FBEC",
              border: "2px solid #158B28",
              color: "#158B28",
              borderRadius: "30px",
              marginRight: "15px",
              padding: "5px 25px",
              "&:hover": {
                backgroundColor: "#c7dccb",
              },
            }}
          >
            입문
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFF1CE",
              border: "2px solid #C3951C",
              color: "#C3951C",
              borderRadius: "30px",
              marginRight: "15px",
              padding: "5px 25px",
              "&:hover": {
                backgroundColor: "#d7caaa",
              },
            }}
          >
            초급
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFEAEA",
              border: "2px solid #FD5555",
              color: "#FD5555",
              borderRadius: "30px",
              marginRight: "15px",
              padding: "5px 25px",
              "&:hover": {
                backgroundColor: "#d8bfbf",
              },
            }}
          >
            중급 이상
          </Button>
        </Box>
        {/* gender dropdown menu */}
        <FormControl
          sx={{
            m: 1,
            minWidth: 170,
            marginTop: "1rem",
            textAlign: "center",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#BBBBBB", // Default border color
                borderRadius: "20px",
              },
              "&:hover fieldset": {
                borderColor: "#BBBBBB", // Border color when hovered
              },
              "&.Mui-focused fieldset": {
                borderColor: "#BBBBBB", // Border color when focused (clicked)
                borderWidth: "2px", // Change the border width when focused
              },
            },
          }}
        >
          <InputLabel id="demo-simple-select-autowidth-label">성별</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={gender}
            onChange={handleGenderChange}
            autoWidth
            label="성별"
          >
            <MenuItem value={"M"}>남성</MenuItem>
            <MenuItem value={"W"}>여성</MenuItem>
          </Select>
        </FormControl>
        <OutlinedInput
          sx={{ marginTop: "20px", borderRadius: "40px" }}
          placeholder="검색어를 입력하세요..."
          startAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
        />
      </Box>
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
