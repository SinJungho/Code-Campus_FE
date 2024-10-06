import React, { useEffect, useState, useMemo } from "react";
import * as S from "./styled";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import axios from "axios";

interface Tutor {
  userNo: number;
  tutorProfileImg: string;
  userName: string;
  keyword: string[];
  school: string;
  classArea: string;
  level: string;
  userSex: string;
  classType: string;
}

interface Filters {
  userSex: string;
  classType: string;
  levels: string[];
  searchTerm: string;
}

const Home: React.FC = () => {
  const [allTutors, setAllTutors] = useState<Tutor[]>([]);
  const [filters, setFilters] = useState<Filters>({
    userSex: "",
    classType: "",
    levels: [],
    searchTerm: "",
  });

  const fetchTutors = async () => {
    try {
      const response = await axios.post<{
        result: boolean;
        status: number;
        message: string;
        data: Tutor[];
      }>("http://localhost:8080/api/tutor/find", { orderCondition: "NEW" });

      if (response.data.result && response.status === 200) {
        setAllTutors(response.data.data);
      } else {
        console.error("Failed to fetch tutors:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleFilterChange = (event: any, filterType: keyof Filters) => {
    const value = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleLevelChange = (level: string) => {
    setFilters((prevFilters) => {
      const newLevels = prevFilters.levels.includes(level)
        ? prevFilters.levels.filter((l) => l !== level)
        : [...prevFilters.levels, level];
      return { ...prevFilters, levels: newLevels };
    });
  };

  const filteredTutors = useMemo(() => {
    return allTutors.filter((tutor) => {
      const matchesGender = filters.userSex
        ? tutor.userSex === filters.userSex
        : true;
      const matchesClassType = filters.classType
        ? tutor.classType === filters.classType
        : true;
      const matchesLevel =
        filters.levels.length === 0 || filters.levels.includes(tutor.level);
      const matchesSearch = filters.searchTerm
        ? tutor.userName
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          tutor.keyword.some((kw) =>
            kw.toLowerCase().includes(filters.searchTerm.toLowerCase())
          )
        : true;

      return matchesGender && matchesClassType && matchesLevel && matchesSearch;
    });
  }, [allTutors, filters]);

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
        {/* Class Type dropdown menu */}
        <FormControl
          sx={{ m: 1, minWidth: 170, marginTop: "1rem", textAlign: "center" }}
        >
          <InputLabel id="class-type-label">수업 방식</InputLabel>
          <Select
            labelId="class-type-label"
            value={filters.classType}
            onChange={(event) => handleFilterChange(event, "classType")}
            autoWidth
            label="수업 방식"
          >
            <MenuItem value="">전체</MenuItem>
            <MenuItem value="offline">오프라인</MenuItem>
            <MenuItem value="online">온라인</MenuItem>
          </Select>
        </FormControl>

        {/* Level buttons */}
        <Box
          sx={{ display: "flex", alignItems: "center", marginTop: "0.6rem" }}
        >
          {/* {["입문", "초급", "중급 이상"].map((level) => (
            <Button
              key={level}
              variant="contained"
              onClick={() => handleLevelChange(level)}
              sx={{
                backgroundColor: filters.levels.includes(level)
                  ? "#c7dccb"
                  : "#E9FBEC",
                border: "2px solid #158B28",
                color: "#158B28",
                borderRadius: "30px",
                marginRight: "15px",
                padding: "5px 25px",
                "&:hover": { backgroundColor: "#c7dccb" },
              }}
            >
              {level}
            </Button>
          ))} */}
          <Button
            variant="contained"
            onClick={() => handleLevelChange("입문")}
            sx={{
              backgroundColor: "#E9FBEC",
              border: "2px solid #158B28",
              color: "#158B28",
              borderRadius: "30px",
              marginRight: "15px",
              padding: "5px 25px",
              "&:hover": { backgroundColor: "#c7dccb" },
            }}
          >
            입문
          </Button>
          <Button
            variant="contained"
            onClick={() => handleLevelChange("초급")}
            sx={{
              backgroundColor: "#FFF1CE",
              border: "2px solid #C3951C",
              color: "#C3951C",
              borderRadius: "30px",
              marginRight: "15px",
              padding: "5px 25px",
              "&:hover": { backgroundColor: "#EDE1C2" },
            }}
          >
            초급
          </Button>
          <Button
            variant="contained"
            onClick={() => handleLevelChange("중급 이상")}
            sx={{
              backgroundColor: "#FFEAEA",
              border: "2px solid #FD5555",
              color: "#FD5555",
              borderRadius: "30px",
              marginRight: "15px",
              padding: "5px 25px",
              "&:hover": { backgroundColor: "#ECD9D9" },
            }}
          >
            중급 이상
          </Button>
        </Box>

        {/* Gender dropdown menu */}
        <FormControl
          sx={{ m: 1, minWidth: 170, marginTop: "1rem", textAlign: "center" }}
        >
          <InputLabel id="gender-label">성별</InputLabel>
          <Select
            labelId="gender-label"
            value={filters.userSex}
            onChange={(event) => handleFilterChange(event, "userSex")}
            autoWidth
            label="성별"
          >
            <MenuItem value="">전체</MenuItem>
            <MenuItem value="M">남성</MenuItem>
            <MenuItem value="W">여성</MenuItem>
          </Select>
        </FormControl>

        {/* Search input */}
        <OutlinedInput
          sx={{ marginTop: "20px", borderRadius: "40px" }}
          placeholder="이름 또는 키워드로 검색..."
          value={filters.searchTerm}
          onChange={(event) => handleFilterChange(event, "searchTerm")}
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        />
      </Box>

      <S.CardDiv>
        {filteredTutors.map((tutor, index) => (
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
            <Link to={`/tutorDetail/${tutor.userNo}`}>
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
