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
import { Filters, Tutor } from "../../type/TutorListType";
import TutorClassTypeMenu from "./TutorList/TutorClassTypeMenu";
import TutorLevelMenu from "./TutorList/TutorLevelMenu";
import TutorGenderMenu from "./TutorList/TutorGenderMenu";

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
          <TutorClassTypeMenu
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
        </FormControl>

        {/* Level buttons */}
        <TutorLevelMenu handleLevelChange={handleLevelChange} />

        {/* Gender dropdown menu */}
        <FormControl
          sx={{ m: 1, minWidth: 170, marginTop: "1rem", textAlign: "center" }}
        >
          <TutorGenderMenu
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
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
